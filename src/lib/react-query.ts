import * as React from "react";

export type QueryKey = readonly unknown[];

type QueryStatus = "idle" | "pending" | "success" | "error";

export interface QueryState<TData = unknown, TError = unknown> {
  status: QueryStatus;
  data?: TData;
  error?: TError;
}

type QueryListener = (state: QueryState) => void;

interface QueryCacheEntry {
  state: QueryState;
  subscribers: Set<QueryListener>;
  promise?: Promise<unknown>;
}

const cloneState = <TData, TError>(state: QueryState<TData, TError>): QueryState<TData, TError> => ({
  status: state.status,
  data: state.data,
  error: state.error,
});

const defaultState: QueryState = { status: "idle" };

export class QueryClient {
  private cache = new Map<string, QueryCacheEntry>();

  private hashQueryKey(queryKey: QueryKey): string {
    return JSON.stringify(queryKey ?? []);
  }

  private ensureEntry(hash: string): QueryCacheEntry {
    let entry = this.cache.get(hash);

    if (!entry) {
      entry = {
        state: { ...defaultState },
        subscribers: new Set(),
      };
      this.cache.set(hash, entry);
    }

    return entry;
  }

  private notify(entry: QueryCacheEntry) {
    const snapshot = cloneState(entry.state);
    entry.subscribers.forEach((listener) => {
      listener(snapshot);
    });
  }

  getQueryHash(queryKey: QueryKey): string {
    return this.hashQueryKey(queryKey);
  }

  getQueryState<TData = unknown, TError = unknown>(queryKey: QueryKey): QueryState<TData, TError> {
    const hash = this.hashQueryKey(queryKey);
    const entry = this.cache.get(hash);

    if (!entry) {
      return { ...defaultState } as QueryState<TData, TError>;
    }

    return cloneState(entry.state) as QueryState<TData, TError>;
  }

  subscribe<TData = unknown, TError = unknown>(
    queryKey: QueryKey,
    listener: (state: QueryState<TData, TError>) => void,
  ): () => void {
    const hash = this.hashQueryKey(queryKey);
    const entry = this.ensureEntry(hash);

    const wrappedListener: QueryListener = (state) => {
      listener(state as QueryState<TData, TError>);
    };

    entry.subscribers.add(wrappedListener);

    // Immediately emit the current state for new subscribers
    listener(cloneState(entry.state) as QueryState<TData, TError>);

    return () => {
      entry.subscribers.delete(wrappedListener);
    };
  }

  async ensureQueryData<TData>(queryKey: QueryKey, queryFn: () => Promise<TData>) {
    const hash = this.hashQueryKey(queryKey);
    const entry = this.ensureEntry(hash);

    if (entry.state.status === "success") {
      return entry.state.data as TData;
    }

    return this.fetchQuery(queryKey, queryFn);
  }

  async fetchQuery<TData>(
    queryKey: QueryKey,
    queryFn: () => Promise<TData>,
    options: { force?: boolean } = {},
  ) {
    const hash = this.hashQueryKey(queryKey);
    const entry = this.ensureEntry(hash);

    if (entry.promise && !options.force) {
      return entry.promise as Promise<TData>;
    }

    if (entry.state.status === "success" && !options.force) {
      return Promise.resolve(entry.state.data as TData);
    }

    const promise = Promise.resolve().then(queryFn);

    entry.promise = promise;
    entry.state = {
      status: "pending",
      data: entry.state.data,
      error: undefined,
    };
    this.notify(entry);

    try {
      const data = await promise;
      entry.state = {
        status: "success",
        data,
        error: undefined,
      };
      this.notify(entry);
      return data;
    } catch (error) {
      entry.state = {
        status: "error",
        data: entry.state.data,
        error,
      };
      this.notify(entry);
      throw error;
    } finally {
      entry.promise = undefined;
    }
  }
}

const QueryClientContext = React.createContext<QueryClient | null>(null);

export interface QueryClientProviderProps {
  client: QueryClient;
  children: React.ReactNode;
}

export function QueryClientProvider({ client, children }: QueryClientProviderProps) {
  return <QueryClientContext.Provider value={client}>{children}</QueryClientContext.Provider>;
}

export function useQueryClient() {
  const client = React.useContext(QueryClientContext);

  if (!client) {
    throw new Error("useQueryClient must be used within a QueryClientProvider");
  }

  return client;
}

export interface UseQueryOptions<TData> {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enabled?: boolean;
}

export interface UseQueryResult<TData, TError = unknown> extends QueryState<TData, TError> {
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => Promise<TData>;
}

export function useQuery<TData, TError = unknown>(options: UseQueryOptions<TData>): UseQueryResult<TData, TError> {
  const client = useQueryClient();
  const { queryKey, enabled = true } = options;

  const queryFnRef = React.useRef(options.queryFn);
  React.useEffect(() => {
    queryFnRef.current = options.queryFn;
  }, [options.queryFn]);

  const [state, setState] = React.useState<QueryState<TData, TError>>(() =>
    client.getQueryState<TData, TError>(queryKey),
  );

  const queryHash = React.useMemo(() => client.getQueryHash(queryKey), [client, queryKey]);

  React.useEffect(() => {
    return client.subscribe<TData, TError>(queryKey, (nextState) => {
      setState(nextState);
    });
  }, [client, queryHash, queryKey]);

  React.useEffect(() => {
    if (!enabled) {
      return;
    }

    client.ensureQueryData(queryKey, () => queryFnRef.current());
  }, [client, queryHash, queryKey, enabled]);

  const refetch = React.useCallback(() => {
    return client.fetchQuery(queryKey, () => queryFnRef.current(), { force: true });
  }, [client, queryHash, queryKey]);

  const isLoading = state.status === "pending" && state.data === undefined;
  const isFetching = state.status === "pending";
  const isError = state.status === "error";
  const isSuccess = state.status === "success";

  return {
    ...state,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    refetch,
  };
}

const defaultBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";

const normalizeBaseUrl = (url: string) => (url ?? "").replace(/\/+$/, "");
const normalizePath = (path: string) => (path.startsWith("/") ? path : `/${path}`);

const parseResponseBody = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.status === 204 ? null : response.json();
  }

  return response.text();
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  const payload = await parseResponseBody(response);

  if (!response.ok) {
    const error = new Error("Request failed");
    (error as Error & { status?: number; statusText?: string; payload?: unknown }).status = response.status;
    (error as Error & { status?: number; statusText?: string; payload?: unknown }).statusText = response.statusText;
    (error as Error & { status?: number; statusText?: string; payload?: unknown }).payload = payload;
    throw error;
  }

  return payload as T;
};

const isBodyInit = (value: unknown): value is BodyInit => {
  if (value == null) return false;

  if (typeof value === "string") return true;

  if (typeof FormData !== "undefined" && value instanceof FormData) return true;
  if (typeof Blob !== "undefined" && value instanceof Blob) return true;
  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) return true;
  if (typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams) return true;
  if (typeof ReadableStream !== "undefined" && value instanceof ReadableStream) return true;

  return false;
};

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  headers?: Record<string, string>;
}

const request = async <T>(baseUrl: string, path: string, options: RequestOptions = {}): Promise<T> => {
  const url = `${normalizeBaseUrl(baseUrl)}${normalizePath(path)}`;
  const { headers = {}, body, method, ...rest } = options;

  const finalHeaders: Record<string, string> = { ...headers };
  let finalBody: BodyInit | undefined;

  if (body !== undefined) {
    if (isBodyInit(body)) {
      finalBody = body;
    } else {
      finalHeaders["Content-Type"] ??= "application/json";
      finalBody = JSON.stringify(body);
    }
  }

  const response = await fetch(url, {
    ...rest,
    method: method ?? "GET",
    headers: Object.keys(finalHeaders).length ? finalHeaders : undefined,
    body: finalBody,
  });

  return handleResponse<T>(response);
};

export interface ApiClient {
  get<T = unknown>(path: string, options?: RequestOptions): Promise<T>;
  post<T = unknown>(path: string, body?: unknown, options?: RequestOptions): Promise<T>;
  put<T = unknown>(path: string, body?: unknown, options?: RequestOptions): Promise<T>;
  patch<T = unknown>(path: string, body?: unknown, options?: RequestOptions): Promise<T>;
  delete<T = unknown>(path: string, options?: RequestOptions): Promise<T>;
  request<T = unknown>(path: string, options?: RequestOptions): Promise<T>;
}

export const createApiClient = (baseUrl: string = defaultBaseUrl): ApiClient => ({
  get: (path, options) => request(baseUrl, path, { ...options, method: "GET" }),
  post: (path, body, options) => request(baseUrl, path, { ...options, method: "POST", body }),
  put: (path, body, options) => request(baseUrl, path, { ...options, method: "PUT", body }),
  patch: (path, body, options) => request(baseUrl, path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(baseUrl, path, { ...options, method: "DELETE" }),
  request: (path, options) => request(baseUrl, path, options),
});

export const apiClient = createApiClient();

export const setApiBaseUrl = (nextBaseUrl: string) => {
  if (!nextBaseUrl || typeof nextBaseUrl !== "string") {
    throw new Error("Base URL must be a non-empty string");
  }

  return createApiClient(nextBaseUrl);
};

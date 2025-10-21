const defaultBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

const normalizeBaseUrl = (url) => (url ?? '').replace(/\/+$/, '');
const normalizePath = (path) => (path.startsWith('/') ? path : `/${path}`);

const parseResponseBody = async (response) => {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.status === 204 ? null : response.json();
  }

  return response.text();
};

const handleResponse = async (response) => {
  const payload = await parseResponseBody(response);

  if (!response.ok) {
    const error = new Error('Request failed');
    error.status = response.status;
    error.statusText = response.statusText;
    error.payload = payload;
    throw error;
  }

  return payload;
};

const request = async (baseUrl, path, options = {}) => {
  const url = `${normalizeBaseUrl(baseUrl)}${normalizePath(path)}`;
  const { headers, body, ...rest } = options;

  const finalHeaders = { ...headers };
  let finalBody = body;

  if (body !== undefined && !(body instanceof FormData)) {
    if (typeof body === 'string') {
      finalBody = body;
    } else {
      finalHeaders['Content-Type'] ??= 'application/json';
      finalBody = JSON.stringify(body);
    }
  }

  const response = await fetch(url, {
    ...rest,
    headers: Object.keys(finalHeaders).length ? finalHeaders : undefined,
    body: finalBody,
  });

  return handleResponse(response);
};

export const createApiClient = (baseUrl = defaultBaseUrl) => ({
  get: (path, options) => request(baseUrl, path, { ...options, method: 'GET' }),
  post: (path, body, options) => request(baseUrl, path, { ...options, method: 'POST', body }),
  put: (path, body, options) => request(baseUrl, path, { ...options, method: 'PUT', body }),
  patch: (path, body, options) => request(baseUrl, path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(baseUrl, path, { ...options, method: 'DELETE' }),
  request: (path, options) => request(baseUrl, path, options),
});

export const apiClient = createApiClient();

export const setApiBaseUrl = (nextBaseUrl) => {
  if (!nextBaseUrl || typeof nextBaseUrl !== 'string') {
    throw new Error('Base URL must be a non-empty string');
  }

  return createApiClient(nextBaseUrl);
};

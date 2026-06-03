const TOKEN_STORAGE_KEY = "token";
const USER_STORAGE_KEY = "user";
const AUTH_REDIRECT_MESSAGE_KEY = "auth.redirect.message";

export const DEFAULT_AUTH_REDIRECT_MESSAGE =
  "Your session has expired. Please log in again.";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getStoredToken() {
  if (!isBrowser()) {
    return null;
  }

  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function getStoredUser<T>() {
  if (!isBrowser()) {
    return null;
  }

  const rawUser = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as T;
  } catch {
    clearStoredAuthSession();
    return null;
  }
}

export function hasStoredAuthSession() {
  if (!isBrowser()) {
    return false;
  }

  return Boolean(
    window.localStorage.getItem(TOKEN_STORAGE_KEY) ||
      window.localStorage.getItem(USER_STORAGE_KEY),
  );
}

export function persistAuthSession(token: string, user: unknown) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  clearAuthRedirectMessage();
}

export function clearStoredAuthSession() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  window.localStorage.removeItem(USER_STORAGE_KEY);
}

export function storeAuthRedirectMessage(
  message = DEFAULT_AUTH_REDIRECT_MESSAGE,
) {
  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.setItem(AUTH_REDIRECT_MESSAGE_KEY, message);
}

export function consumeAuthRedirectMessage() {
  if (!isBrowser()) {
    return null;
  }

  const message = window.sessionStorage.getItem(AUTH_REDIRECT_MESSAGE_KEY);
  if (!message) {
    return null;
  }

  window.sessionStorage.removeItem(AUTH_REDIRECT_MESSAGE_KEY);
  return message;
}

export function clearAuthRedirectMessage() {
  if (!isBrowser()) {
    return;
  }

  window.sessionStorage.removeItem(AUTH_REDIRECT_MESSAGE_KEY);
}

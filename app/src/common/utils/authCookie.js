import Cookies from 'js-cookie';

const AUTH_COOKIE_NAME = 'AuthToken';

export function setAuthCookie(token) {
  // Encode the JSON string
  const encodeToken = JSON.stringify(token);
  const cookieOptions = {
    expires: 1, // 1 day
    secure: false,
    sameSite: 'lax',
  };
  Cookies.set(AUTH_COOKIE_NAME, encodeToken, cookieOptions);
}

export function getAuthCookie() {
  const cookieValue = Cookies.get(AUTH_COOKIE_NAME);
  if (cookieValue) {
    try {
      // Decode the cookie value and parse it as JSON
      return JSON.parse(cookieValue);
    } catch (error) {
      console.error('Error parsing auth cookie:', error);
      return null;
    }
  }
  return null;
}

export function removeAuthCookie() {
  Cookies.remove(AUTH_COOKIE_NAME, {
    expires: 1, // 1 day
    secure: false,
    sameSite: 'lax',
  });
}

export function clearAuthCookie() {
  Cookies.remove(AUTH_COOKIE_NAME, {
    expires: 1, // 1 day
    secure: false,
    sameSite: 'lax',
  });
}

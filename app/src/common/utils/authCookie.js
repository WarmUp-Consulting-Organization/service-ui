import Cookies from 'js-cookie';

const AUTH_COOKIE_NAME = 'AuthToken';

// Function to determine the appropriate domain
const getDomain = () => {
  if (process.env.production) {
    // Use the root domain to allow sharing across subdomains
    return '.warmupweb.com';
  } else {
    return 'localhost';
  }
};

const ROOT_DOMAIN = getDomain();

export function setAuthCookie(token) {
  // Encode the JSON string
  const encodedToken = JSON.stringify(token);
  const cookieOptions = {
    expires: 1, // 1 day
    domain: ROOT_DOMAIN,
    secure: false,
    sameSite: 'lax',
    path: '/',
  };
  Cookies.set(AUTH_COOKIE_NAME, encodedToken, cookieOptions);
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
  Cookies.remove(AUTH_COOKIE_NAME, { domain: ROOT_DOMAIN });
}

export function clearAuthCookie() {
  Cookies.remove(AUTH_COOKIE_NAME, {
    domain: ROOT_DOMAIN,
    path: '/',
  });
}

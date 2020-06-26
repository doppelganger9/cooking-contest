export function getCookies(_document) {
  const cookiesWithNameAndValue = _document.cookie.split('; ').map(it => ({ name: it.split('=')[0], value: it.split('=')[1] }));
  return cookiesWithNameAndValue;
}

export const COOKIE_NAME = 'cookingcontestusername';

export function setCookie({ document = document, name = COOKIE_NAME, value = undefined, days = 1 }) {
  const expires = days ? `; expires=${new Date(new Date().getTime() + (days * 24 * 60 * 60 * 1000)).toGMTString()}` :'';
  document.cookie = `${name}=${value ? value : ''}${expires}; path=/`;
}

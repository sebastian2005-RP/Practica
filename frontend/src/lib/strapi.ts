const STRAPI_URL = 'http://localhost:1337';

export async function fetchStrapi(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Error en Strapi al llamar a ${endpoint}: ${res.statusText}`);
  }

  return res.json();
}
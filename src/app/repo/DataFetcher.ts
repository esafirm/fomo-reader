import { ApiResonse } from './ApiResponse';
import { Feed } from './Feed';

const BASE_URL = 'https://fomo.azurewebsites.net';

export async function getFeeds(): Promise<ApiResonse<Feed[]>> {
  return await get(`${BASE_URL}/feed`);
}

async function get(url: string) {
  console.log('==> GET ', url);
  const res = await fetch(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_AUTH as string,
    },
  });

  const json = await res.json();
  console.log('<== GET ', url, json);

  return json;
}

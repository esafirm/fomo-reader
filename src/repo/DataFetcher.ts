import { ApiResonse } from './ApiResponse';
import { CompanyReview, Feed, Salary } from './DataTypes';

const BASE_URL = 'https://fomo.azurewebsites.net';

class DataFetcher {
  static async getFeeds(): Promise<ApiResonse<Feed[]>> {
    return get(`${BASE_URL}/feed`);
  }

  static async getFeedDetail(feedId: string): Promise<ApiResonse<Comment[]>> {
    return get(`${BASE_URL}/activity/${feedId}/comments`);
  }

  static async getCompanyReview(): Promise<ApiResonse<CompanyReview[]>> {
    return get(`${BASE_URL}/companyReview`, {
      limit: '30',
      page: '1',
    });
  }

  static async getSalary(): Promise<ApiResonse<Salary[]>> {
    return get(`${BASE_URL}/salary`, {
      limit: '30',
      page: '1',
    });
  }

  static async getSalaryJobTitles(): Promise<ApiResonse<Salary[]>> {
    return get(`${BASE_URL}/salary/jobTitles`, {
      limit: '5',
    });
  }

  static async getSalaryForJob(jobTitleId: string) {
    return get(`${BASE_URL}/salary/${jobTitleId}`, {
      limit: '30',
      page: '1',
    });
  }

  static async getCompany(companyName: string = '') {
    return get(`${BASE_URL}/salary/company/v2`, {
      search: companyName,
    });
  }
}

export default DataFetcher;

/* Internal */
/* ------------------------------------------ */

async function get(url: string, params?: Record<string, string>) {
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }

  onPreRequest(url);
  const res = await fetch(url, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_AUTH as string,
    },
  });

  const json = await res.json();
  onPostRequest(url, json);

  return json;
}

function onPreRequest(url: string) {
  console.log('==> GET ', url);
}

function onPostRequest(url: string, json: any) {
  console.log('<== GET ', url, json);
}

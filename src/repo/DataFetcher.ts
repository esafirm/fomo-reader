import { ApiResonse } from './ApiResponse';
import {
  Company,
  CompanyReview,
  CompanyWrapped,
  Feed,
  FeedComment,
  Salary,
} from './DataTypes';

const BASE_URL = 'https://fomo.azurewebsites.net';

class DataFetcher {
  static async getFeeds(): Promise<ApiResonse<Feed[]>> {
    return get(`${BASE_URL}/feed?sortMode=TRENDING&limit=50`);
  }

  static async getActivityComments(
    feedId: string
  ): Promise<ApiResonse<FeedComment[]>> {
    return get(`${BASE_URL}/activity/${feedId}/comments`);
  }

  static async getFeed(feedId: string): Promise<Feed> {
    return post(`${BASE_URL}/activity`, {
      activityId: feedId,
    });
  }

  static async getCompanyReviews(): Promise<ApiResonse<CompanyReview[]>> {
    return get(`${BASE_URL}/companyReview`);
  }

  static async getCompanyReview(activityId: string): Promise<CompanyReview> {
    return post(`${BASE_URL}/activity`, {
      activityId: activityId,
    });
  }

  static async getSalaries(page: number = 1): Promise<ApiResonse<Salary[]>> {
    return get(`${BASE_URL}/salary`, {
      limit: '50',
      page: page.toString(),
    });
  }

  static async getSalary(activityId: string): Promise<Salary> {
    return post(`${BASE_URL}/activity`, {
      activityId: activityId,
    });
  }

  static async getSalaryJobTitles(): Promise<ApiResonse<Salary[]>> {
    return get(`${BASE_URL}/salary/jobTitles`, {
      limit: '50',
    });
  }

  static async getSalaryForJob(jobTitleId: string) {
    return get(`${BASE_URL}/salary/${jobTitleId}`, {
      limit: '30',
      page: '1',
    });
  }

  static async getSalaryForCompany(companyName: string = '') {
    return get(`${BASE_URL}/salary/company/v2`, {
      search: companyName,
    });
  }

  static async getCompanies(page: number = 1): Promise<Company[]> {
    return get(`${BASE_URL}/company/reviewed`, {
      limit: '30',
      page: page.toString(),
    });
  }

  static async searchCompanies(
    query: string
  ): Promise<ApiResonse<CompanyWrapped[]>> {
    return get(`${BASE_URL}/company/v2`, {
      search: query,
    });
  }

  static async getSoftwareEngineerSalariesInCompany(
    companyId: number
  ): Promise<ApiResonse<Salary[]>> {
    return get(`${BASE_URL}/salary`, {
      jobTitleId: '1',
      companyId: companyId.toString(),
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

  onPreRequest('GET', url);
  const res = await fetch(url, {
    headers: {
      Authorization: process.env.AUTH_TOKEN as string,
    },
    next: {
      revalidate: 5,
    },
  });

  const json = await res.json();
  onPostRequest('GET', url, json);

  return json;
}

async function post(url: string, params?: Record<string, string>) {
  const payload = JSON.stringify(params);

  onPreRequest('POST', url, payload);
  const res = await fetch(url, {
    headers: {
      Authorization: process.env.AUTH_TOKEN as string,
      'content-type': 'application/json',
    },
    referrer: 'https://fomo.id/',
    body: payload,
    method: 'POST',
  });
  const json = await res.json();
  onPostRequest('POST', url, json);

  return json;
}

function onPreRequest(method: string, url: string, payload: any = '') {
  console.log(`==> ${method} `, url, payload);
}

function onPostRequest(method: string, url: string, json: any) {
  console.log(`<== ${method} `, url, json);
}

import Card from '@/components/Card';
import Rating from '@/components/Rating';
import DataFetcher from '@/repo/DataFetcher';
import { NextSearchParams } from '@/repo/ExternalParams';
import { CompanyAvatar, CompanyOtherStats } from './CompanyComponents';
import SaerchCompany from './SearchCompany';

type CompanyPageProps = {
  searchParams: NextSearchParams;
};

export default async function ReviewsPage(props: CompanyPageProps) {
  const searchTerm = safelyGetSearch(props.searchParams);
  const companies = await fetchCompanies(searchTerm);

  return (
    <div className="w-full">
      <SaerchCompany />
      <div className="grid grid-cols-1 gap-4 py-4">
        {companies
          .filter((company) => company.ratings)
          .map((company, index) => (
            <Card key={index} href={`/company/${company.id}`}>
              <div className="flex flex-row items-center mb-2">
                <CompanyAvatar company={company} />

                <div>
                  <p className="text-gray-600 text-lg">{company.name}</p>
                  <Rating rating={company.ratings} />
                </div>
              </div>

              <CompanyOtherStats company={company} />
            </Card>
          ))}
      </div>
    </div>
  );
}

async function fetchCompanies(searchTerm: string) {
  if (searchTerm) {
    return await DataFetcher.searchCompanies(searchTerm)
      .then((res) => res.data)
      .then((data) => data.map((company) => company.data));
  } else {
    return await DataFetcher.getCompanies();
  }
}

function safelyGetSearch(searchParams: NextSearchParams): string {
  if (!searchParams) return '';
  const searchTerm = searchParams['search'];

  if (Array.isArray(searchTerm)) return '';
  return searchTerm ?? '';
}

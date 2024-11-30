import Card from '@/components/Card';
import DataFetcher from '@/repo/DataFetcher';
import Rating from '@/components/Rating';
import { CompanyAvatar, CompanyOtherStats } from './CompanyComponents';
import SaerchCompany from './SearchCompany';
import { Company } from '@/repo/DataTypes';

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const actualSearch = ((await searchParams).search as string) || '';
  var companies: Company[] = [];

  if (actualSearch) {
    companies = await DataFetcher.searchCompanies(actualSearch)
      .then((res) => res.data)
      .then((data) => data.map((company) => company.data));
  } else {
    companies = await DataFetcher.getCompanies();
  }

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

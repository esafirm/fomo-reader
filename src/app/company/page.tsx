import Card from '@/components/Card';
import DataFetcher from '@/repo/DataFetcher';
import Rating from '@/components/Rating';
import { CompanyAvatar, CompanyOtherStats } from './CompanyComponents';

export default async function ReviewsPage() {
  const companies = await DataFetcher.getCompanies();

  return (
    <div className="grid grid-cols-1 gap-4 py-4">
      {companies.map((company, index) => (
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
  );
}

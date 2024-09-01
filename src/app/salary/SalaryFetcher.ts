import { executeSql } from '@/repo/DatabaseClient';
import DataFetcher from '@/repo/DataFetcher';
import { Salary } from '@/repo/DataTypes';

export async function getSalaries(): Promise<Salary[]> {
  const res = await DataFetcher.getSalary();
  const filtered = res.data.filter((s) => s.inner.user && s.inner.jobTitle);

  await upsertSalaryData(
    filtered.map((s) => {
      return {
        id: s.inner.activityId,
        base: s.inner.baseMonthlySalaryInRupiah,
        bonus: s.inner.annualBonusInRupiah,
        equity: s.inner.annualMarketPriceEquityInRupiah,
        companyName: s.inner.user.companyName,
        yoe: s.inner.yearsOfExperience,
        jobTitle: s.inner.jobTitle.value,
      };
    })
  );

  return filtered;
}

type SalaryData = {
  id: number;
  companyName: string;
  base: number | null;
  bonus: number | null;
  equity: number | null;
  yoe: number | null;
  jobTitle: string;
};

async function upsertSalaryData(salaries: SalaryData[]) {
  const values = salaries
    .filter((d) => d.id)
    .map(
      (s) =>
        `(${s.id}, ${s.base ?? 0}, ${s.bonus ?? 0}, ${s.equity ?? 0}, '${
          s.companyName
        }', ${s.yoe ?? 0}, '${s.jobTitle ?? ''}')`
    )
    .join(', ');

  const query = `
	INSERT INTO salary (id, base_salary, bonus, equity, company_name, years_of_experience, job_title)
  SELECT * FROM (
    VALUES ${values}
  ) as new_salary  
	
	ON CONFLICT (id) DO UPDATE SET
    base_salary = EXCLUDED.base_salary,
    bonus = EXCLUDED.bonus,
    equity = EXCLUDED.equity,
    company_name = EXCLUDED.company_name,
    years_of_experience = EXCLUDED.years_of_experience,
		job_title = EXCLUDED.job_title;
	`;

  executeSql(query);
}

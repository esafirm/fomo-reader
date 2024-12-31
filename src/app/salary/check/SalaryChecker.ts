import { executeSql } from '@/repo/DatabaseClient';

type SalaryCheckResult = {
  jobTitle: String;
  description: String;
};

type SalaryCategoryData = {
  job_title: string;
  p05: number;
  p10: number;
  p25: number;
  p45: number;
  p50: number;
  p55: number;
  p75: number;
  p90: number;
  p95: number;
  p99: number;
};

type SalaryTier = {
  description: string;
  salary: number;
};

export async function checkSalary(
  jobTitle: String,
  currentSalary: number
): Promise<SalaryCheckResult> {
  const res = await executeSql(
    `WITH salary_ranges AS (
			SELECT 
				job_title,
				PERCENTILE_CONT(0.05) WITHIN GROUP (ORDER BY base_salary) as p05,
				PERCENTILE_CONT(0.10) WITHIN GROUP (ORDER BY base_salary) as p10,
				PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY base_salary) as p25,
				PERCENTILE_CONT(0.45) WITHIN GROUP (ORDER BY base_salary) as p45,
				PERCENTILE_CONT(0.50) WITHIN GROUP (ORDER BY base_salary) as p50,
				PERCENTILE_CONT(0.55) WITHIN GROUP (ORDER BY base_salary) as p55,
				PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY base_salary) as p75,
				PERCENTILE_CONT(0.90) WITHIN GROUP (ORDER BY base_salary) as p90,
				PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY base_salary) as p95,
				PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY base_salary) as p99
			FROM salary
			WHERE job_title = 'Software Engineer'  -- Replace with the job title you're interested in
			GROUP BY job_title
	)
	SELECT
		job_title,
		p05,
		p10,
		p25,
		p45,
		p50,
		p55,
		p75,
		p90,
		p95,
		p99
	FROM salary_ranges;`
  );

  const categoryData = res as unknown as SalaryCategoryData[];
  const tiers = toTiers(categoryData[0]);

  return {
    jobTitle: jobTitle,
    description: getSalaryDescription(currentSalary, tiers),
  };
}

function getSalaryDescription(
  currentSalary: number,
  tiers: SalaryTier[]
): string {
  let currentDescription = 'Bottom 5%';

  for (let i = 0; i < tiers.length; i++) {
    const tier = tiers[i];
    if (currentSalary <= tier.salary) return currentDescription;
    currentDescription = tier.description;
  }

  return 'Top 1%';
}

function toTiers(categoryData: SalaryCategoryData): SalaryTier[] {
  return [
    {
      description: 'Bottom 5%',
      salary: categoryData.p05,
    },
    {
      description: 'Lower 10%',
      salary: categoryData.p10,
    },
    {
      description: 'Lower Quarter',
      salary: categoryData.p25,
    },
    {
      description: 'Below Average',
      salary: categoryData.p45,
    },
    {
      description: 'Average',
      salary: categoryData.p50,
    },
    {
      description: 'Above Average',
      salary: categoryData.p55,
    },
    {
      description: 'Upper Quarter',
      salary: categoryData.p75,
    },
    {
      description: 'Top 10%',
      salary: categoryData.p90,
    },
    {
      description: 'Top 5%',
      salary: categoryData.p95,
    },
    {
      description: 'Top 1%',
      salary: categoryData.p99,
    },
  ];
}

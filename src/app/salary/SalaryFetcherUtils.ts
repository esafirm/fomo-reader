export function standardizeJobTitle(title?: string): string {
  if (!title) return 'Fomo User';

  const lowerTitle = title.trim().toLowerCase();

  // Define mapping rules
  const titleMap: { [key: string]: string } = {
    // Software Engineer
    programmer: 'Software Engineer',
    'application developer': 'Software Engineer',

    // Backend Development
    'backend developer': 'Backend Engineer',

    // Frontend Development
    'frontend developer': 'Frontend Engineer',

    // Mobile
    'android engineer': 'Android Developer',

    // Quality Assurance
    'qa analyst': 'QA Engineer',
    'quality assurance': 'QA Engineer',
    'quality assurance analyst': 'QA Engineer',

    // UX Design
    'UX designer': 'UI/UX designer',

    // IT Support
    'it technical support': 'IT Support',

    // Marketing
    'digital marketing': 'Marketing',
    'marketing specialist': 'Marketing',

    // Human Resources
    hr: 'Human Resource',
    'human capital': 'Human Resource',

    // Finance
    'finance & accounting': 'Finance',
    'finance officer': 'Finance',

    // Business Development
    'business development analyst': 'Business Development',

    // Business Analysis
    'it business analyst': 'Business Analyst',

    // Project Management
    'project management officer': 'Project Manager',

    // Internship
    internship: 'Intern',

    // Cloud Engineering
    'cloud computing': 'Cloud Engineer',

    // Full Stack Development
    'full stack engineer': 'Fullstack Developer',

    // Technical Leadership
    'technical lead': 'Tech Lead',

    // Data Engineering
    'senior data engineer': 'Data Engineer',

    // Design
    'Product Designer': 'Design',
  };

  // Check if the title needs to be mapped
  for (const [key, value] of Object.entries(titleMap)) {
    if (lowerTitle.includes(key)) {
      return value;
    }
  }

  return title;
}

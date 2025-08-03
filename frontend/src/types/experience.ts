export interface Position {
  title: string;
  period: string;
  location?: string;
  description?: string;
}

export interface ExperienceCompany {
  company: string;
  logo?: string;
  period: string;
  location?: string;
  positions: Position[];
}

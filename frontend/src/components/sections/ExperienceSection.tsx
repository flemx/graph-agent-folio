import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExperienceCompany } from '@/types/experience';
import { usePortfolio } from '@/context/PortfolioContext';

interface ExperienceSectionProps {
  data?: ExperienceCompany[];
}

const ExperienceSection = ({ data }: ExperienceSectionProps) => {
  const { state } = usePortfolio();
  const liveData = (state.experience_data as { experience: ExperienceCompany[] } | undefined)?.experience;
  const resolved = liveData ?? data;
  const companies = resolved ?? [];
  if (!companies.length) return null;
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Professional Experience</h2>
        <p className="text-lg text-muted-foreground">
          Building enterprise AI solutions &amp; agent systems
        </p>
      </div>

      <div className="space-y-6">
        {companies.map((exp, idx) => (
          <Card key={idx} className="bg-gradient-secondary ">
            <CardHeader className="border-b pb-4">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  {exp.logo && (
                    <img src={exp.logo} alt={exp.company} className="h-6 w-6 rounded-sm object-contain" />
                  )}
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {exp.company}
                  </CardTitle>
                  {exp.location && (
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  )}
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p className="font-medium">{exp.period}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {(exp.positions ?? []).map((pos, pIdx) => (
                <div key={pIdx} className="space-y-2 border-t border-foreground/20 pt-4 first:pt-0 first:border-none mt-4">
                  <div className="flex justify-between flex-wrap gap-2">
                    <h4 className="font-semibold  text-foreground">{pos.title}</h4>
                    <span className="text-sm text-muted-foreground">{pos.period}</span>
                  </div>
                  {pos.description && (
                    <p className="whitespace-pre-line text-sm text-foreground/90   border-primary/20 ml-4 pt-2">
                      {pos.description}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;

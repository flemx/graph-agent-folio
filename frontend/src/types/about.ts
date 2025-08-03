export interface AboutSectionData {
  /**
   * High-level personal information and bio
   */
  profile: {
    /** Avatar image url */
    avatar: string;
    /** Full name e.g. "Damien Fleminks" */
    fullName: string;
    /** Role or headline to display under the name */
    subTitle: string;
    /** Short or multi-paragraph about-me text */
    summary: string;
    /** Country of residence */
    country: string;
    /** Spoken languages */
    languages: string[];
  };

  /**
   * Skill tags to render in the skills section
   */
  skills: string[];

  /**
   * Contact and social links
   */
  contact: {
    /** Complete LinkedIn profile url */
    linkedin: string;
    /** GitHub url, if available */
    github?: string;
    /** Any additional personal websites */
    websites?: string[];
  };
}

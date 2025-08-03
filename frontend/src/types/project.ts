export interface Project {
  /** Project title */
  title: string;
  /** Short description */
  description: string;
  /** Optional list of technologies */
  technologies?: string[];
  /** Array of image URLs (screenshots/mockups) */
  images?: string[];
  /** Optional demo video url ( e.g. YouTube ) */
  demoVideoUrl?: string;
  /** Optional live demo site */
  liveDemoUrl?: string;
  /** Optional source code repository */
  sourceUrl?: string;
}
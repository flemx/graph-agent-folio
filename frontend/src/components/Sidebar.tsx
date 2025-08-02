import { 
  PanelLeft, 
  FileText, 
  BellPlus, 
  Mail, 
  UserPlus, 
  Moon,
  Sun 
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed bottom-0 left-0 top-0 hidden md:flex flex-col items-stretch gap-3 overflow-hidden border-r border-r-secondary pb-3 pt-3 transition-all duration-200 ease-in-out w-11">
      <div className="flex min-h-[28px] flex-row items-center transition-all duration-200 ease-in-out justify-center">
        <button 
          type="button" 
          className="transition-colors hover:bg-secondary cursor-pointer flex h-8 w-8 flex-row items-center justify-center rounded-md p-2"
          title="Toggle Menu"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex flex-1 flex-col px-2.5">
        <div className="flex-grow"></div>
        
        <div className="flex flex-col pb-3 gap-1">
          <a 
            className="flex items-center text-secondary flex-col justify-center" 
            aria-label="Documentation"
            href="#"
          >
            <div className="transition-colors hover:bg-secondary cursor-pointer rounded-md p-2 text-secondary">
              <FileText className="h-4 w-4" />
            </div>
          </a>
          
          <a 
            className="flex items-center text-secondary flex-col justify-center" 
            aria-label="What's New"
            href="#"
          >
            <div className="transition-colors hover:bg-secondary cursor-pointer rounded-md p-2 text-secondary">
              <BellPlus className="h-4 w-4" />
            </div>
          </a>
          
          <a 
            className="flex items-center text-secondary flex-col justify-center" 
            aria-label="Contact Sales"
            href="#"
          >
            <div className="transition-colors hover:bg-secondary cursor-pointer rounded-md p-2 text-secondary">
              <Mail className="h-4 w-4" />
            </div>
          </a>
          
          <button 
            type="button"
            className="relative"
          >
            <div className="flex items-center text-secondary flex-col justify-center" aria-label="Invitations">
              <div className="transition-colors hover:bg-secondary cursor-pointer rounded-md p-2 text-secondary">
                <UserPlus className="h-4 w-4" />
              </div>
            </div>
          </button>
          
          <button 
            type="button"
            onClick={toggleTheme}
            className="flex w-full select-none items-center outline-none flex-col justify-center gap-0"
          >
            <div className="flex items-center gap-1.5 text-primary transition-colors hover:bg-secondary cursor-pointer rounded-md p-2">
              {theme === 'dark' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </div>
          </button>
        </div>
        
        <div className="w-full">
          <button 
            type="button"
            className="flex w-full items-center text-xs transition-all hover:bg-secondary mx-auto justify-center rounded-md"
          >
            <div 
              className="inline-flex flex-col items-center justify-center rounded-full text-sm uppercase pointer-events-none h-5 w-5"
              style={{ backgroundImage: 'linear-gradient(to right bottom, rgb(68, 1, 84), rgb(170, 170, 170))' }}
            >
              <div className="cursor-default font-medium text-white text-opacity-90"></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Sidebar;
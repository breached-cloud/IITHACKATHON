
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/Layout/ThemeToggle";
import { Menu, X, Eye, Sparkles, Cpu, Lightbulb, BookOpen } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [logoAnimation, setLogoAnimation] = useState(false);

  // Logo color changed to teal/cyan gradient
  const logoGradientFrom = "#06b6d4"; // cyan-500
  const logoGradientTo = "#0891b2"; // cyan-600

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Trigger logo animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoAnimation(true);
      setTimeout(() => setLogoAnimation(false), 1000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass py-2 shadow-glass'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Enhanced Logo with book */}
          <div className="flex items-center">
            <div 
              className={`h-12 w-12 bg-gradient-to-br from-[${logoGradientFrom}] to-[${logoGradientTo}] rounded-lg flex items-center justify-center mr-3 shadow-lg relative overflow-hidden cursor-pointer transform transition-all duration-300 ${isHovered ? 'scale-110 shadow-xl' : ''} ${logoAnimation ? 'animate-bounce' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => navigate('/')}
            >
              {/* Logo background effects */}
              <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-lg blur transition-opacity duration-500 ${isHovered ? 'opacity-40' : 'opacity-0'}`}></div>
                <div className={`absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_50%)] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
              </div>
              
              {/* Logo content - E with book integration */}
              <div className="relative z-10 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">E</span>
                <BookOpen 
                  size={12} 
                  className={`absolute text-white/80 transform transition-all duration-300 ${isHovered ? 'scale-125 opacity-100' : 'opacity-70'}`} 
                  style={{ top: '60%', left: '50%', transform: `translate(-50%, -50%) ${isHovered ? 'scale(1.25)' : 'scale(1)'}` }}
                />
              </div>
              
              {/* Spectacles for E */}
              <div className={`absolute top-[47%] left-0 w-full transition-transform duration-300 ${isHovered ? 'transform -translate-y-0.5' : ''}`}>
                <div className={`w-full h-[1.5px] bg-white flex items-center transition-all duration-300 ${isHovered ? 'h-[2px] opacity-80' : 'opacity-60'}`}>
                  <div className={`w-3 h-3 rounded-full border border-white bg-transparent absolute -left-1 transition-all duration-300 ${isHovered ? 'border-[1.5px] bg-white/20 scale-110' : ''}`}></div>
                  <div className={`w-3 h-3 rounded-full border border-white bg-transparent absolute -right-1 transition-all duration-300 ${isHovered ? 'border-[1.5px] bg-white/20 scale-110' : ''}`}></div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className={`absolute -bottom-1 -right-1 text-white transition-all duration-300 ${isHovered ? 'opacity-90 transform scale-125' : 'opacity-60'}`}>
                <Eye size={16} className={`transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
              </div>
              
              {/* Additional decorative elements that appear on hover */}
              <div className={`absolute top-1 left-1 text-white/0 transition-all duration-500 ${isHovered ? 'text-white/80 transform translate-x-0.5 translate-y-0.5' : ''}`}>
                <Sparkles size={10} className={`transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`} />
              </div>
              
              <div className={`absolute -top-1 -right-1 text-white/0 transition-all duration-500 transform rotate-0 ${isHovered ? 'text-white/70 rotate-45' : ''}`}>
                <Lightbulb size={10} className={`transition-all duration-300 ${isHovered ? 'animate-pulse delay-300' : ''}`} />
              </div>
              
              <div className={`absolute bottom-0.5 left-0.5 text-white/0 transition-all duration-500 ${isHovered ? 'text-white/60' : ''}`}>
                <Cpu size={8} className={`transition-all duration-300 ${isHovered ? 'animate-spin' : ''}`} />
              </div>
            </div>
            <h1 className="text-xl font-montserrat font-bold text-cyan-600 dark:text-white relative group">
              EduNexus
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-4">
              <a href="#features" className="font-medium text-gray-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-white transition-colors">Features</a>
              <a href="#testimonials" className="font-medium text-gray-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-white transition-colors">Testimonials</a>
              <a href="#about" className="font-medium text-gray-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-white transition-colors">About</a>
            </nav>

            <div className="flex items-center space-x-2">
              <ThemeToggle />
              
              {isAuthenticated ? (
                <Button 
                  className="bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 text-white"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    className="border-cyan-500 text-cyan-600 hover:bg-cyan-500/10 dark:border-cyan-400 dark:text-cyan-400"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 text-white"
                    onClick={() => navigate("/login")}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="flex flex-col space-y-2 py-2">
            <a href="#features" className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Features</a>
            <a href="#testimonials" className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Testimonials</a>
            <a href="#about" className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">About</a>
            
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              {isAuthenticated ? (
                <Button 
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 text-white"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    className="w-full border-cyan-500 text-cyan-600 hover:bg-cyan-500/10 dark:border-cyan-400 dark:text-cyan-400"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-600 hover:to-teal-500 text-white"
                    onClick={() => navigate("/login")}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

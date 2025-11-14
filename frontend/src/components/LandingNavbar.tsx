import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { AsliBogorLogo } from "./ui/asli-bogor-logo";
import { motion } from "framer-motion";

interface LandingNavbarProps {
  onRoleSelect?: (role: 'user' | 'umkm' | 'driver') => void;
}

export function LandingNavbar({ onRoleSelect }: LandingNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for fixed navbar
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAuthClick = () => {
    scrollToSection('auth-section');
  };

  const navItems = [
    { id: 'hero', label: 'Beranda' },
    { id: 'direktori', label: 'Direktori' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'fitur', label: 'Fitur' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AsliBogorLogo
              variant="primary"
              className={`h-10 w-auto transition-all ${
                isScrolled ? 'h-8' : 'h-10'
              }`}
            />
          </motion.div>

          {/* Menu - Always Visible */}
          <div className="flex items-center gap-4 sm:gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`body-3 transition-colors hover:text-[#FF8D28] whitespace-nowrap ${
                  isScrolled ? 'text-[#2F4858]' : 'text-[#2F4858]'
                }`}
                style={{ fontWeight: 500 }}
              >
                {item.label}
              </button>
            ))}
            <Button
              onClick={handleAuthClick}
              className="px-4 sm:px-6 py-2 text-sm sm:text-base whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #FF8D28 0%, #FFB84D 100%)',
                color: '#FFFFFF',
                border: 'none'
              }}
            >
              Masuk / Daftar
            </Button>
          </div>
        </div>

      </div>
    </nav>
  );
}


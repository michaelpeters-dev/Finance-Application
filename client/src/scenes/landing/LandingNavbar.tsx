import { useState } from "react";
import logo from "/logo_rounded_borders.svg";
import { Button } from "@mui/material";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = ["About", "Features", "Help", "Contact"];

const LandingNavbar = () => {
  // Toggle mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top navigation bar container */}
      <div className="relative z-50 bg-black isolate">
        <div className="px-4">
          <div className="py-4 px-2 flex justify-between items-center">
            {/* Logo and title */}
            <div className="flex items-center gap-2">
              <img
                src={logo}
                width={45}
                alt="Logo"
                className="drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]"
              />
              <span className="text-white text-lg font-semibold tracking-tighter px-5">
                Finance Application
              </span>
            </div>

            {/* Desktop navigation menu */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="text-opacity-60 text-white hover:text-opacity-100 transition h-10 flex items-center"
                >
                  {label}
                </a>
              ))}
              <Button
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <Link to="/dashboard">Try For Free</Link>
              </Button>
            </nav>

            {/* Mobile hamburger menu button */}
            <button
              className="md:hidden border border-white border-opacity-30 h-10 w-10 flex justify-center items-center rounded-lg"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="text-white" />
              ) : (
                <Menu className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center px-4 pt-10 md:hidden">
          <div className="flex flex-col space-y-8 text-center">
            {navItems.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="uppercase text-lg font-semibold tracking-wide hover:text-primary transition-colors duration-300"
              >
                {label}
              </a>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="text-lg font-semibold bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Get For Free
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNavbar;

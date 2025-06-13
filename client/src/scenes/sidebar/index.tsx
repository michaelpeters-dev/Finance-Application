import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Contact,
  User,
  Calendar,
  HelpCircle,
  BarChart,
  Menu,
} from "lucide-react";
import logo from "/logo_rounded_borders.svg";
import profile from "@/assets/images/guest.jpg";
import { useTheme } from "@mui/material";

const navSections = [
  {
    title: "Data",
    items: [
      { label: "My Data", path: "/mydata", icon: <Users size={18} /> },
      {
        label: "Upload New Data",
        path: "/newdata",
        icon: <Contact size={18} />,
      },
    ],
  },
  {
    title: "ML Predictions",
    items: [
      {
        label: "Linear Regression",
        path: "/linearregression",
        icon: <BarChart size={18} />,
      },
    ],
  },
  {
    title: "Advisors",
    items: [
      {
        label: "Financial Agent",
        path: "/financialagent",
        icon: <User size={18} />,
      },
      {
        label: "General Help Agent",
        path: "/generalhelpagent",
        icon: <Calendar size={18} />,
      },
      { label: "FAQ", path: "/faq", icon: <HelpCircle size={18} /> },
    ],
  },
];

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const location = useLocation();
  const { palette } = useTheme();

  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 text-white transition-all duration-300 ease-in-out flex flex-col shadow-md border-r border-white/10 ${
        isOpen ? "w-64" : "w-16"
      } bg-[#2d2d34]`}
    >
      {/* Top section */}
      <div
        className={`relative flex items-center h-16 px-4 border-b border-white/10 ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        {isOpen && (
          <div className="flex items-center gap-3 z-10 pl-1">
            <img
              src={logo}
              alt="Logo"
              className="w-10 drop-shadow-[0_0_4px_rgba(255,255,255,0.7)]"
            />

            <span className="text-lg font-semibold whitespace-nowrap translate-y-[1px]">
              Finance App
            </span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:scale-110 transition-transform z-10"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Profile */}
      {isOpen && (
        <div className="text-center py-5 border-b border-white/10">
          <img
            src={profile}
            alt="Profile"
            className="mx-auto w-20 h-20 rounded-full mb-2 shadow-[0_0_6px_rgba(255,255,255,0.3)] bg-white object-cover"
            style={{ border: `2px solid ${palette.primary[400]}` }}
          />

          <h2 className="text-lg font-semibold">Guest</h2>
          <p className="text-sm" style={{ color: palette.primary[400] }}>
            Tester
          </p>
        </div>
      )}

      {/* Navigation */}
      <div
        className={`flex-1 overflow-y-auto flex flex-col ${
          isOpen ? "px-4 pt-4" : "pt-4 items-center"
        }`}
      >
        {/* Dashboard */}
        <Link
          to="/dashboard"
          className={`flex items-center px-3 py-2 mb-2 rounded-md transition ${
            location.pathname === "/dashboard"
              ? "bg-white/10 text-white"
              : "text-white/70 hover:bg-white/5"
          } ${isOpen ? "gap-3 justify-start" : "justify-center"}`}
        >
          <Home size={18} />
          {isOpen && <span className="text-sm font-medium">Dashboard</span>}
        </Link>

        {/* Nav sections */}
        {navSections.map(({ title, items }) => (
          <div key={title} className={`w-full ${isOpen ? "mt-6" : "mt-2"}`}>
            {isOpen && (
              <h4 className="text-xs text-white/40 mb-2 tracking-widest uppercase">
                {title}
              </h4>
            )}
            <div
              className={`flex flex-col space-y-1 ${!isOpen && "items-center"}`}
            >
              {items.map(({ label, path, icon }) => (
                <Link
                  key={label}
                  to={path}
                  className={`flex items-center px-3 py-2 rounded-md transition ${
                    location.pathname === path
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5"
                  } ${isOpen ? "gap-3 justify-start" : "justify-center"}`}
                >
                  {icon}
                  {isOpen && (
                    <span className="text-sm font-medium">{label}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

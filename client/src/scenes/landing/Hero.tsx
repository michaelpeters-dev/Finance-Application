import { Button } from "@mui/material";
import { ArrowRightAltSharp } from "@mui/icons-material";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-black text-white py-16 md:py-20 lg:py-[72px] relative">
      {/* Blobs */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-[#00f7ff] opacity-20 blur-[160px] sm:blur-[200px] rounded-full pointer-events-none z-0 mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-50px] right-[-50px] w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-[#7f5af0] opacity-25 blur-[140px] sm:blur-[180px] rounded-full pointer-events-none z-0 mix-blend-screen animate-pulse" />
      <div className="absolute left-1/2 top-[40%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] -translate-x-1/2 -translate-y-1/2 bg-white opacity-10 blur-[140px] sm:blur-[180px] rounded-full mix-blend-screen z-0 pointer-events-none" />

      <div className="container relative mx-auto px-4 z-10">
        <div className="flex items-center justify-center mb-6">
          <a
            href="#about"
            className="inline-flex gap-3 border py-1 px-2 rounded-lg border-white/30"
          >
            <span className="bg-clip-text [-webkit-background-clip:text]">
              Version 1.0 is here
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Read More</span>
              <ArrowRightAltSharp />
            </span>
          </a>
        </div>

        {/* Heading */}
        <div className="flex justify-center">
          <div className="inline-flex relative">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-9xl font-bold tracking-tighter text-center mt-6 sm:mt-8 max-w-xs sm:max-w-md lg:max-w-2xl drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              Finance <br /> Application
            </h1>
          </div>
        </div>

        {/* Paragraph */}
        <p className="text-center text-base sm:text-lg md:text-xl mt-6 sm:mt-8 max-w-xl mx-auto py-6">
          See your financial future more clearly. Use machine learning to
          analyze your data and to help you grow wealth, avoid risk, and plan
          with precision.
        </p>

        {/* Button */}
        <div className="flex justify-center mt-6 sm:mt-8 px-4">
          <Link to="/dashboard">
            <Button
              sx={{
                backgroundColor: "white",
                color: "black",
                textTransform: "none",
                padding: {
                  xs: "0.5rem 1.25rem",
                  sm: "0.5rem 1.5rem",
                  md: "0.5rem 2rem",
                },
                borderRadius: "0.5rem",
                fontWeight: 500,
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                  md: "1.125rem",
                },
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              Try Now
            </Button>
          </Link>
        </div>
      </div>

      <motion.div
        className="pt-12 mt-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        viewport={{ once: true }}
      >
        <span className="text-sm text-white/70 mb-1">Scroll</span>
        <ArrowDown className="h-5 w-5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
      </motion.div>
    </div>
  );
};

export default Hero;

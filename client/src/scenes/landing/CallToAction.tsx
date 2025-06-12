import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div
      id="contact"
      className="relative z-[30] overflow-visible bg-black text-white pt-[120px] pb-[72px] sm:pb-24 text-center"
    >
      {/* Blobs */}
      <div className="absolute -top-0 -left-20 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-[#00f7ff] opacity-20 blur-[160px] sm:blur-[200px] rounded-full pointer-events-none z-0 mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-50px] right-[-50px] w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-[#7f5af0] opacity-25 blur-[140px] sm:blur-[180px] rounded-full pointer-events-none z-0 mix-blend-screen animate-pulse" />

      {/* Main Content */}
      <div className="container max-w-xl relative z-[2] mx-auto">
        <h2 className="font-bold text-5xl tracking-tighter sm:text-6xl">
          Get instant access
        </h2>
        <p className="text-xl text-white/70 mt-5">
          Celebrate the joy of accomplishment with an app designed to track your
          progress and motivate your efforts.
        </p>
        <form className="mt-10 flex flex-col sm:flex-row gap-2.5 w-full max-w-sm mx-auto px-4 sm:px-0">
          <input
            type="email"
            placeholder="your@email.com"
            className="h-12 w-full bg-white/20 rounded-lg px-5 font-medium placeholder:text-[#9CA3AF] text-white"
          />
          <Link to="/dashboard">
            <Button
              fullWidth
              sx={{
                height: "48px",
                backgroundColor: "white",
                color: "black",
                textTransform: "none",
                whiteSpace: "nowrap",
                padding: {
                  xs: "0.5rem 1.25rem",
                  sm: "0.5rem 1.5rem",
                  md: "0.5rem 2rem",
                },
                borderRadius: "0.5rem",
                fontWeight: 500,
                fontSize: {
                  xs: "0.875rem",
                  sm: "0.92rem",
                },
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              Get access
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CallToAction;

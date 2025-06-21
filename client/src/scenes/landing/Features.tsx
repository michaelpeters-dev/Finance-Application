import appScreen from "../../assets/images/app-screen.png";

const Features = () => {
  return (
    <div
      id="features"
      className="bg-black text-white bg-gradient-to-b from-black to-[#10242e] py-[72px] py-24"
    >
      <div className="container">
        {/* Section header */}
        <h2 className="text-center text-5xl sm:text-6xl font-bold tracking-tighter">
          Seamless Interface
        </h2>

        {/* Subtitle */}
        <div className="max-w-xl mx-auto">
          <p className="text-xl text-center text-white/70 mt-5">
            Accomplish financial growth accompanied with an app designed to
            predict your wealth.
          </p>
        </div>

        {/* App screenshot display */}
        <img
          src={appScreen}
          alt="Product screen screenshot"
          className="mt-14 border-[6px] border-[#2a2d32] rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
};

export default Features;

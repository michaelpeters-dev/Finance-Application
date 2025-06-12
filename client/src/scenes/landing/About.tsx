import { CircleCheck } from "lucide-react";

const features = [
  {
    title: "Smart Financial Forecasting",
    description:
      "Predict income, expenses, and net cash flow using machine learning. Anticipate future trends and make better financial decisions today.",
  },
  {
    title: "Real-Time Risk Analysis",
    description:
      "Instantly detect anomalies and potential financial risks using trained AI models, helping you avoid losses before they happen.",
  },
  {
    title: "Personalized Investment Insights",
    description:
      "Receive tailored investment suggestions based on spending patterns, goals, and historical data — all driven by ML-backed predictions.",
  },
];

const About = () => {
  return (
    <div id="about" className="bg-black text-white py-[72px]">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">
          Everything you need
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center mt-5 text-xl text-white/70">
            Enjoy customizable lists, team work tools, and smart tracking all in
            one place. Set tasks, get reminders, and see your progress simply
            and quickly.
          </p>
        </div>
        <div className="mt-16 flex flex-col sm:flex-row gap-4">
          {features.map(({ title, description }) => (
            <div
              key={title}
              className="border border-white/30 px-5 py-10 text-center rounded-xl sm:flex-1"
            >
              <div className="inline-flex h-14 w-14 bg-white text-black justify-center items-center rounded-lg">
                <CircleCheck className="h-6 w-6" />
              </div>

              <h3 className="mt-6 font-bold">{title}</h3>
              <p className="mt-2 text-white/70">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;

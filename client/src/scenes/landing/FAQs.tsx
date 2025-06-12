"use client";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const items = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We acccept all major credit cards, PayPal, and various other payment methods that are safe and secure.",
  },
  {
    question: "How does the pricing work for teams",
    answer:
      "Our pricing is per user, per month. This means you only pay for the number of members you have on your account.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes to your account will be prorated and reflected in your next billing cycle.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is our top priority. We use state-of-the-art encryption and comply with the best industry practices to ensure that your data is stored securely and accessed only by authorized users.",
  },
];

const AccordianItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="py-7 border-b border-white/30"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center">
        <span className="flex-1 text-lg font-bold">{question}</span>
        {isOpen ? <Minus /> : <Plus />}
      </div>
      <div className={clsx("mt-4", { hidden: !isOpen, "": isOpen === true })}>
        {answer}
      </div>
    </div>
  );
};

const FAQs = () => {
  return (
    <div
      id="help"
      className="text-white bg-gradient-to-b from-[#10242e] to-black py-[72px] sm:py-24"
    >
      <div className="container">
        <h2 className="text-center text-5xl sm:text-6xl sm:max-w-[648px] mx-auto font-bold tracking-tighter">
          Frequently asked questions
        </h2>
        <div className="mt-12 w-full px-4 sm:px-6 lg:px-8">
          {items.map(({ question, answer }) => (
            <AccordianItem question={question} answer={answer} key={question} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;

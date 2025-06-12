import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-screen py-4 text-black text-center bg-[linear-gradient(90deg,_rgb(233,239,244),_rgb(188,211,231),_rgb(248,249,250))]">
      <div className="container max-w-none mx-auto text-center">
        <Link
          to="/dashboard"
          className="underline underline-offset-4 font-medium"
        >
          Explore the demo
        </Link>
      </div>
    </div>
  );
};

export default Banner;

import instaIcon from "../../assets/icons/insta.svg";
import xSocial from "../../assets/icons/x-social.svg";
import tiktokIcon from "../../assets/icons/tiktok.svg";
import youtubeIcon from "../../assets/icons/youtube.svg";

const Footer = () => {
  return (
    <footer className="relative z-[50] bg-black py-5 text-white/60 border-t border-white/20">
      <div className="container">
        {/* Layout for text and social icons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          {/* Copyright text */}
          <div className="text-center">
            © {new Date().getFullYear()} Finance App, Inc. All rights reserved
          </div>

          {/* Social media icons */}
          <ul className="flex justify-center gap-2.5">
            <li>
              <img src={instaIcon} alt="insta icon" width={25} />
            </li>
            <li>
              <img src={xSocial} alt="x (formerly Twitter) icon" width={25} />
            </li>
            <li>
              <img src={tiktokIcon} alt="tiktok icon" width={25} />
            </li>
            <li>
              <img src={youtubeIcon} alt="youtube icon" width={25} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

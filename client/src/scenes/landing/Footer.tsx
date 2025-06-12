import instaIcon from "../../assets/icons/insta.svg";
import xSocial from "../../assets/icons/x-social.svg";
import tiktokIcon from "../../assets/icons/tiktok.svg";
import youtubeIcon from "../../assets/icons/youtube.svg";

const Footer = () => {
  return (
    <footer className="relative z-[50] bg-black py-5 text-white/60 border-t border-white/20">
      <div className="container">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="text-center">
            © {new Date().getFullYear()} Finance App, Inc. All rights reserved
          </div>
          <ul className="flex justify-center gap-2.5">
            <li>
              <img src={instaIcon} alt="insta icon" width={25} />
            </li>
            <li>
              <img src={xSocial} alt="insta icon" width={25} />
            </li>
            <li>
              <img src={tiktokIcon} alt="insta icon" width={25} />
            </li>
            <li>
              <img src={youtubeIcon} alt="insta icon" width={25} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

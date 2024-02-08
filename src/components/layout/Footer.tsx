import { GiFeather } from "react-icons/gi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const onInstaIconButtonClickHandler = () => {
    window.open("https://github.com/Jun0613-spec");
  };

  const onLinkedinIconButtonClickHandler = () => {
    window.open("https://www.linkedin.com/in/jun-young-park-220bb4229/");
  };

  return (
    <div className=" bg-neutral-800 pl-0 pr-0 py-10">
      <div
        className="w-screen xl:px-20
        lg:px-16 md:px-12 sm:px-8 px-4 flex flex-col gap-5"
      >
        <div className=" flex justify-between items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="flex items-center justify-center text-white">
                <GiFeather size={24} />
              </div>
            </div>
            <p className="text-white text-xl font-normal leading-tight tracking-[-0.4px]">
              Blogfy
            </p>
          </div>
          <div className="gap-5 flex items-center">
            <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
              <div
                onClick={onInstaIconButtonClickHandler}
                className="flex items-center justify-center text-white"
              >
                <FaGithub size={24} />
              </div>
            </div>
            <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
              <div
                onClick={onLinkedinIconButtonClickHandler}
                className="flex items-center justify-center text-white"
              >
                <FaLinkedin size={24} />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-white text-xs font-normal">
            © 2023-2024 Blogfy. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

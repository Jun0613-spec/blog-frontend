import React from "react";

import defaultProfile from "../assets/default-profile.png";

interface AvatarProps {
  src: string | null | undefined;
  isLarge?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src, isLarge }) => {
  return (
    <div>
      <img
        className={`
          ${isLarge ? "h-20" : "h-8"}
          ${isLarge ? "w-20" : "w-8"}
          hover:opacity-80
          object-fill 
          transition 
          cursor-pointer
          relative
          rounded-full
        `}
        alt="avatar"
        src={src || defaultProfile}
      />
    </div>
  );
};

export default Avatar;

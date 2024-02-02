import React from "react";

import defaultProfile from "../assets/default-profile.png";

import FavoriteListItem from "../types/interface/favorite-list-item.interface";
import Avatar from "./Avatar";

interface Props {
  favoriteListItem: FavoriteListItem;
}

const FavoriteItem = ({ favoriteListItem }: Props) => {
  const { userName, profileImage } = favoriteListItem;

  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 md:w-8 md:h-8">
        <div>
          <Avatar src={profileImage ? profileImage : defaultProfile} />
        </div>
      </div>
      <div className=" text-neutral-700 dark:text-neutral-200 text-base font-medium leading-tight cursor-pointer">
        {userName}
      </div>
    </div>
  );
};

export default FavoriteItem;

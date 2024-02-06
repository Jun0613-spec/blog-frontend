import defaultProfile from "../assets/default-profile.png";

import PostListItem from "../types/interface/post-list-item.interface";

import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { POST_DETAIL_PATH, POST_PATH } from "../constant";

interface Props {
  top3ListItem: PostListItem;
}

const TopItems = ({ top3ListItem }: Props) => {
  const {
    postId,
    title,
    content,
    postTitleImage,
    favoriteCount,
    commentCount,
    viewCount,
    createdAt,
    postUserName,
    postUserProfileImage,
  } = top3ListItem;

  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(POST_PATH() + "/" + POST_DETAIL_PATH(postId));
  };

  return (
    <div
      className="w-[calc(360px_-_18px_-_18px)] h-[calc(400px_-_18px_-_18px)] sm:w-[calc(250px_-_18px_-_18px)] sm:h-[calc(400px_-_18px_-_18px)] md:w-[calc(260px_-_20px_-_20px)] md:h-[calc(420px_-_20px_-_20px)]  lg:w-[calc(384px_-_24px_-_24px)] lg:h-[calc(588px_-_24px_-_24px)] flex flex-col-reverse bg-neutral-300 dark:bg-neutral-700 bg-center bg-cover rounded-xl cursor-pointer p-6 hover:opacity-80"
      style={{ backgroundImage: `url(${postTitleImage})` }}
      onClick={onClickHandler}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div>
            <Avatar
              src={postUserProfileImage ? postUserProfileImage : defaultProfile}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="text-neutral-50 dark:text-neutral-100 text-xs font-medium leading-tight">
              {postUserName}
            </div>
            <div className="text-neutral-100 dark:text-neutral-300 text-xs font-normal leading-tight">
              {createdAt}
            </div>
          </div>
        </div>
        <div className="gap-1">
          <div className=" text-neutral-50 dark:text-neutral-100 text-base font-medium leading-tight overflow-hidden whitespace-nowrap text-ellipsis">
            {title}
          </div>
          <div className=" w-full h-4 text-neutral-50 dark:text-neutral-100 text-xs font-normal leading-tight overflow-hidden whitespace-nowrap text-ellipsis">
            {content}
          </div>
        </div>
        <div>
          <div className=" text-neutral-50 dark:text-neutral-100 text-xs font-normal leading-tight">
            {`like ${favoriteCount} • comment ${commentCount} • view ${viewCount}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopItems;

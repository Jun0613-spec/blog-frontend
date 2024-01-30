import { useNavigate } from "react-router-dom";

import defaultProfile from "../assets/default-profile.png";

import PostListItem from "../types/interface/post-list-item.interface";
import Avatar from "./Avatar";
import { POST_DETAIL_PATH, POST_PATH } from "../constant";

interface Props {
  postListItem: PostListItem;
}

const PostItem = ({ postListItem }: Props) => {
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
  } = postListItem;

  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(POST_PATH() + "/" + POST_DETAIL_PATH(postId));
  };

  return (
    <div
      className="bg-white dark:bg-neutral-700 flex items-center gap-7 p-6 cursor-pointer hover:opacity-70 rounded-xl"
      onClick={onClickHandler}
    >
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div
          // className="board-list-item-profile-image w-full h-full bg-center bg-cover rounded-full"
          // style={{
          //   backgroundImage: `url(${
          //     postUserProfileImage
          //       ? postUserProfileImage
          //       : defaultProfileImage
          //   })`,
          // }}
          >
            <Avatar
              src={postUserProfileImage ? postUserProfileImage : defaultProfile}
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="text-neutral-700 dark:text-neutral-200 text-xs font-medium leading-tight">
              {postUserName}
            </div>
            <div className=" text-neutral-400 text-xs font-base leading-tight">
              {createdAt}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className=" text-neutral-700 dark:text-neutral-200 text-base font-medium leading-tight">
            {title}
          </div>
          <div className="text-neutral-700 dark:text-neutral-200 text-xs font-normal leading-tight">
            {content}
          </div>
        </div>

        <div>
          <div className="text-neutral-700 dark:text-neutral-200 text-[8px] sm:text-xs font-normal leading-tight">
            {`like ${favoriteCount} • comment ${commentCount} • view ${viewCount}`}
          </div>
        </div>
      </div>
      {postTitleImage && (
        <div className="w-[152px] h-full">
          <img
            src={`${postTitleImage}`}
            alt=""
            className=" w-full h-full bg-center bg-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default PostItem;

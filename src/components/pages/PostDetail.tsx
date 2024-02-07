import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaHeart, FaRegCommentDots, FaRegHeart } from "react-icons/fa";
import {
  MdDelete,
  MdEdit,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { BsSendFill, BsSendSlashFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

import defaultProfile from "../../assets/default-profile.png";

import FavoriteItem from "../FavoriteItem";
import CommentItem from "../CommentItem";
import Avatar from "../Avatar";
import Paigination from "../Pagination";

import FavoriteListItem from "../../types/interface/favorite-list-item.interface";
import CommentListItem from "../../types/interface/comment-list-item.interface";
import Post from "../../types/interface/post.interface";

import { useLoginUserStore } from "../../stores/login-user.store";

import {
  MAIN_PATH,
  POST_PATH,
  POST_UPDATE_PATH,
  USER_PATH,
} from "../../constant";

import GetPostResponse from "../../apis/response/post/get-post.response";
import Response from "../../apis/response/response";
import {
  putFavoriteRequest,
  getCommentListRequest,
  getFavoriteListRequest,
  getPostRequest,
  increaseViewCountRequest,
  postCommentRequest,
  deletePostRequest,
} from "../../apis";
import IncreaseViewCountResponse from "../../apis/response/post/increase-view-count.response";
import GetFavoriteListResponse from "../../apis/response/favorite/get-favorite-list.response";
import GetCommentListResponse from "../../apis/response/comment/get-comment-list.response";
import PutFavoriteResponse from "../../apis/response/favorite/put-favorite.response";
import PostCommentRequest from "../../apis/request/comment/post-comment.request";
import PostCommentResponse from "../../apis/response/comment/post-comment.response";
import DeletePostResponse from "../../apis/response/post/delete-post.response";

import usePagination from "../../hooks/pagination.hook";

const PostDetail = () => {
  const { postId } = useParams();

  const { loginUser } = useLoginUserStore();

  const [cookies] = useCookies();

  const navigate = useNavigate();

  //    Post Detail Top    //
  const PostDetailTop = () => {
    const [isPoster, setIsPoster] = useState<boolean>(false);

    const [post, setPost] = useState<Post | null>(null);

    const [open, setOpen] = useState<boolean>(false);

    //Get Post Response
    const getPostResponse = (
      responseBody: GetPostResponse | Response | null
    ) => {
      if (!responseBody) return;

      const { code } = responseBody;
      if (code === "NEP") toast.error("The post doesn't exist.");
      if (code !== "SU") {
        navigate(MAIN_PATH());
        return;
      }

      const post: Post = { ...(responseBody as GetPostResponse) };
      setPost(post);

      if (!loginUser) {
        setIsPoster(false);
        return;
      }
      const isPoster = loginUser.email === post.postEmail;
      setIsPoster(isPoster);
    };

    //Delete Post Response
    const deletePostResponse = (
      responseBody: DeletePostResponse | Response | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "VF") toast.error("Validation failed.");
      if (code === "NEP") toast.error("Not exist post.");
      if (code === "AF") toast.error("Authorization failed.");
      if (code === "NP") toast.error("No permission.");
      if (code === "DBE") return "DATABASE ERROR.";
      if (code !== "SU") return;
    };

    const onUsernameClickHandler = () => {
      if (!post) return null;
      navigate(USER_PATH(post.postUserName));
    };

    const onMoreOpenHandler = () => {
      setOpen(!open);
    };

    const editButtonHandler = () => {
      if (!post || !loginUser) return null;
      if (loginUser.userName !== post.postUserName) return null;
      navigate(POST_PATH() + "/" + POST_UPDATE_PATH(post.postId));
    };

    const deleteButtonHandler = () => {
      if (!postId || !post || !loginUser || !cookies.accessToken) return null;
      if (loginUser.userName !== post.postUserName) return;
      if (window.confirm("Do you really want to delete?")) {
        deletePostRequest(postId, cookies.accessToken).then(deletePostResponse);

        navigate(MAIN_PATH());
        toast.success("Succefully deleted.");
        window.location.reload();
      } else {
        toast.error("Cancelled");
      }
    };

    useEffect(() => {
      if (!postId) {
        navigate(MAIN_PATH());
        return;
      }

      getPostRequest(postId).then(getPostResponse);
    }, []);

    if (!post) return <></>;

    return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="text-neutral-700 dark:text-neutral-200 text-3xl font-semibold leading-tight">
            {post.title}
          </div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div>
                <Avatar
                  src={
                    post.postUserName
                      ? post.postUserProfileImage
                      : defaultProfile
                  }
                />
              </div>
              <div
                className="text-neutral-600 dark:text-neutral-200 text-base font-semibold leading-tight cursor-pointer"
                onClick={onUsernameClickHandler}
              >
                {post.postUserName}
              </div>

              <div className="text-neutral-400 dark:text-neutral-500 text-base font-normal leading-tight">
                {post.createdAt}
              </div>
            </div>
            {isPoster && (
              <button
                className="rounded-full hover:bg-neutral-200/20 p-2 mr-3"
                onClick={onMoreOpenHandler}
              >
                <HiOutlineDotsVertical />
              </button>
            )}

            {open && (
              <div className="grid grid-cols-1 divide-y dark:divide-neutral-800 absolute bg-neutral-100 dark:bg-neutral-700 shadow-2xl right-10 rounded-lg">
                <button
                  className="w-14 h-10 flex justify-center items-center text-blue-500 dark:text-blue-600 text-sm font-medium leading-tight hover:text-blue-600 dark:hover:text-blue-500"
                  onClick={editButtonHandler}
                >
                  <MdEdit />
                </button>

                <button
                  className="w-14 h-10 flex justify-center items-center text-red-500 dark:text-red-600 text-sm font-medium leading-tight hover:text-red-600 dark:hover:text-red-500"
                  onClick={deleteButtonHandler}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="divider mt-2" />
        <div className="flex flex-col gap-5">
          <div className="text-neutral-700 dark:text-neutral-200 text-lg font-medium leading-tight whitespace-pre-wrap">
            {post.content}
          </div>
          <div className="space-y-4">
            {post.postImageList.map((image, index) => (
              <img key={index} src={image} alt="" className="w-full h-auto" />
            ))}
          </div>
        </div>
      </div>
    );
  };

  //    Post Detail Bottom    //
  const PostDetailBottom = () => {
    const commentRef = useRef<HTMLTextAreaElement | null>(null);

    const {
      currentPage,
      setCurrentPage,
      currentSection,
      setCurrentSection,
      viewList,
      viewPageList,
      totalSection,
      setTotalList,
    } = usePagination<CommentListItem>(3);

    const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const [openFavorite, setOpenFavorite] = useState<boolean>(false);
    const [openComment, setOpenComment] = useState<boolean>(false);

    const [totalComment, setTotalComment] = useState<number>(0);

    const [comment, setComment] = useState<string>("");

    // Get Favorite Response
    const getFavoriteListResponse = (
      responseBody: GetFavoriteListResponse | Response | null
    ) => {
      if (!responseBody) return;

      const { code } = responseBody;
      if (code === "DBE") return "DATABASE ERROR";
      if (code !== "SU") return;

      const { favoriteList } = responseBody as GetFavoriteListResponse;
      setFavoriteList(favoriteList);

      if (!loginUser) {
        setIsFavorite(false);
        return;
      }

      const isFavorite =
        favoriteList.findIndex(
          (favorite) => favorite.email === loginUser.email
        ) !== -1;
      setIsFavorite(isFavorite);
    };

    // Put Favorite Response
    const putFavoriteResponse = (
      responseBody: PutFavoriteResponse | Response | null
    ) => {
      if (!responseBody) return;

      const { code } = responseBody;
      if (code === "VF") toast.error("Validation failed");
      if (code === "AF") toast.error("Authorization failed");
      if (code === "DBE") return "DATABASE ERROR";
      if (code !== "SU") return;

      if (!postId) return;
      getFavoriteListRequest(postId).then(getFavoriteListResponse);
    };

    //Get Comment List Response
    const getCommentListResponse = (
      responseBody: GetCommentListResponse | Response | null
    ) => {
      if (!responseBody) return;

      const { code } = responseBody;
      if (code === "DBE") return "DATABASE ERROR";
      if (code !== "SU") return;

      const { commentList } = responseBody as GetCommentListResponse;

      setTotalList(commentList);
      setTotalComment(commentList.length);
    };

    //Post Comment Response
    const postCommentResponse = (
      responseBody: PostCommentResponse | Response | null
    ) => {
      if (!responseBody) return;

      const { code } = responseBody;
      if (code === "VF") toast.error("Validation failed");
      if (code === "AF") toast.error("Authorization failed");
      if (code === "DBE") return "DATABASE ERROR";
      if (code !== "SU") return;

      if (!postId) return;
      getCommentListRequest(postId).then(getCommentListResponse);
    };

    const favoriteHandler = () => {
      if (!postId || !loginUser || !cookies.accessToken) return;
      putFavoriteRequest(postId, cookies.accessToken).then(putFavoriteResponse);
    };

    const openFavoriteBoxHandler = () => {
      setOpenFavorite(!openFavorite);
    };

    const openCommentBoxHandler = () => {
      setOpenComment(!openComment);
    };

    const postCommentSubmitHandler = () => {
      if (!comment || !postId || !loginUser || !cookies.accessToken) return;

      const requestBody: PostCommentRequest = { content: comment };
      postCommentRequest(postId, requestBody, cookies.accessToken).then(
        postCommentResponse
      );

      toast.success("Success");
    };

    const commentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = event.target;
      setComment(value);

      if (!commentRef.current) return null;
      commentRef.current.style.height = "auto";
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    };

    useEffect(() => {
      if (!postId) return;
      getFavoriteListRequest(postId).then(getFavoriteListResponse);
      getCommentListRequest(postId).then(getCommentListResponse);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postId]);

    return (
      <div className="h-screen flex flex-col gap-5">
        <div className="flex gap-3">
          <div className="flex items-center gap-1.5">
            <button className="hover:opacity-60" onClick={favoriteHandler}>
              {!isFavorite ? (
                <FaRegHeart className="text-neutral-700 dark:text-neutral-200" />
              ) : (
                <FaHeart className="text-red-500 dark:text-red-700" />
              )}
            </button>
            <div className="text-neutral-700 dark:text-neutral-200 text-base font-medium leading-tight">{`Likes ${favoriteList.length}`}</div>
            <button
              className="hover:opacity-60"
              onClick={openFavoriteBoxHandler}
            >
              {openFavorite ? (
                <MdKeyboardArrowUp className=" text-neutral-700 dark:text-neutral-200" />
              ) : (
                <MdKeyboardArrowDown className=" text-neutral-700 dark:text-neutral-200" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="hover:opacity-60">
              <FaRegCommentDots className=" text-neutral-700 dark:text-neutral-200" />
            </button>
            <div className="text-neutral-700 dark:text-neutral-200 text-base font-medium leading-tight">
              {`Comments ${totalComment}`}
            </div>
            <button
              className="hover:opacity-60"
              onClick={openCommentBoxHandler}
            >
              {openComment ? (
                <MdKeyboardArrowUp className=" text-neutral-700 dark:text-neutral-200" />
              ) : (
                <MdKeyboardArrowDown className=" text-neutral-700 dark:text-neutral-200" />
              )}
            </button>
          </div>
        </div>
        {/* Favorite Box && Comment Box */}
        {openFavorite && (
          <div className="border mr-3 md:mr-1.5 lg:mr-0 pt-4 pb-10 px-4  border-solid border-neutral-300 dark:border-neutral-600">
            <div className="flex flex-col gap-4">
              <div className="text-neutral-700 dark:text-neutral-200 text-base font-medium leading-tight">
                {"Likes "}{" "}
                <span className="font-bold">{favoriteList.length}</span>
              </div>
              <div className="flex flex-wrap gap-y-5 gap-x-7">
                {favoriteList.map((item) => (
                  <FavoriteItem favoriteListItem={item} key={item.favoriteId} />
                ))}
              </div>
            </div>
          </div>
        )}
        {openComment && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 px-5 py-0">
              <div className="text-neutral-700 dark:text-neutral-200 text-base font-normal leading-tight">
                {"Comments"} <span className="font-bold">{totalComment}</span>
              </div>
              <div className="flex flex-col gap-7">
                {viewList.map((item) => (
                  <CommentItem key={item.commentId} commentListItem={item} />
                ))}
              </div>
            </div>

            <div className="divider" />
            <div className="flex items-center justify-center">
              <Paigination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                viewPageList={viewPageList}
                totalSection={totalSection}
              />
            </div>

            {/* Comment Text Box */}
            {loginUser !== null && (
              <div className="border mx-3 md:mr-1.5 lg:mr-0 p-4 border-solid border-neutral-300 dark:border-neutral-600">
                <div className="flex flex-col gap-5">
                  <textarea
                    ref={commentRef}
                    className="text-neutral-700 dark:text-neutral-200 resize-none overflow-hidden text-base font-normal leading-tight border-none bg-transparent outline-none"
                    placeholder="Leave your comment..."
                    value={comment}
                    onChange={commentChangeHandler}
                  />
                  <div className="flex justify-end">
                    {comment === "" ? (
                      <button className="cursor-not-allowed rounded-full px-4 py-1.5 bg-neutral-600/60 dark:bg-neutral-950/20 text-neutral-100 ">
                        <BsSendSlashFill />
                      </button>
                    ) : (
                      <button
                        className="rounded-full px-4 py-1.5 bg-neutral-700 dark:bg-neutral-950 text-neutral-100 hover:opacity-80"
                        onClick={postCommentSubmitHandler}
                      >
                        <BsSendFill />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const increaseViewCountRequestResponse = (
    responseBody: IncreaseViewCountResponse | Response | null
  ) => {
    if (!responseBody) return null;

    const { code } = responseBody;
    if (code === "DBE") return "DATABASE ERROR";
  };

  // View counter
  let effectFlag = true;

  useEffect(() => {
    if (!postId) return;

    if (effectFlag) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      effectFlag = false;
      return;
    }

    increaseViewCountRequest(postId).then(increaseViewCountRequestResponse);
  }, [postId]);

  return (
    <div className="bg-white dark:bg-zinc-800 flex justify-center px-0 py-16">
      <div className="w-[90%] flex flex-col gap-5">
        <PostDetailTop />
        <PostDetailBottom />
      </div>
    </div>
  );
};

export default PostDetail;

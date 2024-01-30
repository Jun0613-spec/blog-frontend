import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

import usePostStore from "../stores/post.store";
import { useLoginUserStore } from "../stores/login-user.store";

import {
  AUTH_PATH,
  POST_DETAIL_PATH,
  POST_PATH,
  POST_UPLOAD_PATH,
  USER_PATH,
} from "../constant";

import {
  createPostRequest,
  fileUploadRequest,
  updatePostRequest,
} from "../apis";

import UpdatePostRequest from "../apis/request/post/update-post.request";
import PostRequest from "../apis/request/post/post.request";
import UpdatePostResponse from "../apis/response/post/update-post.response";
import PostResponse from "../apis/response/post/post.response";

const UploadButton = () => {
  const { postId } = useParams();

  const { title, content, postImageFileList, resetPost } = usePostStore();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { loginUser } = useLoginUserStore();

  const [cookies] = useCookies();

  // Create Post Response
  const createPostResponse = (responseBody: PostResponse | null) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "AF") navigate(AUTH_PATH());
    if (code === "VF") toast.error("You must type title and description");
    if (code === "DBE") toast.error("DATABSE ERROR.");
    if (code !== "SU") return;

    resetPost();
    if (!loginUser) return;
    const { userName } = loginUser;
    navigate(USER_PATH(userName));
  };

  // Update Post Response
  const updatePostResponse = (responseBody: UpdatePostResponse | null) => {
    if (!responseBody) return;

    const { code } = responseBody;
    if (code === "AF" || code === "NEU" || code === "NEP" || code === "NP")
      navigate(AUTH_PATH());
    if (code === "VF") toast.error("You must type title and description");
    if (code === "DBE") toast.error("DATABSE ERROR.");
    if (code !== "SU") return;

    if (!postId) return;
    navigate(POST_PATH() + "/" + POST_DETAIL_PATH(postId));
  };

  const onUploadButtonClickHandler = async () => {
    const accessToken = cookies.accessToken;
    if (!accessToken) return;

    const postImageList: string[] = [];

    for (const file of postImageFileList) {
      const data = new FormData();
      data.append("file", file);

      const url = await fileUploadRequest(data);
      if (url) postImageList.push(url);
    }

    const isPosterPage = pathname === POST_PATH() + "/" + POST_UPLOAD_PATH();
    if (isPosterPage) {
      const requestBody: PostRequest = {
        title,
        content,
        postImageList,
      };

      createPostRequest(requestBody, accessToken).then(createPostResponse);
    } else {
      if (!postId) return;

      const requestBody: UpdatePostRequest = {
        title,
        content,
        postImageList,
      };
      updatePostRequest(postId, requestBody, accessToken).then(
        updatePostResponse
      );
    }
  };

  if (title && content) {
    return (
      <div
        className="rounded-full  
          w-14 lg:w-20 
          flex 
          justify-center 
          items-center 
          bg-blue-600 hover:opacity-60
          text-white
          dark:bg-blue-800 dark:hover:opacity-60 
          text-sm 
          font-medium 
          leading-tight 
          cursor-pointer"
        onClick={onUploadButtonClickHandler}
      >
        Upload
      </div>
    );
  }

  return (
    <div
      className="
            rounded-full  
            w-14 lg:w-20 
            flex 
            justify-center 
            items-center 
            text-white
            bg-blue-600/50
            dark:bg-blue-800/50
            text-sm 
            font-medium 
            leading-tight 
            cursor-not-allowed "
    >
      Upload
    </div>
  );
};

export default UploadButton;

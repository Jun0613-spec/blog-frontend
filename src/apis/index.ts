import axios from "axios";
import toast from "react-hot-toast";

import Response from "./response/response";

import RegisterResponse from "./response/auth/register-response";
import RegisterRequest from "./request/auth/register.request";
import LoginRequest from "./request/auth/login.request";
import LoginResponse from "./response/auth/login-response";

import PostRequest from "./request/post/post.request";
import PostResponse from "./response/post/post.response";
import GetPostResponse from "./response/post/get-post.response";

import IncreaseViewCountResponse from "./response/post/increase-view-count.response";

import GetFavoriteListResponse from "./response/favorite/get-favorite-list.response";
import PutFavoriteResponse from "./response/favorite/put-favorite.response";

import PostCommentRequest from "./request/comment/post-comment.request";
import PostCommentResponse from "./response/comment/post-comment.response";
import DeletePostResponse from "./response/post/delete-post.response";
import UpdatePostRequest from "./request/post/update-post.request";
import UpdatePostResponse from "./response/post/update-post.response";
import GetLatestPostList from "./response/post/list/get-latest-post-list.reaponse";
import GetTop3PostListResponse from "./response/post/list/get-top3-post-list.response";
import GetPopularListResponse from "./response/search/get-popular-list.response";
import UpdateCommentRequest from "./request/comment/update-comment.request";
import UpdateCommentResponse from "./response/comment/update-comment.response";
import DeleteCommentResponse from "./response/comment/delete-comment.response";
import GetCommentListResponse from "./response/comment/get-comment-list.response";
import GetSearchPostListResponse from "./response/post/list/get-search-post-list.response";
import GetRelationListResponse from "./response/search/get-relation-list.response";
import GetUserPostListResponse from "./response/post/list/get-user-post-list.response";
import GetLoginUserResponse from "./response/user/login-user.response";
import GetUserResponse from "./response/user/get-user.response";
import UpdateUsernameRequest from "./request/user/update-username.request";
import UpdateUsernameResponse from "./response/user/update-username.response";
import UpdateProfileImageRequest from "./request/user/update-profile-image.request";
import UpdateProfileImageResponse from "./response/user/update-profile-image.response";

//const DOMAIN = "http://localhost:8000";
const DOMAIN = process.env.REACT_APP_API_URL;
const API_DOMAIN = `${DOMAIN}/api/v1`;

// Authentication
const authorization = (accessToken: string) => {
  return { headers: { Authorization: `Bearer ${accessToken}` } };
};

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const loginRequest = async (requestBody: LoginRequest) => {
  const result = await axios
    .post(SIGN_IN_URL(), requestBody)
    .then((response) => {
      toast.success("Login Successful");
      const responseBody: LoginResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      toast.error("Check your email or password");
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const registerRequest = async (requestBody: RegisterRequest) => {
  const result = await axios
    .post(SIGN_UP_URL(), requestBody)
    .then((response) => {
      toast.success(
        "Your account has been successfully created. Please Login."
      );
      const responseBody: RegisterResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response.data) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

// User
const GET_LOGIN_USER_URL = () => `${API_DOMAIN}/user`;
const GET_USER_URL = (userName: string) => `${API_DOMAIN}/user/${userName}`;
const UPDATE_USERNAME_URL = () => `${API_DOMAIN}/user/update/username`;
const UPDATE_PROFILE_IMAGE_URL = () =>
  `${API_DOMAIN}/user/update/profile-image`;

export const getLoginUserRequest = async (accessToken: string) => {
  const result = await axios
    .get(GET_LOGIN_USER_URL(), authorization(accessToken))
    .then((response) => {
      const responseBody: GetLoginUserResponse = response.data;
      return responseBody;
    })

    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const getUserRequest = async (userName: string) => {
  const result = await axios
    .get(GET_USER_URL(userName))
    .then((response) => {
      const responseBody: GetUserResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const updateUsernameRequest = async (
  requestBody: UpdateUsernameRequest,
  accessToken: string
) => {
  const result = await axios
    .patch(UPDATE_USERNAME_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: UpdateUsernameResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.respopnse) return null;
      const responseBody: Response = error.response.data;

      return responseBody;
    });
  return result;
};

export const updateProfileImageRequest = async (
  requestBody: UpdateProfileImageRequest,
  accessToken: string
) => {
  const result = await axios
    .patch(UPDATE_PROFILE_IMAGE_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: UpdateProfileImageResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.respopnse) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });
  return result;
};

// Post
const GET_POST_URL = (postId: number | string) =>
  `${API_DOMAIN}/post/${postId}`;

const CREATE_POST_URL = () => `${API_DOMAIN}/post`;

const UPDATE_POST_URL = (postId: number | string) =>
  `${API_DOMAIN}/post/${postId}`;

const DELETE_POST_URL = (postId: number | string) =>
  `${API_DOMAIN}/post/${postId}`;

const INCREASE_VIEW_COUNT_URL = (postId: number | string) =>
  `${API_DOMAIN}/post/${postId}/views`;

export const getPostRequest = async (postId: number | string) => {
  const result = await axios
    .get(GET_POST_URL(postId))
    .then((response) => {
      const responseBody: GetPostResponse = response.data;
      return responseBody;
    })

    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });
  return result;
};

export const createPostRequest = async (
  requestBody: PostRequest,
  accessToken: string
) => {
  const result = await axios
    .post(CREATE_POST_URL(), requestBody, authorization(accessToken))
    .then((response) => {
      toast.success("Your post has been created");
      const responseBody: PostResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      toast.error("Something went wrong");
      const responseBody: Response = error.response.data;
      return responseBody;
    });
  return result;
};

export const updatePostRequest = async (
  postId: number | string,
  requestBody: UpdatePostRequest,
  accessToken: string
) => {
  const result = await axios
    .patch(UPDATE_POST_URL(postId), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: UpdatePostResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const deletePostRequest = async (
  postId: number | string,
  accessToken: string
) => {
  const result = await axios
    .delete(DELETE_POST_URL(postId), authorization(accessToken))
    .then((response) => {
      const responseBody: DeletePostResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const increaseViewCountRequest = async (postId: number | string) => {
  const result = await axios
    .get(INCREASE_VIEW_COUNT_URL(postId))
    .then((response) => {
      const responseBody: IncreaseViewCountResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

//Image Upload
const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const multipartFormData = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const fileUploadRequest = async (data: FormData) => {
  const result = await axios
    .post(FILE_UPLOAD_URL(), data, multipartFormData)
    .then((response) => {
      const responseBody: string = response.data;
      return responseBody;
    })
    .catch((error) => {
      return null;
    });
  return result;
};

// Favorite
const GET_FAVORITE_LIST_URL = (postId: number | string) =>
  `${API_DOMAIN}/post/${postId}/favoritelist`;

const PUT_FAVORITE_URL = (postId: number | string) =>
  `${API_DOMAIN}/post/${postId}/favorite`;

export const getFavoriteListRequest = async (postId: number | string) => {
  const result = await axios
    .get(GET_FAVORITE_LIST_URL(postId))
    .then((response) => {
      const responseBody: GetFavoriteListResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const putFavoriteRequest = async (
  postId: number | string,
  accessToken: string
) => {
  const result = await axios
    .put(PUT_FAVORITE_URL(postId), {}, authorization(accessToken))
    .then((response) => {
      const responseBody: PutFavoriteResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

// Comment
const GET_COMMENT_LIST_URL = (postId: number | string) =>
  `${API_DOMAIN}/post/${postId}/commentlist`;

const POST_COMMENT_URL = (postId: number | string) =>
  `${API_DOMAIN}/post/${postId}/comment`;

const UPDATE_COMMENT_URL = (
  postId: number | string,
  commentId: number | string
) => `${API_DOMAIN}/post/${postId}/comment/${commentId}`;

const DELETE_COMMENT_URL = (
  postId: number | string,
  commentId: number | string
) => `${API_DOMAIN}/post/${postId}/comment/${commentId}`;

export const getCommentListRequest = async (postId: number | string) => {
  const result = await axios
    .get(GET_COMMENT_LIST_URL(postId))
    .then((response) => {
      const responseBody: GetCommentListResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const postCommentRequest = async (
  postId: number | string,
  requestBody: PostCommentRequest,
  accessToken: string
) => {
  const result = await axios
    .post(POST_COMMENT_URL(postId), requestBody, authorization(accessToken))
    .then((response) => {
      const responseBody: PostCommentResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const updateCommentRequest = async (
  postId: number | string,
  commentId: number | string,
  requestBody: UpdateCommentRequest,
  accessToken: string
) => {
  const result = await axios
    .patch(
      UPDATE_COMMENT_URL(postId, commentId),
      requestBody,
      authorization(accessToken)
    )
    .then((response) => {
      const responseBody: UpdateCommentResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const deleteCommentRequest = async (
  postId: number | string,
  commentId: number | string,
  accessToken: string
) => {
  const result = await axios
    .delete(DELETE_COMMENT_URL(postId, commentId), authorization(accessToken))
    .then((response) => {
      const responseBody: DeleteCommentResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

// List
const GET_LATEST_POST_LIST_URL = () => `${API_DOMAIN}/post/list/latest`;
const GET_TOP3_POST_LIST_URL = () => `${API_DOMAIN}/post/list/top3`;
const GET_SEARCH_POST_LIST_URL = (
  searchWord: string,
  preSearchWord: string | null
) =>
  `${API_DOMAIN}/post/list/search/${searchWord}${
    preSearchWord ? "/" + preSearchWord : ""
  }`;
const GET_USER_POST_LIST_URL = (userName: string) =>
  `${API_DOMAIN}/post/list/user/${userName}`;

export const getLatestPostListRequest = async () => {
  const result = await axios
    .get(GET_LATEST_POST_LIST_URL())
    .then((response) => {
      const responseBody: GetLatestPostList = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const getTop3PostListRequest = async () => {
  const result = await axios
    .get(GET_TOP3_POST_LIST_URL())
    .then((response) => {
      const responseBody: GetTop3PostListResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const getSearchPostListRequest = async (
  searchWord: string,
  preSearchWord: string | null
) => {
  const result = await axios
    .get(GET_SEARCH_POST_LIST_URL(searchWord, preSearchWord))
    .then((response) => {
      const responseBody: GetSearchPostListResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const getUserPostListRequest = async (userName: string) => {
  const result = await axios
    .get(GET_USER_POST_LIST_URL(userName))
    .then((response) => {
      const responseBody: GetUserPostListResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

// Search
const GET_POPULAR_WORD_LIST = () => `${API_DOMAIN}/search/popular`;
const GET_RELATION_WORD_LIST = (searchWord: string) =>
  `${API_DOMAIN}/search/${searchWord}/relation`;

export const getPopularWordListRequest = async () => {
  const result = await axios
    .get(GET_POPULAR_WORD_LIST())
    .then((response) => {
      const responseBody: GetPopularListResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

export const getRelationWordListRequest = async (searchWord: string) => {
  const result = await axios
    .get(GET_RELATION_WORD_LIST(searchWord))
    .then((response) => {
      const responseBody: GetRelationListResponse = response.data;
      return responseBody;
    })
    .catch((error) => {
      if (!error.response) return null;
      const responseBody: Response = error.response.data;
      return responseBody;
    });

  return result;
};

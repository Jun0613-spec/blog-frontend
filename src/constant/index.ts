export const MAIN_PATH = () => "/";
export const AUTH_PATH = () => "/auth";
export const SEARCH_PATH = (searchWord: string) => `/search/${searchWord}`;
export const USER_PATH = (userName: string) => `/user/${userName}`;
export const POST_PATH = () => "/post";
export const POST_DETAIL_PATH = (postId: number | string) => `detail/${postId}`;
export const POST_UPLOAD_PATH = () => `upload`;
export const POST_UPDATE_PATH = (postId: number | string) => `update/${postId}`;
export const POST_LINK_PATH = () => "/post/upload";

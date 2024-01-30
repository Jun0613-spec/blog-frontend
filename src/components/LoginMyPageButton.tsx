import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

import { useLoginUserStore } from "../stores/login-user.store";

import { AUTH_PATH, MAIN_PATH, POST_LINK_PATH, USER_PATH } from "../constant";

const LoginMyPageButton = () => {
  const { userName } = useParams();

  const { loginUser, resetLoginUser } = useLoginUserStore();

  const setCookies = useCookies()[1];

  const navigate = useNavigate();

  const [isLogin, setLogin] = useState<boolean>();

  const onMyPageButtonClickHandler = () => {
    if (!loginUser?.userName) return null;

    navigate(USER_PATH(loginUser.userName));
  };

  const onLogoutButtonClickHandler = () => {
    resetLoginUser();
    setCookies("accessToken", "", { path: MAIN_PATH(), expires: new Date() });
    toast.success("See you soon!");
    navigate(AUTH_PATH());
  };

  const onLoginButtonClickHandler = () => {
    navigate(AUTH_PATH());
  };

  const onPostButtonClickHandler = () => {
    navigate(POST_LINK_PATH());
  };

  useEffect(() => {
    setLogin(loginUser !== null);
  }, [loginUser]);

  if (isLogin && userName === loginUser?.userName) {
    return (
      <div className="flex justify-between gap-2">
        <button
          className="
          rounded-full  
          w-14 lg:w-20 
          flex 
          justify-center 
          items-center 
          dark:bg-blue-800
          dark:hover:opacity-60
        text-white 
        bg-blue-600
          text-sm 
          font-medium 
          leading-tight 
          cursor-pointer"
          onClick={onPostButtonClickHandler}
        >
          Post
        </button>
        <button
          className="
          rounded-full  
          w-14 lg:w-20 
          flex 
          justify-center 
          items-center 
          bg-red-600 hover:opacity-60 dark:bg-red-800  dark:hover:opacity-60
          text-white
          dark:text-white
          text-sm 
          font-medium 
          leading-tight 
          cursor-pointer"
          onClick={onLogoutButtonClickHandler}
        >
          Logout
        </button>
      </div>
    );
  }

  if (isLogin) {
    return (
      <div
        className="
          rounded-full 
          w-16 lg:w-20 
          flex 
          justify-center 
          items-center 
          dark:border-transparent
          dark:bg-blue-800
          dark:hover:opacity-60
        text-white 
        bg-blue-600
          hover:opacity-60
          text-xs lg:text-sm 
          font-medium 
          leading-tight 
          cursor-pointer"
        onClick={onMyPageButtonClickHandler}
      >
        MyPage
      </div>
    );
  }

  return (
    <div
      className="
        rounded-2xl
        w-14 lg:w-20 
        flex 
        justify-center 
        items-center 
        bg-neutral-700 hover:bg-neutral-700/70 
        text-white 
        dark:bg-black
        dark:text-neutral-100
        dark:hover:opacity-70
        text-sm 
        font-medium 
        leading-tight 
        cursor-pointer"
      onClick={onLoginButtonClickHandler}
    >
      Login
    </div>
  );
};

export default LoginMyPageButton;

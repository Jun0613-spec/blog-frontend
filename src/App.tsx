import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

import Container from "./components/layout/Container";
import Home from "./components/pages/Home";
import Authentication from "./components/pages/Authentication";
import Search from "./components/pages/Search";
import UserPage from "./components/pages/UserPage";
import PostWrite from "./components/pages/UploadPost";
import PostDetail from "./components/pages/PostDetail";
import UpdatePost from "./components/pages/UpdatePost";
import ErrorPage from "./components/pages/ErrorPage";

import {
  AUTH_PATH,
  POST_DETAIL_PATH,
  POST_PATH,
  POST_UPDATE_PATH,
  POST_UPLOAD_PATH,
  SEARCH_PATH,
  USER_PATH,
} from "./constant";

import User from "./types/interface/user.interface";

import { useLoginUserStore } from "./stores/login-user.store";

import Response from "./apis/response/response";
import GetLoginUserResponse from "./apis/response/user/login-user.response";
import { getLoginUserRequest } from "./apis";

function App() {
  // Login user status
  const { setLoginUser, resetLoginUser } = useLoginUserStore();

  // Cookie status
  const [cookies] = useCookies();

  // Access Token effect
  useEffect(() => {
    const getLoginUserResponse = (
      responseBody: GetLoginUserResponse | Response | null
    ) => {
      if (!responseBody) return null;

      const { code } = responseBody;
      if (code === "AF" || code === "DBE") {
        resetLoginUser();
        return;
      }

      const loginUser: User = { ...(responseBody as GetLoginUserResponse) };
      setLoginUser(loginUser);
    };

    if (!cookies.accessToken) {
      resetLoginUser();
      return;
    }
    getLoginUserRequest(cookies.accessToken).then(getLoginUserResponse);
  }, [cookies.accessToken, resetLoginUser, setLoginUser]);

  return (
    <>
      <div className="bg-white dark:bg-neutral-600 h-screen">
        <Routes>
          <Route element={<Container />}>
            <Route path="/" element={<Home />} />
            <Route path={AUTH_PATH()} element={<Authentication />} />
            <Route path={SEARCH_PATH(":searchWord")} element={<Search />} />
            <Route path={USER_PATH(":userName")} element={<UserPage />} />
            <Route path={POST_PATH()}>
              <Route path={POST_UPLOAD_PATH()} element={<PostWrite />} />
              <Route
                path={POST_DETAIL_PATH(":postId")}
                element={<PostDetail />}
              />
              <Route
                path={POST_UPDATE_PATH(":postId")}
                element={<UpdatePost />}
              />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

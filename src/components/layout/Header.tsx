import React, { useEffect, useState } from "react";
import { GiFeather } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";

import {
  AUTH_PATH,
  MAIN_PATH,
  POST_DETAIL_PATH,
  POST_PATH,
  POST_UPDATE_PATH,
  POST_UPLOAD_PATH,
  SEARCH_PATH,
  USER_PATH,
} from "../../constant";

import ThemeToggle from "../ThemeToggle";
import UploadButton from "../UploadButton";
import LoginMyPageButton from "../LoginMyPageButton";
import SearchButton from "../SearchButton";

const Header = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [isAuthPage, setIsAuthPage] = useState<boolean>(false);
  const [isMainPage, setIsMainPage] = useState<boolean>(false);
  const [isSearchPage, setIsSearchPage] = useState<boolean>(false);
  const [isPostDetailPage, setIsPostDetailPage] = useState<boolean>(false);
  const [isPostWritePage, setIsPostWritePage] = useState<boolean>(false);
  const [isPostUpdatePage, setIsPostUpdatePage] = useState<boolean>(false);
  const [isUserPage, setIsUserPage] = useState<boolean>(false);

  useEffect(() => {
    const isAuthPage = pathname.startsWith(AUTH_PATH());
    setIsAuthPage(isAuthPage);

    const isMainPage = pathname === MAIN_PATH();
    setIsMainPage(isMainPage);

    const isSearchPage = pathname.startsWith(SEARCH_PATH(""));
    setIsSearchPage(isSearchPage);

    const isPostDetailPage = pathname.startsWith(
      POST_PATH() + "/" + POST_DETAIL_PATH("")
    );
    setIsPostDetailPage(isPostDetailPage);

    const isPostWritePage = pathname.startsWith(
      POST_PATH() + "/" + POST_UPLOAD_PATH()
    );
    setIsPostWritePage(isPostWritePage);

    const isPostUpdatePage = pathname.startsWith(
      POST_PATH() + "/" + POST_UPDATE_PATH("")
    );
    setIsPostUpdatePage(isPostUpdatePage);

    const isUserPage = pathname.startsWith(USER_PATH(""));
    setIsUserPage(isUserPage);
  }, [pathname]);

  return (
    <div className="px-0 py-5 bg-neutral-100 dark:bg-neutral-800">
      <div className=" w-screen xl:px-20 lg:px-16  md:px-12 sm:px-8 px-4 flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <div className="text-black dark:text-white">
            <GiFeather size={24} />
          </div>
          <div className=" text-black dark:text-white text-xl font-normal leading-tight tracking-[-0.4px]">
            Blogfy
          </div>
        </div>{" "}
        <div className="flex justify-between gap-2">
          {(isAuthPage || isMainPage || isSearchPage || isPostDetailPage) && (
            <SearchButton />
          )}
          {(isMainPage || isSearchPage || isPostDetailPage || isUserPage) && (
            <LoginMyPageButton />
          )}
          {(isPostWritePage || isPostUpdatePage) && <UploadButton />}
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;

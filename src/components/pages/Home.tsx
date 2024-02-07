import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TopItems from "../TopItems";
import PostItem from "../PostListItem";
import Pagination from "../Pagination";

import { SEARCH_PATH } from "../../constant";

import PostListItem from "../../types/interface/post-list-item.interface";

import usePagination from "../../hooks/pagination.hook";

import {
  getLatestPostListRequest,
  getPopularWordListRequest,
  getTop3PostListRequest,
} from "../../apis";
import GetTop3PostListResponse from "../../apis/response/post/list/get-top3-post-list.response";
import Response from "../../apis/response/response";

import GetLatestPostListResponse from "../../apis/response/post/list/get-latest-post-list.reaponse";
import GetPopularListResponse from "../../apis/response/search/get-popular-list.response";

const Home = () => {
  const navigate = useNavigate();

  // Get Top3 Post List Response
  // const getTop3PostListResponse = (
  //   responseBody: GetTop3PostListResponse | Response | null
  // ) => {
  //   if (!responseBody) return;
  //   const { code } = responseBody;
  //   if (code === "DBE") return "DATABASE ERROR";
  //   if (code !== "SU") return;

  //   const { top3List } = responseBody as GetTop3PostListResponse;
  //   setTop3PostList(top3List);
  // };

  // Top 3 Posts
  const [top3PostList, setTop3PostList] = useState<PostListItem[]>([]);

  // useEffect(() => {
  //   const getTop3PostListResponse = (
  //     responseBody: GetTop3PostListResponse | Response | null
  //   ) => {
  //     if (!responseBody) return;
  //     const { code } = responseBody;
  //     if (code === "DBE") return "DATABASE ERROR";
  //     if (code !== "SU") return;

  //     const { top3List } = responseBody as GetTop3PostListResponse;
  //     setTop3PostList(top3List);
  //   };

  //   getTop3PostListRequest().then(getTop3PostListResponse);
  // }, []);

  // Latest Posts with Pagination
  const {
    currentPage,
    currentSection,
    viewList,
    viewPageList,
    totalSection,
    setCurrentPage,
    setCurrentSection,
    setTotalList,
  } = usePagination<PostListItem>(5);

  // Get Latest Post List Response
  // const getLatestPostListResponse = (
  //   responseBody: GetLatestPostListResponse | Response | null
  // ) => {
  //   if (!responseBody) return;
  //   const { code } = responseBody;
  //   if (code === "DBE") return "DATABASE ERROR";
  //   if (code !== "SU") return;

  //   const { latestList } = responseBody as GetLatestPostListResponse;

  //   setTotalList(latestList);
  // };

  // Get Popular Word List Response
  // const getPopularWordListResponse = (
  //   responseBody: GetPopularListResponse | Response | null
  // ) => {
  //   if (!responseBody) return;
  //   const { code } = responseBody;
  //   if (code === "DBE") return "DATABASE ERROR";
  //   if (code !== "SU") return;

  //   const { popularWordList } = responseBody as GetPopularListResponse;
  //   setPopularWordList(popularWordList);
  // };

  // Trending search
  const [popularWordList, setPopularWordList] = useState<string[]>([]);

  const onPopularWordClickHandler = (word: string) => {
    navigate(SEARCH_PATH(word));
  };

  useEffect(() => {
    const getTop3PostListResponse = (
      responseBody: GetTop3PostListResponse | Response | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") return "DATABASE ERROR";
      if (code !== "SU") return;

      const { top3List } = responseBody as GetTop3PostListResponse;
      setTop3PostList(top3List);
    };

    const getLatestPostListResponse = (
      responseBody: GetLatestPostListResponse | Response | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") return "DATABASE ERROR";
      if (code !== "SU") return;

      const { latestList } = responseBody as GetLatestPostListResponse;

      setTotalList(latestList);
    };

    const getPopularWordListResponse = (
      responseBody: GetPopularListResponse | Response | null
    ) => {
      if (!responseBody) return;
      const { code } = responseBody;
      if (code === "DBE") return "DATABASE ERROR";
      if (code !== "SU") return;

      const { popularWordList } = responseBody as GetPopularListResponse;
      setPopularWordList(popularWordList);
    };

    getTop3PostListRequest().then(getTop3PostListResponse);
    getLatestPostListRequest().then(getLatestPostListResponse);
    getPopularWordListRequest().then(getPopularWordListResponse);
  }, [setTotalList]);

  return (
    <div className="bg-white dark:bg-zinc-800">
      <div className="flex justify-center pt-10 pb-6 px-4 md:px-8">
        <div className="main-top-container w-[1200px] flex flex-col items-center gap-8">
          <p className=" text-black dark:text-neutral-100 text-center text-2xl md:text-3xl lg:text-4xl font-bold leading-tight whitespace-pre-wrap">
            Welcome to Blogfy!
            <br />{" "}
            <span className="text-sm md:text-lg lg:text-xl">
              Publish your passions, your way Create a unique and beautiful blog
              easily.
            </span>
          </p>
          <div className="hidden md:flex md:flex-col md:items-center gap-4">
            <p className=" text-neutral-700 dark:text-neutral-200 text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
              Top 3 Posts
            </p>
            <div className="flex gap-6 flex-row justify-between">
              {top3PostList.map((top3PostListItem) => (
                <TopItems top3ListItem={top3PostListItem} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center bg-neutral-50 dark:bg-neutral-800 py-6 px-4 md:px-8">
        <div className="w-full lg:min-w-[1200px] flex flex-col gap-6">
          <p className="text-neutral-700 dark:text-neutral-200 text-xl md:text-2xl lg:text-3xl font-medium leading-tight">
            Latest Post
          </p>
          <div className="col-1/2 grid md:grid-cols-[8fr_4fr] gap-6">
            <div className="flex flex-col gap-4">
              {viewList.map((latestPostListItem) => (
                <PostItem
                  key={latestPostListItem.postId}
                  postListItem={latestPostListItem}
                />
              ))}
            </div>
            <div className="col-2/3">
              <div className="hidden md:flex md:flex-col gap-6 bg-white dark:bg-neutral-700 p-6 rounded-xl">
                <p className=" text-neutral-700 dark:text-neutral-200 text-xl md:text-2xl font-medium leading-tight">
                  Trending
                </p>
                <div className="flex flex-wrap gap-3">
                  {popularWordList.map((word) => (
                    <button
                      className="border text-neutral-700 dark:text-neutral-200 text-sm md:text-base font-medium leading-tight px-4 py-1.5 rounded-xl border-solid border-neutral-300 dark:border-neutral-500 hover:opacity-60 cursor-pointer"
                      onClick={() => onPopularWordClickHandler(word)}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-6 gap-2 dark:bg-neutral-800">
        {viewList.length > 0 && (
          <Pagination
            currentPage={currentPage}
            currentSection={currentSection}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
            viewPageList={viewPageList}
            totalSection={totalSection}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PostListItem from "../../types/interface/post-list-item.interface";

import { SEARCH_PATH } from "../../constant";

import PostItem from "../PostListItem";
import Pagination from "../Pagination";

import {
  getRelationWordListRequest,
  getSearchPostListRequest,
} from "../../apis";
import GetSearchPostListResponse from "../../apis/response/post/list/get-search-post-list.response";
import Response from "../../apis/response/response";
import toast from "react-hot-toast";
import usePagination from "../../hooks/pagination.hook";
import GetRelationWordListResponse from "../../apis/response/search/get-relation-list.response";

const Search = () => {
  const { searchWord } = useParams();

  const navigate = useNavigate();

  const [preSearchWord, setPreSearchWord] = useState<string | null>(null);

  const [count, setCount] = useState<number>(0);

  const [relativeWordList, setRelativeWordList] = useState<string[]>([]);

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

  const onRelationWordClickHandler = (word: string) => {
    navigate(SEARCH_PATH(word));
  };

  //Get Search Post LIst Response
  const getSearchPostLIstResponse = (
    responseBody: GetSearchPostListResponse | Response | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "DBE") toast.error("DATABASE ERROR");
    if (code !== "SU") return;

    if (!searchWord) return;
    const { searchList } = responseBody as GetSearchPostListResponse;
    setTotalList(searchList);
    setCount(searchList.length);
    setPreSearchWord(searchWord);
  };

  //Get Relation Word List Response
  const getRelationWordListResponse = (
    responseBody: GetRelationWordListResponse | Response | null
  ) => {
    if (!responseBody) return;
    const { code } = responseBody;
    if (code === "DBE") toast.error("DATABASE ERROR");
    if (code !== "SU") return;

    const { relativeWordList } = responseBody as GetRelationWordListResponse;
    setRelativeWordList(relativeWordList);
  };

  //When the word changes
  useEffect(() => {
    if (!searchWord) return;
    getSearchPostListRequest(searchWord, preSearchWord).then(
      getSearchPostLIstResponse
    );

    getRelationWordListRequest(searchWord).then(getRelationWordListResponse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWord]);

  const resultText = count === 0 || count === 1 ? "result" : "results";

  return (
    <div className="min-h-screen flex justify-center bg-neutral-50 dark:bg-neutral-800 px-4 md:px-0 py-6 md:py-10">
      <div className="w-full md:w-[1200px] flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2 ">
          <p className=" text-neutral-700 dark:text-neutral-200 text-xl md:text-2xl lg:text-3xl font-normal leading-tight">
            {count >= 0 && (
              <p>
                {count} {resultText} for {searchWord}
              </p>
            )}
          </p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-[8fr_4fr] gap-6">
          {count === 0 ? (
            <p className="h-80 flex justify-center items-center text-neutral-400 dark:text-neutral-500 text-2xl font-medium leading-tight mt-10">
              No results found
            </p>
          ) : (
            <div className="col-1/2 flex flex-col gap-4">
              {viewList.map((postListItem) => (
                <PostItem
                  key={postListItem.postId}
                  postListItem={postListItem}
                />
              ))}
            </div>
          )}
          <div className="col-2/3">
            <div className="hidden md:flex md:flex-col gap-6 bg-white dark:bg-neutral-700 p-6 rounded-xl">
              <div className="flex flex-col gap-6">
                <p className="text-neutral-700 dark:text-neutral-200 text-xl md:text-2xl font-medium leading-tight">
                  Related
                </p>

                {relativeWordList.length === 0 ? (
                  <div className="h-80 flex justify-center items-center text-neutral-400 dark:text-neutral-500 text-2xl font-medium leading-tight">
                    No results found
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {relativeWordList.map((word) => (
                      <button
                        className="border text-neutral-700 dark:text-neutral-200 text-sm md:text-base font-medium leading-tight px-4 py-1.5 rounded-xl border-solid border-neutral-300 dark:border-neutral-500 hover:opacity-60 cursor-pointer"
                        onClick={() => onRelationWordClickHandler(word)}
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {count !== 0 && (
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
    </div>
  );
};

export default Search;

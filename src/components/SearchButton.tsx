import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import { SEARCH_PATH } from "../constant";

const SearchButton = () => {
  const searchButtonRef = useRef<HTMLDivElement | null>(null);

  const [status, setStauts] = useState(false);

  const [word, setWord] = useState("");

  const { searchWord } = useParams();

  const navigate = useNavigate();

  const onSearchButtonClickHandler = () => {
    if (!status) {
      setStauts(!status);
      return;
    }
    navigate(SEARCH_PATH(word));
  };

  const onSearchWordKeyDownHandler = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") return;
    if (!searchButtonRef.current) return;
    searchButtonRef.current?.click();
  };

  useEffect(() => {
    if (searchWord) {
      setWord(searchWord);
      setStauts(true);
    }
  }, [searchWord]);

  return (
    <div className="relative">
      {!status ? (
        <div
          className="mt-1 cursor-pointer hover:opacity-60 text-black dark:text-white"
          onClick={onSearchButtonClickHandler}
        >
          <AiOutlineSearch size={24} />
        </div>
      ) : (
        <div
          className="border-[1px] border-solid border-black/30 dark:border-white/30 rounded-full 
           pl-3 pr-2.5 py-1.5 w-36 md:w-full flex items-center relative"
        >
          <input
            className="flex-1 border-none bg-none outline-none text-black/90 dark:text-white bg-transparent dark:bg-transparent text-sm font-normal leading-tight pr-12"
            type="text"
            placeholder="Search..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={onSearchWordKeyDownHandler}
          />
          <div
            className="cursor-pointer text-black dark:text-neutral-100 hover:opacity-60 absolute inset-y-0 right-0 flex items-center pr-2"
            onClick={onSearchButtonClickHandler}
            ref={searchButtonRef}
          >
            <AiOutlineSearch size={24} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchButton;

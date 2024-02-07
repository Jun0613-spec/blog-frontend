// import { useEffect, useState } from "react";

// const usePagination = <T>(countPerPage: number) => {
//   const [totalList, setTotalList] = useState<T[]>([]);
//   const [viewList, setViewList] = useState<T[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPageList, setTotalPageList] = useState<number[]>([1]);
//   const [viewPageList, setViewPageList] = useState<number[]>([1]);
//   const [currentSection, setCurrentSection] = useState<number>(1);
//   const [totalSection, setTotalSection] = useState<number>(1);

//   const setView = () => {
//     const firstIndex = countPerPage * (currentPage - 1);
//     const lastIndex = Math.min(countPerPage * currentPage, totalList.length);

//     const viewList = totalList.slice(firstIndex, lastIndex);
//     setViewList(viewList);
//   };

//   const setViewPage = () => {
//     const firstIndex = 5 * (currentSection - 1);
//     const lastIndex = Math.min(5 * currentSection, totalPageList.length);

//     const viewPageList = totalPageList.slice(firstIndex, lastIndex);

//     setViewPageList(viewPageList);
//   };

//   // When total list changes
//   useEffect(() => {
//     const totalPage = Math.ceil(totalList.length / countPerPage);

//     const totalPageList: number[] = [];
//     for (let page = 1; page <= totalPage; page++) totalPageList.push(page);
//     setTotalPageList(totalPageList);

//     const totalSection = Math.ceil(totalPageList.length / 5);
//     setTotalSection(totalSection);

//     setCurrentPage(1);
//     setCurrentSection(1);

//     setView();
//     setViewPage();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [totalList, countPerPage]);

//   // When current Page changes
//   useEffect(() => {
//     setView();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentPage, totalList]);

//   // When current Section changes
//   useEffect(() => {
//     setViewPage();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentSection]);

//   return {
//     currentPage,
//     setCurrentPage,
//     currentSection,
//     setCurrentSection,
//     viewList,
//     viewPageList,
//     totalSection,
//     setTotalList,
//   };
// };

// export default usePagination;

import { useState, useEffect } from "react";

const usePagination = <T>(countPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [viewList, setViewList] = useState<T[]>([]);
  const [viewPageList, setViewPageList] = useState<number[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalSection, setTotalSection] = useState<number>(0);
  const [totalList, setTotalList] = useState<T[]>([]);

  const setViewPost = () => {
    const FIRST_INDEX = countPerPage * (currentPage - 1);
    const LAST_INDEX = countPerPage * currentPage;
    const tmpList = totalList.slice(FIRST_INDEX, LAST_INDEX);
    setViewList(tmpList);
  };

  const setViewPage = () => {
    const FIRST_PAGE_INDEX = 10 * (currentSection - 1) + 1;
    const LAST_PAGE_INDEX = 10 * currentSection;

    const tmpPageNumberList = [];
    for (
      let pageNumber = FIRST_PAGE_INDEX;
      pageNumber <= LAST_PAGE_INDEX;
      pageNumber++
    ) {
      if (pageNumber > totalPage) break;
      tmpPageNumberList.push(pageNumber);
    }
    setViewPageList(tmpPageNumberList);
  };

  useEffect(() => {
    const totalPage = Math.floor((totalList.length - 1) / countPerPage) + 1;
    const totalSection =
      Math.floor((totalList.length - 1) / (countPerPage * 10)) + 1;

    setCurrentPage(1);
    setCurrentSection(1);

    setTotalPage(totalPage);
    setTotalSection(totalSection);

    setViewPost();
    setViewPage();
  }, [totalList]);

  useEffect(() => {
    setViewPost();
  }, [currentPage]);

  useEffect(() => {
    setViewPage();
  }, [currentSection]);

  return {
    currentPage,
    setCurrentPage,
    currentSection,
    setCurrentSection,
    viewList,
    viewPageList,
    totalSection,
    setTotalList,
  };
};

export default usePagination;

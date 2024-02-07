import { useState, useEffect } from "react";

const usePagination = <T>(countPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [viewList, setViewList] = useState<T[]>([]);
  const [viewPageList, setViewPageList] = useState<number[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalSection, setTotalSection] = useState<number>(0);
  const [totalList, setTotalList] = useState<T[]>([]);

  const setViewListItems = () => {
    const firstIndex = countPerPage * (currentPage - 1);
    const lastIndex = countPerPage * currentPage;
    const tmpList = totalList.slice(firstIndex, lastIndex);

    setViewList(tmpList);
  };

  const setViewPageNumbers = (totalPage: number) => {
    const firstPageIndex = 10 * (currentSection - 1) + 1;
    const lastPageIndex = 10 * currentSection;

    const tmpPageNumberList = [];

    for (
      let pageNumber = firstPageIndex;
      pageNumber <= lastPageIndex;
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

    setViewListItems();
    setViewPageNumbers(totalPage);
  }, [totalList]);

  useEffect(() => {
    setViewListItems();
  }, [currentPage]);

  useEffect(() => {
    setViewPageNumbers(totalPage);
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

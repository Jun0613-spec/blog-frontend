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
//   }, [currentPage]);

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

import { useEffect, useState } from "react";

interface PaginationState<T> {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentSection: number;
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
  viewList: T[];
  viewPageList: number[];
  totalSection: number;
  setTotalList: React.Dispatch<React.SetStateAction<T[]>>;
}

const usePagination = <T>(countPerPage: number): PaginationState<T> => {
  const [totalList, setTotalList] = useState<T[]>([]);
  const [viewList, setViewList] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPageList, setTotalPageList] = useState<number[]>([1]);
  const [viewPageList, setViewPageList] = useState<number[]>([1]);
  const [currentSection, setCurrentSection] = useState<number>(1);
  const [totalSection, setTotalSection] = useState<number>(1);

  const calculateViewList = () => {
    const firstIndex = countPerPage * (currentPage - 1);
    const lastIndex = Math.min(countPerPage * currentPage, totalList.length);
    const newViewList = totalList.slice(firstIndex, lastIndex);
    setViewList(newViewList);
  };

  const calculateViewPageList = () => {
    const firstIndex = 5 * (currentSection - 1);
    const lastIndex = Math.min(5 * currentSection, totalPageList.length);
    const newViewPageList = totalPageList.slice(firstIndex, lastIndex);
    setViewPageList(newViewPageList);
  };

  useEffect(() => {
    const totalPage = Math.ceil(totalList.length / countPerPage);
    const newTotalPageList = Array.from({ length: totalPage }, (_, i) => i + 1);
    setTotalPageList(newTotalPageList);

    const newTotalSection = Math.ceil(newTotalPageList.length / 5);
    setTotalSection(newTotalSection);

    setCurrentPage(1);
    setCurrentSection(1);

    calculateViewList();
    calculateViewPageList();
  }, [totalList, countPerPage]);

  useEffect(() => {
    calculateViewList();
  }, [currentPage]);

  useEffect(() => {
    calculateViewPageList();
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

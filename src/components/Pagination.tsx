import { Dispatch, SetStateAction } from "react";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  currentSection: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setCurrentSection: Dispatch<SetStateAction<number>>;
  viewPageList: number[];
  totalSection: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  currentSection,
  setCurrentPage,
  setCurrentSection,
  viewPageList,
  totalSection,
}) => {
  const onPageClickHandler = (page: number) => {
    setCurrentPage(page);
  };

  const onPreviousHandler = () => {
    // If already on the first page and first section, do nothing and return
    if (currentPage === 1 && currentSection === 1) return;

    const firstPageInSection = (currentSection - 1) * 5 + 1;

    if (currentPage === firstPageInSection && currentSection > 1) {
      // If on the first page of the current section and there is a previous section
      setCurrentPage(firstPageInSection - 1);
      setCurrentSection((prevSection) => prevSection - 1);
    } else {
      // Otherwise, go to the previous page
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const onNextHandler = () => {
    const lastPageInSection = currentSection * 5;

    if (
      currentPage === lastPageInSection &&
      currentSection < totalSection &&
      currentPage < totalSection * 5
    ) {
      // If on the last page of the current section and there is a next section
      setCurrentPage(lastPageInSection + 1);
      setCurrentSection(currentSection + 1);
    } else if (currentPage < viewPageList[viewPageList.length - 1]) {
      // Otherwise, if there are more pages in the current section, go to the next page
      setCurrentPage(currentPage + 1);
    } else if (currentSection < totalSection) {
      // If at the end of the current section, move to the first page of the next section
      setCurrentPage(currentSection * 10 + 1);
      setCurrentSection(currentSection + 1);
    }
  };

  return (
    <div className="flex gap-5">
      <div className="flex items-center gap-1 cursor-pointer">
        <button onClick={onPreviousHandler}>
          <MdKeyboardDoubleArrowLeft className="text-neutral-400 dark:text-neutral-500" />
        </button>
      </div>

      {(viewPageList.length > 0 ? viewPageList : [1]).map((page) => (
        <div
          key={page}
          className={`${
            page === currentPage
              ? "text-black dark:text-neutral-50"
              : "text-neutral-400 dark:text-neutral-500"
          } text-sm font-semibold leading-tight cursor-pointer`}
          onClick={() => onPageClickHandler(page)}
        >
          {page}
        </div>
      ))}

      <div className="flex items-center gap-1 cursor-pointer">
        <button onClick={onNextHandler}>
          <MdKeyboardDoubleArrowRight className="text-neutral-400 dark:text-neutral-500" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

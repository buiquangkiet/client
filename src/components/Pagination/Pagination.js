import React from "react";
import { memo } from "react";

const Pagination = ({ totalCount, currentPage, onPageChange }) => {
    const itemsPerPage = 10; // Number of items to display per page
    const totalPages = Math.ceil(totalCount / itemsPerPage); // Calculate the total number of pages

    const handlePageChange = (pageNumber) => {
        onPageChange(pageNumber); // Pass the new page number to the parent component
    };

    const formatPaginate = () => {
        let newArray = [];
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                newArray.push(i);
            }
        } else {
            if (currentPage <= 2) {
                newArray = [1, 2, 3, "...", totalPages];
            } else if (currentPage >= totalPages - 1) {
                newArray = [
                    1,
                    "...",
                    totalPages - 2,
                    totalPages - 1,
                    totalPages,
                ];
            } else {
                newArray = [
                    1,
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                    totalPages,
                ];
            }
        }
        return newArray;
    };

    return (
        <div>
            <div className="flex justify-center mt-4 text-[14px]">
                {/* Page Numbers */}
                <div className="flex items-center  py-2 ">
                    {formatPaginate().map((pageNumber, index) => (
                        <button
                            key={index}
                            className={`mx-1 px-3 py-1 rounded-full ${
                                currentPage === pageNumber
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-blue-500"
                            }`}
                            onClick={() =>
                                pageNumber !== "..." &&
                                handlePageChange(pageNumber)
                            }
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(Pagination);

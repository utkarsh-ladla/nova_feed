import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Hidden if only one page exists (commented out for debugging)
    // if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex items-center justify-center gap-2 py-10 mt-6 border-t border-slate-800/50">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-800 bg-[#091225]/50 text-gray-400 hover:border-blue-600 hover:text-white disabled:opacity-30 disabled:hover:border-slate-800 disabled:hover:text-gray-400 transition-all text-sm font-medium"
            >
                <FiChevronLeft className="text-lg" />
                <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-1.5 mx-2">
                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className={`w-9 h-9 rounded-lg border transition-all text-sm font-medium ${
                                currentPage === 1
                                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "border-slate-800 bg-[#091225]/50 text-gray-400 hover:border-blue-600 hover:text-white"
                            }`}
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="text-gray-600 px-1">...</span>}
                    </>
                )}

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`w-9 h-9 rounded-lg border transition-all text-sm font-medium ${
                            currentPage === page
                                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                                : "border-slate-800 bg-[#091225]/50 text-gray-400 hover:border-blue-600 hover:text-white"
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="text-gray-600 px-1">...</span>}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className={`w-9 h-9 rounded-lg border transition-all text-sm font-medium ${
                                currentPage === totalPages
                                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "border-slate-800 bg-[#091225]/50 text-gray-400 hover:border-blue-600 hover:text-white"
                            }`}
                        >
                            {totalPages}
                        </button>
                    </>
                )}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-800 bg-[#091225]/50 text-gray-400 hover:border-blue-600 hover:text-white disabled:opacity-30 disabled:hover:border-slate-800 disabled:hover:text-gray-400 transition-all text-sm font-medium"
            >
                <span className="hidden sm:inline">Next</span>
                <FiChevronRight className="text-lg" />
            </button>
        </div>
    );
};

export default Pagination;

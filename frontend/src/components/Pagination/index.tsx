import React, { FC, useEffect, useState } from "react";
import { PaginationWrapper, PageButton } from "./styled.module"; // Assumindo que você já tem um styled component

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const [visiblePages, setVisiblePages] = useState<number | string[]>([]);

    useEffect(() => {
        setVisiblePages(getVisiblePages(currentPage, totalPages));
    }, [currentPage, totalPages]);

    const getVisiblePages = (current: number, total: number): (number | string)[] => {
        const range: (number | string)[] = [];
        const maxVisible = 5;

        if (total <= maxVisible) {
            for (let i = 1; i <= total; i++) {
                range.push(i);
            }
            return range;
        }

        const start = Math.max(1, current - 2);
        const end = Math.min(total, current + 2);

        if (start > 2) {
            range.push(1, '...');
        } else if (start === 2) {
            range.push(1);
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        if (end < total - 1) {
            range.push('...', total);
        } else if (end === total - 1) {
            range.push(total);
        }

        return range;
    };

    const handlePageChange = (page: number | string) => {
        if (typeof page === 'number') {
            onPageChange(page);
        }
    };

    return (
        <PaginationWrapper>
            {visiblePages.map((page, index) => (
                <PageButton 
                    key={index} 
                    onClick={() => handlePageChange(page)} 
                    disabled={page === currentPage}
                >
                    {page}
                </PageButton>
            ))}
        </PaginationWrapper>
    );
};

export default Pagination;

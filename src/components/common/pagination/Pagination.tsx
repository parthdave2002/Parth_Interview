
"use client";

import { Pagination } from "flowbite-react";
import { useState } from "react";

export function PaginationComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination layout="table" currentPage={currentPage} itemsPerPage={10} totalItems={100} onPageChange={onPageChange} />
    </div>
  );
}
export default PaginationComponent;
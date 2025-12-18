import React from "react";
import { Table, TableHeadCell, TableHead, TableBody, TableRow, TableCell } from "flowbite-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode; // Custom render for column
}

interface TableComponentProps {
  columns: Column[];
  data: any[];
  emptyMessage?: string;
  showPlaceholder?: boolean;
  showPagination?: boolean;
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data = [],
  emptyMessage = "No records found",
  showPlaceholder = true,
  showPagination = true,
  total = 100,
  page = 1,
  pageSize = 10,
  onPageChange,
}) => {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const handlePrev = () => onPageChange && onPageChange(Math.max(1, page - 1));
  const handleNext = () => onPageChange && onPageChange(Math.min(Math.ceil(total / pageSize), page + 1));

  return (
    <div className="my-6 rounded-lg  ">

      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow sm:rounded-lg">
          <div data-testid="table-element" className="relative">          
            <div className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg drop-shadow-md dark:bg-black min-w-full divide-y divide-gray-200 dark:divide-gray-200" />

            <Table striped className="min-w-full divide-y divide-gray-200 dark:divide-gray-200 ">
              <TableHead className="bg-gray-50 dark:bg-gray-100">
                {columns.map((col) => (<TableHeadCell key={col.key}>{col.label}</TableHeadCell>))}
              </TableHead>

              <TableBody className="">
                {data?.length ? data.map((row, idx) => (
                  <TableRow key={idx}>
                    {columns.map((col) => (<TableCell key={col.key} className="px-6 py-4 whitespace-nowrap text-base font-normal text-gray-900  py-2"> {col.render ? col.render(row) : row[col.key] ?? "-"} </TableCell>))}
                  </TableRow>
                ))
                  : showPlaceholder ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="p-8">
                        <div className="h-56 bg-gray-100 rounded-md shadow-inner w-full" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="text-center p-4 text-gray-500"> {emptyMessage} </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {showPagination && (
        <div className="px-4 py-6  flex justify-between items-center">
          <div className="text-sm text-gray-500 mb-3">Showing {start} - {end} of {total} </div>
          <div className="flex space-x-3">
            <button onClick={handlePrev} disabled={page <= 1} className={`px-2 py-2 text-gray-500 rounded-full ${page <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 hover:text-white'}`}> <IoIosArrowBack /> </button>
            <button onClick={handleNext} disabled={page * pageSize >= total} className={`px-2 py-2 text-gray-500 rounded-full ${page * pageSize >= total ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 hover:text-white'}`}> <IoIosArrowForward /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;

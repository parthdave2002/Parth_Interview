import { type FC, type PropsWithChildren } from "react";
import { HiDotsVertical, HiExclamationCircle, HiHome, HiPlus } from "react-icons/hi";
import { FiFilter } from "react-icons/fi";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

interface NavbarSidebarLayoutProps {
  Name?: string;
  isOpenAddModel?: (open: boolean) => void;
  resetFilters?: () => void;
  dateRange?: any;
  setDateRange?: (v: any) => void;
  status?: any;
  setStatus?: (v: any) => void;
}

const BreadcrumbComponent: FC<PropsWithChildren<NavbarSidebarLayoutProps>> = function ({ Name, dateRange, status, resetFilters,  isOpenAddModel, setDateRange, setStatus, }) {

  const OpenAddModel = () =>{
    if (isOpenAddModel) isOpenAddModel(true);
  }

  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-gray-100 px-4 pb-4 sm:flex">
          <div className="mb-1 w-full">
          
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl"> {Name}  </h1>
          
            <div className="mt-4">
              <div className="flex items-center justify-between gap-4">

                <div className="flex flex-wrap items-center bg-gray-50 border border-gray-300 py-2 px-3 rounded-lg">
                  <div className="flex items-center gap-2  px-3 py-2 border-r border-gray-300 "> <FiFilter className="text-lg text-gray-600" size={24} />  </div>
                  <div className=" px-3 py-2 flex items-center  border-r border-gray-300 ">  <span className="text-sm text-gray-600 mr-2">Filter By</span>  </div>
                  <div className=" px-3 py-2 flex items-center  border-r border-gray-300 cursor-pointer  gap-x-4">
                    <span className="text-sm text-gray-600 mr-2">Date</span>
                    <IoIosArrowDown  className="text-gray-400" />
                  </div>

                  <div className=" px-3 py-2 flex items-center  border-r border-gray-300 cursor-pointer   gap-x-4">
                    <span className="text-sm text-gray-600 mr-2">Hide Columns</span>
                    <IoIosArrowDown className="text-gray-400" />
                  </div>

                  <div className=" px-3 py-2 flex items-center border-r border-gray-300 cursor-pointer   gap-x-4">
                    <span className="text-sm text-gray-600 mr-2">Status</span>
                    <IoIosArrowDown className="text-gray-400" />
                  </div>

                  <div className="px-3 py-2 flex items-center cursor-pointer  gap-x-4" onClick={resetFilters}>
                    <FaArrowRotateLeft className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">Reset Filters</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={() => OpenAddModel()} className="bg-[#2B6CE4] text-white px-4 py-2 rounded shadow hover:bg-blue-600 flex items-center gap-2">  <HiPlus className="text-white" />  Add {Name}  </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default BreadcrumbComponent;
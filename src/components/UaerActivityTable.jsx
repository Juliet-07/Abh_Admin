import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import StatusComponent from "./StatusComp";

const UserActivityPaginatedTable = ({ tableHead, tableData, maxItems, searchText }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);

  const endOffset = itemOffset + maxItems;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = tableData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(tableData.length / maxItems);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * maxItems) % tableData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div class="overflow-x-auto mt-[20px] mb-4">
        <table class="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="h-[50px]">
            <tr class="bg-gray-50">
              {tableHead.map((data, index) => {
                return <th class="px-4 py-2 text-[16px] min-w-[100px]">{data}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {!searchText &&
              currentItems &&
              currentItems.map((data, index) => {
                return (
                  <tr class="border-b border-[0 solid #e5e7eb] min-h-[60px] border-dotted ">
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center text-[13px]">
                      {data.pageName}
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                    <div className="flex flex-row justify-center text-[13px]">
                      50
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center text-[13px]">
                        5m. 38s
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center text-[13px]">
                        400
                      </div>
                    </td>
                    
                  </tr>
                );
              })}
            {searchText &&
              tableData &&
              tableData.map((data, index) => {
                if (
                  data.pageName
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                )
                  return (
                    <tr class="border-b border-[0 solid #e5e7eb] min-h-[60px] border-dotted ">
                      <td class="px-4 py-2 min-w-[100px]">
                        <div className="flex flex-row justify-center text-[13px]">
                        {data.pageName}
                        </div>
                      </td>
                      <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center text-[13px]">
                      50
                      </div>
                      </td>
                      <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center text-[13px]">
                        400
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center text-[13px]">
                        5m. 38s
                      </div>
                    </td>
                      
                      
                    </tr>
                  );
              })}

            {!currentItems && <p>no result</p>}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< prev"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="prevBtn"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="nextBtn"
        // breakLabel="..."
        breakAriaLabels={"..."}
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      {/* </div> */}
    </>
  );
};
export default UserActivityPaginatedTable;

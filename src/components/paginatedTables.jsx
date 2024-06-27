import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const PaginatedTable = ({tableHead, tableData, maxItems }) => {
    const [itemOffset, setItemOffset] = useState(0);

    
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
            <thead>
              <tr class="bg-gray-50">
                <th class="px-4 py-2 text-[14px]">Tracking Number</th>
                <th class="px-4 py-2 text-[14px]">Customer</th>
                <th class="px-4 py-2 text-[14px]">Products</th>
                <th class="px-4 py-2 text-[14px]">Order Date</th>
                <th class="px-4 py-2 text-[14px]">Total</th>
                <th class="px-4 py-2 text-[14px]">Status</th>
                <th class="px-4 py-2 text-[14px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems.map((data, index) => {
                return (
                  <tr class="border-b border-[0 solid #e5e7eb] min-h-[60px] border-dotted ">
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center">
                        123456{" "}
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center gap-[10px]">
                        <div className="w-[40px] h-[40px] rounded-[100px] bg-[#009f7f1a] flex items-center justify-center">
                          <b className="text-[20px] text-[teal]">J</b>{" "}
                        </div>
                        <div className="flex flex-col">
                          <b>John Doe </b>
                          <p>john@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center">
                        Product {index}{" "}
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center">
                        2024-06-26{" "}
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center">
                        $100.00{" "}
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      <div className="flex flex-row justify-center">
                        Shipped{" "}
                      </div>
                    </td>
                    <td class="px-4 py-2 min-w-[100px]">
                      {" "}
                      <div className="flex flex-row justify-center">
                        <img
                          src="/svgs/svgexport-44.svg"
                          alt=""
                          className="w-4 h-4 active:opacity-[0.5] cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
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
    )
}
export default PaginatedTable;
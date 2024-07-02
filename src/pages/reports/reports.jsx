import React from "react";
import ReportsPaginatedTable from "../../components/ReportsTable";

const Reports = () => {
  const [currentTab, setcurrentTab] = React.useState("Sales");
  const [Search, setSearchText] = React.useState("");
  const [Salesby, setSalesBy] = React.useState("category");

  return (
    <div className="font-primaryRegular">
      <br />
      <div className="flex flex-row justify-between items-center">
        <div className="w-full overflow-x-scroll">
          <div className="flex flex-row flex-1 gap-[20px]">
            {[
              "Sales",
              "Inventory",
              "Vendor",
              "Customer",
              "Transaction",
              "Compliance",
            ].map((data, index) => {
              return (
                <div
                  style={
                    currentTab == data
                      ? { background: "green", color: "white" }
                      : { background: "white", color: "black" }
                  }
                  className="min-w-[100px] h-[40px] rounded-[6px] text-[14px] text-white flex items-center justify-center"
                >
                  <p>{data}</p>
                </div>
              );
            })}
          </div>
        </div>

        <button>download</button>
      </div>
      <br />

      <div className="w-full min-h-[103px] bg-white border gap-8 flex flex-col md:flex-row border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex md:items-center  p-4">
        <p className="font-primaryBold md:text-xl flex-[20]">Sales</p>
        <div className="flex flex-[80] flex-row">
          <div className="flex flex-1 max-w-[500px] bg-[#F0F4F4] h-[40px] rounded-[4px] gap-2 border-[1px] border-[gainsboro] p-3 items-center justify-center">
            <input
              type="text"
              placeholder="Search by name"
              onInput={(e) => setSearchText(e.target.value)}
              className="flex flex-1 outline-none border-none bg-[#F0F4F4] text-[16px]"
            />
            <div className="min-w-[25px] h-[25px] bg-[url(/svgs/svgexport-1.svg)] bg-no-repeat bg-center bg-contain" />
          </div>
        </div>
      </div>
      <br />
      <div className="w-full flex md:flex-row flex-col gap-4  md:justify-between flex-wrap">
        <div className="flex flex-row gap-[20px] flex-wrap">
          <div className="flex flex-row items-center gap-[20px]">
            <b>From</b>
            <input
              aria-label="Date"
              type="date"
              className="h-[50px] p-4"
              onChange={(date) => alert(date.target.value)}
            />
          </div>
          <div className="flex flex-row items-center gap-[20px]">
            <b>To</b>
            <input
              aria-label="Date"
              type="date"
              className="h-[50px] p-4"
              onChange={(date) => alert(date.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-row items-center gap-[20px] flex-1 max-w-[400px] min-w-[400px]">
          <b className="flex flex-row ">Sales_by </b>
          <select
            onChange={(e) => setSalesBy(e.target.value)}
            className="w-full max-w-[400px]  h-[50px] p-4 rounded-[10px] "
          >
            <option value="category">Category</option>
            <option value="product">Product</option>
            <option value="vendor">Vendor</option>
          </select>
        </div>
      </div>
      <br />
      <div className="w-full flex flex-row flex-wrap gap-[20px]">
        <div className="bg-white w-[157px] md:w-[228px] md:h-[146px] h-[106px] rounded-[20px] border p-4">
          <p className="w-full h-[30px] border-b-[1px]">Total Sales</p>
          <div className="w-full h-full flex flex-1 flex-col items-center justify-center">
            <b>$0</b>
            <br />
          </div>
        </div>
        <div className="bg-white w-[157px] md:w-[228px] md:h-[146px] h-[106px] rounded-[20px] border p-4">
          <p className="w-full h-[30px] border-b-[1px]">Total Sales</p>
          <div className="w-full h-full flex flex-1 flex-col items-center justify-center">
            <b>$0</b>
            <br />
          </div>
        </div>
        <div className="bg-white w-[157px] md:w-[228px] md:h-[146px] h-[106px] rounded-[20px] border p-4">
          <p className="w-full h-[30px] border-b-[1px]">Total Sales</p>
          <div className="w-full h-full flex flex-1 flex-col items-center justify-center">
            <b>$0</b>
            <br />
          </div>
        </div>
      </div>
      <div className="w-full bg-white pb-4">
        {Salesby == "product" && (
          <ReportsPaginatedTable
            tableHead={[
              "Date",
              "Product ID",
              "Product",
              "Category",
              "Total sales",
              "Total orders",
              "Average order value",
            ]}
            searchText={Search}
            maxItems={10}
            tableData={[
              [
                "Date",
                "Product ID",
                "Product",
                "Category",
                "Total sales",
                "Total orders",
                "Average order value",
              ],
            ]}
          />
        )}
        {Salesby == "category" && (
          <ReportsPaginatedTable
            tableHead={[
              "Date",
              "Category",
              "Total sales",
              "Total orders",
              "Average order value",
            ]}
            searchText={Search}
            maxItems={10}
            tableData={[
              [
                "Date",
                "Product ID",
                "Product",
                "Category",
                "Total sales",
                
              ],
            ]}
          />
        )}
        {Salesby == "vendor" && (
          <ReportsPaginatedTable
            tableHead={[
              "Date",
              "Vendor",
              "Shop",
              "Total sales",
              "Total orders",
              "Average order value",
            ]}
            searchText={Search}
            maxItems={10}
            tableData={[
              [
                "Date",
                "Product ID",
                "Product",
                "Category",
                "Total sales",
                "Total orders",
              ],
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default Reports;

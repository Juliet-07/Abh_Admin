import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import MobileNavigation from "./MobileNav";
import Scrollbar from "./Scrollbar";
import { BsChevronDown } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { GiBookmark } from "react-icons/gi";
import { FaBusinessTime } from "react-icons/fa";
import { FcManager } from "react-icons/fc";
import { IoMdSchool } from "react-icons/io";
import { SiFormstack } from "react-icons/si";

const Layout = ({ children }) => {
  const [submenuOpen, setSubmenuOpen] = useState({});

  const toggleSubmenu = (index) => {
    setSubmenuOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const Menus = [
    {
      title: "Dashboard",
      icon: <MdDashboard />,
      path: "/dashboard",
    },
    {
      title: "User Management",
      icon: <FaBusinessTime />,
      path: "/businessProcesses",
      submenu: true,
      submenuItems: [
        { title: "All Users", path: "/businessProcesses/all-users" },
        { title: "All Vendors", path: "/businessProcesses/all-vendors" },
        { title: "Staff", path: "/businessProcesses/staff" },
      ],
    },
    {
      title: "Product Management",
      icon: <SiFormstack />,
      path: "/forms",
      submenu: true,
      submenuItems: [
        { title: "Categories", path: "/forms/categories" },
        { title: "All Products", path: "/forms/all-products" },
        { title: "Draft Products", path: "/forms/draft-products" },
        { title: "Low and Out of Stock", path: "/forms/low-out-of-stock" },
        { title: "Inventory", path: "/forms/inventory" },
      ],
    },
    {
      title: "Order Management",
      icon: <IoMdSchool />,
      path: "/premiumKnowledgeExchange",
      submenu: true,
      submenuItems: [
        { title: "Orders", path: "/premiumKnowledgeExchange/orders" },
        { title: "Transaction", path: "/premiumKnowledgeExchange/transaction" },
      ],
    },
    {
      title: "Analytics",
      icon: <GiBookmark />,
      path: "/policies",
    },
    { title: "Settings", path: "/manager", icon: <FcManager /> },
  ];

  const activeLink =
    "mx-4 flex justify-start items-center text-[#359E52] text-xl space-x-1 font-primarySemibold bg-[#F1FAF2] rounded-xl";
  const normalLink =
    "mt-3 mx-4 flex justify-start items-center space-x-1 font-primaryRegular text-gray-500";

  const handleToggleSidebar = () => {
    setMiniSidebar(!miniSidebar);
  };

  const SidebarLinks = ({ menu, index }) => {
    return (
      <>
        <NavLink
          to={menu.path}
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={() => menu.submenu && toggleSubmenu(index)}
        >
          <li
            className={`flex items-center gap-x-2 cursor-pointer p-3 hover:text-[#359E52] hover:font-primaryBold rounded-md mt-2 ${
              menu.spacing ? "mt-10" : "mt-0"
            }`}
          >
            <span className="text-xl block float-left">{menu.icon}</span>
            <span className="text-sm font-medium duration-200">
              {menu.title}
            </span>
            {menu.submenu && (
              <BsChevronDown
                className={`ml-auto transition-transform ${
                  submenuOpen[index] && "rotate-180"
                }`}
              />
            )}
          </li>
        </NavLink>
        {menu.submenu && submenuOpen[index] && (
          <ul className="ml-6">
            {menu.submenuItems.map((submenuItem, subIndex) => (
              <NavLink
                key={subIndex}
                to={submenuItem.path}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <li className="text-gray-500 flex items-center gap-x-2 cursor-pointer p-2 hover:text-white hover:font-primaryRegular rounded-md">
                  <span className="text-sm font-medium">
                    {submenuItem.title}
                  </span>
                </li>
              </NavLink>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150">
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <MobileNavigation />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`hidden md:block h-screen bg-[#ffffff] duration-300 relative`}
        >
          <div className="sidebar-scrollbar h-full w-full overflow-x-hidden">
            <Scrollbar
              className="h-full w-full"
              options={{
                scrollbars: {
                  autoHide: "never",
                },
              }}
            >
              <ul>
                {Menus.map((menu, index) => (
                  <SidebarLinks key={index} menu={menu} index={index} />
                ))}
              </ul>
            </Scrollbar>
          </div>
        </div>

        {/* content */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-full pt-20 p-5 md:p-4">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard";
import NewVendors from "./pages/UserManager/newVendors";
import CreateVendor from "./pages/UserManager/createVendor";
import AllVendors from "./pages/UserManager/allVendors";
import VendorDetails from "./pages/UserManager/vendorDetails";
import Categories from "./pages/ProductManager/categories";

function DashboardRoute() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newVendors" element={<NewVendors />} />
          <Route path="/createVendors" element={<CreateVendor />} />
          <Route path="/allVendors" element={<AllVendors />} />
          <Route path="/vendorDetails" element={<VendorDetails />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Layout>
    </>
  );
}

export default DashboardRoute;

import React from "react";
import Menu from "../Menu/Menu";
import Search from "../Search";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* <!-- Menu --> */}
        <Menu />
        {/* <!-- / Menu --> */}

        {/* <!-- Layout container --> */}
        <div className="layout-page">
          {/* <!-- Navbar --> */}

          <Search />

          {/* <!-- / Navbar --> */}

          {/* <!-- Content wrapper --> */}
          <div className="content-wrapper">
            {/* <!-- Content --> */}
            <div className="container-xxl flex-grow-1 container-p-y">
              <Outlet />
            </div>
            {/* <!-- / Content --> */}

            <div className="content-backdrop fade"></div>
          </div>
          {/* <!-- Content wrapper --> */}
        </div>
        {/* <!-- / Layout page --> */}
      </div>

      {/* <!-- Overlay --> */}
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
}

export default RootLayout;

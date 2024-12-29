import React from "react";
// import Logo from "../img/InnovateVillageArtboard-2.png";

import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const pathname = useLocation();
  console.log('pathname', pathname);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    localStorage.removeItem("token");
    navigate("/admin/login");
    window.scrollTo(0, 0);
  };

  return (
    <div className="admin_nav-container">
      <div className="admin_nav-logo_container">
        {/* <img className="admin_nav-logo" src={Logo} alt="logo" /> */}
      </div>

      <div className="admin_nav-container-inner">
        <Link to="/admin/games" className="link">
          <div
            className={
              pathname?.pathname.includes("game")
                ? "admin_nav-flex-container admin_nav-active"
                : "admin_nav-flex-container"
            }
          >
            <div
              className={
                pathname?.pathname.includes("game")
                  ? "admin_nav-flex admin_nav-flex-active"
                  : "admin_nav-flex"
              }
            >
              <svg
               className={
                pathname?.pathname.includes("game")
                  ? "admin_nav-svg admin_nav-svg-active"
                  : "admin_nav-svg"
              }
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.49 9.59965L5.6 16.7696C4.9 17.1896 4 16.6896 4 15.8696V7.86965C4 4.37965 7.77 2.19965 10.8 3.93965L15.39 6.57965L17.48 7.77965C18.17 8.18965 18.18 9.18965 17.49 9.59965Z" fill="#FFF"/>
<path d="M18.09 15.4596L14.04 17.7996L9.99999 20.1296C8.54999 20.9596 6.90999 20.7896 5.71999 19.9496C5.13999 19.5496 5.20999 18.6596 5.81999 18.2996L18.53 10.6796C19.13 10.3196 19.92 10.6596 20.03 11.3496C20.28 12.8996 19.64 14.5696 18.09 15.4596Z" fill="#FFF"/>
</svg>
            
              <div>Games</div>
            </div>
          </div>
        </Link>

        <Link to="/admin/events" className="link">
          <div
            className={
              pathname?.pathname.includes("event")
                ? "admin_nav-flex-container admin_nav-active"
                : "admin_nav-flex-container"
            }
          >
            <div
              className={
                pathname?.pathname.includes("event")
                  ? "admin_nav-flex admin_nav-flex-active"
                  : "admin_nav-flex"
              }
            >

<svg  className={
                  pathname?.pathname.includes("event")
                    ? "admin_nav-svg admin_nav-svg-active"
                    : "admin_nav-svg"
                } width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.29004 6.29C7.87004 6.29 7.54004 5.95 7.54004 5.54V2.75C7.54004 2.34 7.87004 2 8.29004 2C8.71004 2 9.04004 2.34 9.04004 2.75V5.53C9.04004 5.95 8.71004 6.29 8.29004 6.29Z" fill="#FFF"/>
<path d="M15.71 6.29C15.29 6.29 14.96 5.95 14.96 5.54V2.75C14.96 2.33 15.3 2 15.71 2C16.13 2 16.46 2.34 16.46 2.75V5.53C16.46 5.95 16.13 6.29 15.71 6.29Z" fill="#FFF"/>
<path d="M21.4999 15.8197C21.4999 15.9697 21.4499 16.1197 21.3199 16.2497C19.8699 17.7097 17.2899 20.3097 15.8099 21.7997C15.6799 21.9397 15.5099 21.9997 15.3399 21.9997C15.0099 21.9997 14.6899 21.7397 14.6899 21.3597V17.8597C14.6899 16.3997 15.9299 15.1897 17.4499 15.1897C18.3999 15.1797 19.7199 15.1797 20.8499 15.1797C21.2399 15.1797 21.4999 15.4897 21.4999 15.8197Z" fill="#FFF"/>
<path d="M21.4999 15.8197C21.4999 15.9697 21.4499 16.1197 21.3199 16.2497C19.8699 17.7097 17.2899 20.3097 15.8099 21.7997C15.6799 21.9397 15.5099 21.9997 15.3399 21.9997C15.0099 21.9997 14.6899 21.7397 14.6899 21.3597V17.8597C14.6899 16.3997 15.9299 15.1897 17.4499 15.1897C18.3999 15.1797 19.7199 15.1797 20.8499 15.1797C21.2399 15.1797 21.4999 15.4897 21.4999 15.8197Z" fill="#FFF"/>
<path d="M19.57 4.5C18.91 4.01 17.96 4.48 17.96 5.31V5.41C17.96 6.58 17.12 7.66 15.95 7.78C14.6 7.92 13.46 6.86 13.46 5.54V4.5C13.46 3.95 13.01 3.5 12.46 3.5H11.54C10.99 3.5 10.54 3.95 10.54 4.5V5.41C10.54 6.29 10.07 7.11 9.34 7.51C9.3 7.54 9.26 7.56 9.22 7.58C9.21 7.58 9.21 7.59 9.2 7.59C9.13 7.62 9.06 7.65 8.98 7.68C8.96 7.69 8.94 7.69 8.92 7.7C8.8 7.74 8.67 7.77 8.53 7.78H8.52C8.37 7.8 8.21 7.8 8.06 7.78H8.05C7.91 7.77 7.78 7.74 7.66 7.7C7.56 7.67 7.46 7.63 7.36 7.58C6.58 7.23 6.04 6.45 6.04 5.54V5.31C6.04 4.54 5.22 4.08 4.57 4.41C4.56 4.42 4.55 4.42 4.54 4.43H4.53C4.46 4.48 4.4 4.53 4.33 4.58C4.22 4.67 4.11 4.76 4.01 4.86C3.94 4.93 3.87 5 3.81 5.07C3.73 5.15 3.66 5.23 3.59 5.32C3.54 5.38 3.48 5.44 3.44 5.51C3.39 5.57 3.35 5.64 3.31 5.7C3.3 5.71 3.29 5.72 3.28 5.74C3.19 5.87 3.11 6.02 3.04 6.16C3.02 6.18 3.01 6.19 3.01 6.21C2.95 6.33 2.89 6.45 2.85 6.58C2.82 6.63 2.81 6.67 2.79 6.72C2.77 6.76 2.76 6.81 2.74 6.85C2.71 6.95 2.68 7.06 2.65 7.17C2.61 7.31 2.58 7.46 2.56 7.61C2.54 7.72 2.53 7.83 2.52 7.95C2.51 8.09 2.5 8.23 2.5 8.37V17.13C2.5 19.82 4.68 22 7.37 22H12.19C12.74 22 13.19 21.55 13.19 21V17.86C13.19 15.56 15.1 13.69 17.45 13.69C17.98 13.68 19.27 13.68 20.5 13.68C21.05 13.68 21.5 13.23 21.5 12.68V8.37C21.5 6.78 20.74 5.39 19.57 4.5ZM11.13 15.91C11.04 16.21 10.76 16.42 10.43 16.42H6.79C6.74 16.42 6.7 16.42 6.66 16.4C6.3 16.35 6.04 16.04 6.04 15.67C6.04 15.25 6.37 14.91 6.79 14.91H10.43C10.84 14.91 11.18 15.25 11.18 15.67C11.18 15.75 11.17 15.84 11.13 15.91ZM13.91 12.2C13.82 12.5 13.54 12.71 13.21 12.71H6.79C6.74 12.71 6.7 12.71 6.66 12.69C6.3 12.64 6.04 12.33 6.04 11.96C6.04 11.54 6.37 11.2 6.79 11.2H13.21C13.63 11.2 13.96 11.54 13.96 11.96C13.96 12.04 13.95 12.13 13.91 12.2Z" fill="#FFF"/>
</svg>

      
              <div>Events</div>
            </div>
          </div>
        </Link>
      </div>
      <div className="admin_nav-footer">
            <div className="admin_nav-footer-title">Admin</div>
            <div
              className="admin_nav-footer-subtitle pointer"
                onClick={handleLogout}
            >
              Log out
            </div>
        {/* <img src={Logo} alt="" /> */}
      </div>
    </div>
  );
};

export default Sidebar;
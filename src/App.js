import { useEffect, useRef } from "react";
import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate
} from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import Event from "./pages/Event";
import UpcomingEvent from "./pages/UpcomingEvent";
import Events from "./pages/Events";
import SearchResults from "./pages/SearchResults";
import AdminEvents from "./pages/admin/Events";
import CreateEvent from "./pages/admin/CreateEvent";
import AdminGames from "./pages/admin/Games";
import AddGame from "./pages/admin/AddGame";
import AdminLogin from "./pages/admin/Login";
import EditGame from "./pages/admin/EditGame";
import EditEvent from "./pages/admin/EditEvent";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth);
  const pathname = useLocation();
  const scrollRef = useRef(null);

  // useEffect(() => {
  //   const scroll = new LocomotiveScroll({
  //     el: document.querySelector("[data-scroll-container]"),
  //     smooth: true,
  //     lerp: 0.06,
  //     tablet: {
  //       breakpoint: 768,
  //     },
  //   });

  //   if (scroll) {
  //     scrollRef.current = scroll;
  //   } else {
  //     console.error('LocomotiveScroll instance could not be initialized.');
  //   }

  //   return () => {
  //     scroll.destroy(); // Clean up on unmount
  //   };
  // }, [pathname]);
  return (
    <div data-scroll-container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/upcoming-event/:id" element={<UpcomingEvent />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/events"
          element={
            auth.token && auth?.userInfo?.role === "admin" ? (
              <AdminEvents />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/admin/create-event"
          element={
            auth.token && auth?.userInfo?.role === "admin" ? (
              <CreateEvent />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/admin/edit-event/:id"
          element={
            auth.token && auth?.userInfo?.role === "admin" ? (
              <EditEvent />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/admin/games"
          element={
            auth.token && auth?.userInfo?.role === "admin" ? (
              <AdminGames />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/admin/create-game"
          element={
            auth.token && auth?.userInfo?.role === "admin" ? (
              <AddGame />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/admin/edit-game/:id"
          element={
            auth.token && auth?.userInfo?.role === "admin" ? (
              <EditGame />
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;

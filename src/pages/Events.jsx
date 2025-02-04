// import Header from "../components/header";
import Explore from "../components/explore";
// import Footer from "../components/footer";
import EventCard from "../components/eventCard";
import { getAllEvents } from "../apis";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Events() {
  const auth = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);

  const handleGetEvents = async () => {
    const response = await getAllEvents(auth?.token);
    console.log("getAllEvents", response);
    if(response?.status === 200) {
      setEvents(response?.data);
    }
  };

  useEffect(() => {
    handleGetEvents();
  }, []);

  return (
    <>
      <br />
      <br />
      {/* <Header /> */}
      <main className="events">
        <div className="events__grid">
          {events?.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
      </main>

      <Explore />
      {/* <Footer /> */}
    </>
  );
}

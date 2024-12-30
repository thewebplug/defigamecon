// import Header from "../components/header";
import Explore from "../components/explore";
// import Footer from "../components/footer";
import EventCard from "../components/eventCard";
import { getAllEvents } from "../apis";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function Events() {
  const auth = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);

  const [searchParams] = useSearchParams();
  const event = searchParams.get('event');
  

  const handleGetEvents = async () => {
    const response = await getAllEvents(auth?.token);
    console.log("getAllEvents", response?.data[0]?.title, event);
    if(response?.status === 200) {
      setEvents(response?.data?.filter((item) => item?.title?.toLowerCase()?.includes(event) || item?.venue?.toLowerCase()?.includes(event) || item?.description?.toLowerCase()?.includes(event) || item?.categories?.includes(event)));
    }
    };

  useEffect(() => {
    handleGetEvents();
  }, [event]);

  

  return (
    <>
      <br />
      <br />
      {/* <Header /> */}
      <main className="events">
      <div className="events__title">Search results</div>

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

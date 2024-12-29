import Header from "../components/header";
import Explore from "../components/explore";
import Footer from "../components/footer";
import Highlights from "../components/highlights";
import ImageGrid from "../components/imageGrid";
import EventBanner from "../components/eventBanner";
import React, { useEffect, useState } from "react";
import { getEvent } from "../apis";
import { useParams } from "react-router-dom";

export default function Event() {
    const {id} = useParams();

  const [event, setEvent] = useState(null);

  const handleGetEvent = async () => {
    const response = await getEvent(id);
    console.log("getEvent", response);
    setEvent(response?.data);
  };

  useEffect(() => {
    handleGetEvent();
  }, []);

  return (
    <>
      <br />
      <br />
      <Header />
      <main className="event">
        <div className="event__title">
          {event?.title?.split(" ")[0] && (
            <span>
              {event?.title?.split(" ")[0]}{" "}
              {event?.categories[0] && (
                <div className="event__pill">{event?.categories[0]}</div>
              )}{" "}
              {event?.categories[1] && (
                <div className="event__pill">{event?.categories[1]}</div>
              )}
            </span>
          )}{" "}
          {event?.title?.split(" ")[1] && (
            <span>
              {event?.title?.split(" ")[1]}{" "}
              {event?.categories[2] && (
                <div className="event__pill">{event?.categories[2]}</div>
              )}{" "}
              {event?.categories[3] && (
                <div className="event__pill">{event?.categories[3]}</div>
              )}
            </span>
          )}{" "}
          {event?.title?.split(" ")[2] && (
            <span>
              {event?.title?.split(" ")[2]}{" "}
              {event?.categories[4] && (
                <div className="event__pill">{event?.categories[4]}</div>
              )}
            </span>
          )}
        </div>

        <div className="event__subtitle">
          {event?.description}
        </div>
      

        <EventBanner image={event?.banner} />

        <div className="event__past">
          <ImageGrid images={event?.images} />
        </div>
        <Highlights videos={event?.videos} />
      </main>

      <Explore />
      <Footer />
    </>
  );
}

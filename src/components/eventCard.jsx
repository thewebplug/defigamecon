import { useNavigate } from "react-router-dom";

export default function EventCard ({event, past=false}) {
    const navigate = useNavigate();

  return (
    <div className="event-card">
    <div className="event-card__group">
      <img src={event?.images[0]?.url} alt="" />
      <img src={event?.images[1]?.url} alt="" />
      <img src={event?.images[2]?.url} alt="" />
    </div>
    <img className="event-card__img" src={event?.images[3]?.url} alt="" />
    <div className="event-card__button-group">
      <div>{event?.title}</div>
      <button onClick={() => navigate(past ? `/event/${event?._id}` : `/upcoming-event/${event?._id}`)}>See more</button>
    </div>
  </div>
  );
}

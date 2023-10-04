import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  console.log(allEvents);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <div className="w-full grid">
            {allEvents.length !== 0 ? (
              allEvents.map((eachEvent) => (
                <EventCard key={eachEvent.id} data={eachEvent} />
              ))
            ) : (
              <h4>No Events available!</h4>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;

import { useState, useEffect, MouseEvent, TouchEvent } from "react";
import { buildSelector } from "./hours";
import moment, { Moment } from "moment";
import styles from "./TimeSelector.module.scss";

export type timeSlot = {
  start: Moment;
  end: Moment;
  available: boolean;
};

const TimeSelector = ({
  day,
  unavailable,
  start,
  setStart,
  end,
  setEnd,
}: {
  day: Moment;
  unavailable: timeSlot[];
  start: Moment | null;
  setStart: (val: Moment | null) => void;
  end: Moment | null;
  setEnd: (val: Moment | null) => void;
}) => {
  const [slots, setSlots] = useState<timeSlot[]>(
    buildSelector(day, unavailable)
  );

  const [clicking, setClicking] = useState<boolean>(false);

  const handleMouseDown = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
    slot: timeSlot
  ) => {
    if (slot.available) {
      const blocks = document.querySelectorAll('[id^="slot "]');
      for (let i = 0; i < blocks.length; i++) {
        blocks[i].classList.remove(styles["selected"]);
      }
      (e.target as HTMLDivElement).classList.add(styles["selected"]);
      setStart(slot.start);
    }
  };

  useEffect(() => {
    if (start) {
      setClicking(true);
    }
    setEnd(null);
  }, [start]);

  const handleMouseUp = (slot: timeSlot) => {
    if (start && slot) {
      setEnd(slot.end);
      setClicking(false);
    }
  };

  const handleMouseLeave = () => {
    if (clicking) {
      setClicking(false);
      const blocks = document.querySelectorAll('[id^="slot "]');
      for (let i = 0; i < blocks.length; i++) {
        blocks[i].classList.remove(styles["selected"]);
      }
      setStart(null);
    }
  };

  const handleHover = (
    e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>,
    slot: timeSlot
  ) => {
    e.preventDefault();
    if (!clicking) {
      return;
    }
    if (
      (e.target as HTMLDivElement).classList.contains(styles["unavailable"])
    ) {
      setClicking(false);
      const blocks = document.querySelectorAll('[id^="slot "]');
      for (let i = 0; i < blocks.length; i++) {
        blocks[i].classList.remove(styles["selected"]);
      }
      setStart(null);
      return;
    }
    (e.target as HTMLDivElement).classList.add(styles["selected"]);
  };

  return (
    <div className={styles["container"]} onMouseLeave={handleMouseLeave}>
      {slots.map((slot, index) => (
        <div
          key={slot.start.format("h:mm a")}
          id={"slot " + slot.start.format("h:mm a")}
          className={`${
            slot.available ? styles["slot"] : styles["unavailable"]
          } ${
            index % 4 === 0
              ? styles["zero"]
              : index % 4 === 1
              ? styles["fifteen"]
              : styles["thirty-fortyfive"]
          } ${index === slots.length - 1 ? styles["bottom"] : ""}`}
          onMouseDown={(e) => handleMouseDown(e, slot)}
          onMouseUp={() => handleMouseUp(slot)}
          onMouseEnter={(e) => handleHover(e, slot)}
          onTouchStart={(e) => handleMouseDown(e, slot)}
          onTouchEnd={() => handleMouseUp(slot)}
          onTouchMove={(e) => handleHover(e, slot)}
        >
          {index % 4 === 0 ? (
            <span className={styles["time-label"]}>
              {slot.start.format("h:mm A")}
            </span>
          ) : index === slots.length - 1 ? (
            <span className={styles["bottom-label"]}>
              {slot.end.format("h:mm A")}
            </span>
          ) : null}
          <span className={styles["time-label"]}></span>
        </div>
      ))}
    </div>
  );
};

export default TimeSelector;

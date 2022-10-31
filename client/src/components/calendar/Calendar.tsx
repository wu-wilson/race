import { useEffect, useState } from "react";
import { buildCalendar } from "./build-calendar";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import moment, { Moment } from "moment";
import styles from "./Calendar.module.scss";

const weekAbbrv = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const Calendar = ({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: Moment | null;
  setSelectedDay: (val: Moment) => void;
}) => {
  // Store the month's arrays of weeks in calendar
  const [calendar, setCalendar] = useState<Moment[][]>([]);
  const [curMoment, setCurMoment] = useState<Moment>(moment());
  const [monthStart, setMonthStart] = useState<Moment>(
    curMoment.clone().startOf("month")
  );
  const [monthEnd, setMonthEnd] = useState<Moment>(
    curMoment.clone().endOf("month")
  );

  // Toggle month
  const handlePrev = () => {
    setCurMoment(curMoment.clone().subtract(1, "month"));
  };

  const handleNext = () => {
    setCurMoment(curMoment.clone().add(1, "month"));
  };

  // Change calendar when curMoment changes
  useEffect(() => {
    setCalendar(buildCalendar(curMoment));
    setMonthStart(curMoment.clone().startOf("month"));
    setMonthEnd(curMoment.clone().endOf("month"));
  }, [curMoment]);

  // Return the correct class for a specific day
  const dayStyle = (day: Moment) => {
    if (day.isSame(new Date(), "day")) {
      if (day.isSame(selectedDay, "day")) {
        return styles["selected"];
      }
      return styles["today"];
    }
    if (day.isBefore(monthStart, "day")) {
      if (day.isSame(selectedDay, "day")) {
        return styles["selectedBefore"];
      }
      return styles["before"];
    }
    if (day.isAfter(monthEnd, "day")) {
      if (day.isSame(selectedDay, "day")) {
        return styles["selectedAfter"];
      }
      return styles["after"];
    }
    if (day.isSame(selectedDay, "day")) {
      return styles["selected"];
    }
    return styles["day"];
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <RiArrowLeftSFill
          className={`${styles["arrow"]} ${styles["left"]}`}
          onClick={handlePrev}
        />
        {curMoment.format("MMMM YYYY")}
        <RiArrowRightSFill
          className={`${styles["arrow"]} ${styles["right"]}`}
          onClick={handleNext}
        />
      </div>
      <div className={styles["week-headers"]}>
        {weekAbbrv.map((week) => (
          <div key={week} className={styles["week-header"]}>
            {week}
          </div>
        ))}
      </div>
      {calendar.map((week) => (
        <div key={week[0].format("YYYY-MM-DD")} className={styles["week"]}>
          {week.map((day) => (
            <div
              key={day.format("YYYY-MM-DD")}
              className={dayStyle(day)}
              onClick={() => {
                if (
                  !(
                    day.isBefore(monthStart, "day") ||
                    day.isAfter(monthEnd, "day")
                  )
                ) {
                  setSelectedDay(day);
                }
              }}
            >
              {day.format("D")}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;

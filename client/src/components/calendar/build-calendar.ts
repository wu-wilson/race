import { Moment } from "moment";

export const buildCalendar = (moment: Moment) => {
  const calendar: Moment[][] = [];

  const startDay = moment.clone().startOf("month").startOf("week");
  const endDay = moment.clone().endOf("month").endOf("week");

  // Check if the number of days required for a month is less than 42
  const checkNumDays = () => {
    let numDays = 1;
    let dayCheck = startDay.clone().subtract(1, "day");
    while (dayCheck.isBefore(endDay, "day")) {
      dayCheck.add(1, "day");
      numDays += 1;
    }
    if (numDays < 42) {
      return true;
    } else {
      return false;
    }
  };

  // If checkNumDays() returns true, push one extra row of weeks.
  if (checkNumDays()) {
    const day = startDay.clone().subtract(8, "day");
    while (day.isBefore(endDay, "day")) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }
    // Else, push the appropriate number of weeks
  } else {
    const day = startDay.clone().subtract(1, "day");
    while (day.isBefore(endDay, "day")) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone())
      );
    }
  }

  return calendar;
};

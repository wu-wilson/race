import moment, { Moment } from "moment";
import { timeSlot } from "./TimeSelector";

type hours = {
  [day: string]: {
    start: string;
    end: string;
  };
};

export const hours: hours = {
  Monday: {
    start: "6:30 am",
    end: "11:00 pm",
  },
  Tuesday: {
    start: "6:30 am",
    end: "11:00 pm",
  },
  Wednesday: {
    start: "6:03 am",
    end: "11:00 pm",
  },
  Thursday: {
    start: "6:30 am",
    end: "11:00 pm",
  },
  Friday: {
    start: "6:30 am",
    end: "9:00 pm",
  },
  Saturday: {
    start: "8:00 am",
    end: "8:00 pm",
  },
  Sunday: {
    start: "8:00 am",
    end: "9:00 pm",
  },
};

const getNumBlocks = (day: Moment) => {
  let start = moment(
    `${day.clone().format("DD MM YYYY")} ${
      hours[day.clone().format("dddd")].start
    }`,
    "DD MM YYYY h:mm a"
  );
  if (start.format("mm") !== "00") {
    start = start.add(1, "hour").startOf("hour");
  }
  const end = moment(
    `${day.clone().format("DD MM YYYY")} ${
      hours[day.clone().format("dddd")].end
    }`,
    "DD MM YYYY h:mm a"
  ).startOf("hour");
  return Math.abs(start.diff(end, "hour")) * 4;
};

export const buildSelector = (day: Moment, unavailable: timeSlot[]) => {
  const numBlocks = getNumBlocks(day);
  let res: timeSlot[] = [];
  let time = moment(
    `${day.clone().format("DD MM YYYY")} ${
      hours[day.clone().format("dddd")].start
    }`,
    "DD MM YYYY h:mm a"
  );
  if (time.format("mm") !== "00") {
    time = time.add(1, "hour").startOf("hour");
  }
  // Initialize array of 15 min intervals
  for (let i = 0; i < numBlocks; i++) {
    res.push({
      start: time.clone(),
      end: time.clone().add(15, "minutes"),
      available: true,
    });
    time = time.add(15, "minutes");
  }
  // Update availability
  for (let i = 0; i < unavailable.length; i++) {
    for (let j = 0; j < res.length; j++) {
      if (
        (unavailable[i].start.isBefore(res[j].start) ||
          unavailable[i].start.isSame(res[j].start)) &&
        (unavailable[i].end.isAfter(res[j].end) ||
          unavailable[i].end.isSame(res[j].end))
      ) {
        res[j].available = false;
      }
    }
  }
  return res;
};

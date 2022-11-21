import express, { Request, Response } from "express";
import { json as bodyParser } from "body-parser";
import cors from "cors";
import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Setting up server
const app = express();
app.use(cors());
app.use(bodyParser());

// Connect to database
const database = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

database.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to database...");
  }
});

// Get reservations for a specific court on a given day
app.get(
  "/booked/:courtType/:courtNum/:day/:month/:year",
  (req: Request, res: Response) => {
    const QUERY = `SELECT * FROM reservation WHERE courtType = "${req.params.courtType}" AND courtNum = "${req.params.courtNum}" AND date = "${req.params.day} ${req.params.month} ${req.params.year}"`;
    database.query(QUERY, (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    });
  }
);

// Get bookings for a user
app.get("/bookings/:user", (req: Request, res: Response) => {
  const QUERY = `SELECT * FROM reservation WHERE uid = ?`;
  database.query(QUERY, [req.params.user], (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(result);
    }
  });
});

// Make a reservation
app.post("/reserve", (req: Request, res: Response) => {
  const QUERY = `INSERT INTO reservation (uid, courtType, courtNum, date, start, end) VALUES ("${req.body.uid}", "${req.body.courtType}", "${req.body.courtNum}", "${req.body.date}", "${req.body.start}", "${req.body.end}")`;
  database.query(QUERY, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send(result);
    }
  });
});

// Listen
app.listen(process.env.PORT, () => {
  console.log("listening on port 4000...");
});

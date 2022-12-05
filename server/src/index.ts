import { json as bodyParser } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mysql2 from "mysql2";

dotenv.config();

// Setting up server
const app = express();
app.use(cors());
app.use(bodyParser());

// Create connection pool
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  connectionLimit: 20,
});

// Check pool connection
pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database connected");
    connection.release();
  }
});

// Get reservations for a specific court on a given day
app.get(
  "/booked/:courtType/:courtNum/:day/:month/:year",
  (req: Request, res: Response) => {
    const QUERY = `SELECT * FROM reservation WHERE courtType = "${req.params.courtType}" AND courtNum = "${req.params.courtNum}" AND date = "${req.params.day} ${req.params.month} ${req.params.year}"`;
    pool.getConnection((err, connection) => {
      if (err) {
        connection.release();
        console.log(err);
      } else {
        connection.query(QUERY, (err, result) => {
          if (err) {
            connection.release();
            return res.send(err);
          } else {
            connection.release();
            return res.send(result);
          }
        });
      }
    });
  }
);

// Get bookings for a user
app.get("/bookings/:user", (req: Request, res: Response) => {
  const QUERY = `SELECT * FROM reservation WHERE uid = ?`;
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.log(err);
    } else {
      connection.query(QUERY, [req.params.user], (err, result) => {
        if (err) {
          connection.release();
          return res.send(err);
        } else {
          connection.release();
          return res.send(result);
        }
      });
    }
  });
});

// Make a reservation
app.post("/reserve", (req: Request, res: Response) => {
  const QUERY = `INSERT INTO reservation (uid, courtType, courtNum, date, start, end) VALUES ("${req.body.uid}", "${req.body.courtType}", "${req.body.courtNum}", "${req.body.date}", "${req.body.start}", "${req.body.end}")`;
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.log(err);
    } else {
      connection.query(QUERY, (err, result) => {
        if (err) {
          connection.release();
          return res.send(err);
        } else {
          connection.release();
          return res.send(result);
        }
      });
    }
  });
});

// Delete a specific reservation for a user
app.delete("/delete/reservation/:user", (req: Request, res: Response) => {
  const QUERY = `DELETE FROM reservation WHERE uid = ? AND date = "${req.body.date}" AND start = "${req.body.start}" AND end = "${req.body.end}" AND courtType = "${req.body.courtType}" AND courtNum = "${req.body.courtNum}"`;
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.log(err);
    } else {
      connection.query(QUERY, [req.params.user], (err, result) => {
        if (err) {
          connection.release();
          return res.send(err);
        } else {
          connection.release();
          return res.send(result);
        }
      });
    }
  });
});

// Check into a court
app.post("/check-in", (req: Request, res: Response) => {
  const QUERY = `INSERT INTO courtStatus (courtType, courtNum) VALUES ("${req.body.courtType}", "${req.body.courtNum}")`;
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.log(err);
    } else {
      connection.query(QUERY, (err, result) => {
        if (err) {
          connection.release();
          return res.send(err);
        } else {
          connection.release();
          return res.send(result);
        }
      });
    }
  });
});

// Check out of a court
app.delete("/check-out", (req: Request, res: Response) => {
  const QUERY = `DELETE FROM courtStatus WHERE courtType = "${req.body.courtType}" AND courtNum = "${req.body.courtNum}" LIMIT 1`;
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.log(err);
    } else {
      connection.query(QUERY, (err, result) => {
        if (err) {
          connection.release();
          return res.send(err);
        } else {
          connection.release();
          return res.send(result);
        }
      });
    }
  });
});

// Get the number of people checked into a court
app.get("/count/:courtType/:courtNum", (req: Request, res: Response) => {
  const QUERY = `SELECT COUNT(*) AS num_people FROM courtStatus WHERE courtType = "${req.params.courtType}" AND courtNum = "${req.params.courtNum}"`;
  pool.getConnection((err, connection) => {
    if (err) {
      connection.release();
      console.log(err);
    } else {
      connection.query(QUERY, (err, result) => {
        if (err) {
          connection.release();
          return res.send(err);
        } else {
          connection.release();
          return res.send(result);
        }
      });
    }
  });
});

export default app;

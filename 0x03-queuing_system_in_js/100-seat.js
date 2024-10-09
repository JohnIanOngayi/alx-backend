import { createQueue, Job, Queue } from "kue";
import { createClient } from "redis";
import express from "express";
import { promisify } from "util";

/** @type {RedisClient} */
const redisClient = createClient()
  .on("error", (error) => console.log(`Redis Client Error: ${error}`))
  .on("connect", () => console.log("Redis Client Successfully Connected"));

/** @type {Queue} */
const queue = createQueue();

const setAsync = promisify(redisClient.hset).bind(redisClient);
const getAsync = promisify(redisClient.hget).bind(redisClient);
const incrAsync = promisify(redisClient.hincrby).bind(redisClient);

/** @type {Express} */
const app = express();

const reserveSeat = async (number) => {
  try {
    const reserve_seat = await queue
      .createJob("job", {})
      .save((error) => {
        if (error)
          console.log(
            `Seat reservation job ${reserve_seat.id} failed: ${error}`,
          );
        else console.log(`Seat reservation job ${reserve_seat.id} created`);
      })
      .on("failed", (error) =>
        console.log(`Seat reservation job ${reserve_seat.id} failed: ${error}`),
      )
      .on("completed", () =>
        console.log(`Seat reservation job ${reserve_seat.id} completed`),
      );
  } catch (error) {
    console.log(`reserveSeat Error: ${error}`);
  }
};

const getCurrentAvailableSeats = async () => {
  try {
    return await getAsync("kino", "available_seats");
  } catch (error) {
    console.log(`Available Seats Controller Error: ${error}`);
  }
};

app.get("/available_seats", async (req, res) => {
  try {
    const num = getCurrentAvailableSeats();
    res.status(200).json({ numberofAvailableSeats: num });
  } catch (error) {
    console.log(`Error: ${error}`);
    res.sendStatus(500);
  }
});

app.get("/reserve_seat", async (req, res) => {
  try {
    const reservationEnabled = await getAsync("kino", "reservationEnabled");
    if (!reservationEnabled)
      res.status(404).json({ status: "Reservation are blocked" });
    else {
      /** @type {Job} */
      reserveSeat();
      res.status(200).json({ status: "Reservation in process" });
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    res.sendStatus(500);
  }
});

app.get("/process", async (req, res) => {
  try {
    const process_seat = await queue.process("job", async (_, done) => {
      await incrAsync("kino", "available_seats", -1);
      done();
    });
  } catch (error) {
    done(new Error(error));
  }
});

app.listen("1245", async () => {
  try {
    await setAsync("kino", "available_seats", 50);
    console.log("Available ");
    await setAsync("kino", "reservationEnabled", true);
    console.log(`API connected to Redis and listening on 1245`);
  } catch (error) {
    console.log(`API Server Connection Error: ${error}`);
  }
});

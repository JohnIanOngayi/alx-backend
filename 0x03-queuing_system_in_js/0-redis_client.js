import { createClient } from "redis";

/** @type RedisClient*/
const client = createClient({
  host: "127.0.0.1",
  port: 6379,
})
  .on("error", (err) =>
    console.log(`Redis client not connected to the server: ${err.message}`),
  )
  .on("connect", () => console.log("Redis client connected to the server"));

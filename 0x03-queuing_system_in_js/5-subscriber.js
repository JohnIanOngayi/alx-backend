import { createClient, RedisClient } from "redis";

/** @type- {} */
const redisClient = createClient()
  .on("error", (error) =>
    console.log(`Redis client not connected to the server: ${error}`),
  )
  .on("connect", () => console.log("Redis client connected to the server"));

redisClient.subscribe("holberton school channel", (error, _) => {
  if (error) console.log(`Couldn't subscribe to the channel`);
});

redisClient.on("message", (channel, message) => {
  if (channel === "holberton school channel") {
    console.log(message);
    if (message === "KILL_SERVER") {
      redisClient.unsubscribe("holberton school channel", (error) => {
        if (error) console.log(`Error while unsubscribing: ${error}`);
      });
      redisClient.quit((error) => {
        if (error) console.log(`Error while disconnecting: ${error}`);
      });
    }
  }
});

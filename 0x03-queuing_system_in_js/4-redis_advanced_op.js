import { createClient, print } from "redis";

/** @type RedisClient*/
const client = createClient({
  host: "127.0.0.1",
  port: 6379,
})
  .on("error", (err) =>
    console.log(`Redis client not connected to the server: ${err.message}`),
  )
  .on("connect", () => console.log("Redis client connected to the server"));

client.del("HolbertonSchools", (err, value) => {
  if (err) console.error(`Del Error: ${err.message}`);
  else {
    try {
      client.hset("HolbertonSchools", "Portland", 50, print);
      client.hset("HolbertonSchools", "Seattle", 80, print);
      client.hset("HolbertonSchools", "New York", 20, print);
      client.hset("HolbertonSchools", "Bogota", 20, print);
      client.hset("HolbertonSchools", "Cali", 40, print);
      client.hset("HolbertonSchools", "Paris", 2, print);
    } catch (error) {
      console.error(`Hset Error: ${error.message}`);
    }

    client.hgetall("HolbertonSchools", (err, value) => {
      if (err) console.error(`Hget Error: ${err.message}`);
      else console.log(value);
    });
  }
});

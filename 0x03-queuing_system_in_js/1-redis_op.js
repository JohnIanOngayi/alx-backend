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

const setNewSchool = (schoolName, value) => {
  try {
    client.set(schoolName, value, print);
  } catch (error) {
    console.error(`setNewSchool Error: ${error.message}`);
  }
};
const displaySchoolValue = async (schoolName) => {
  client.get(schoolName, (err, value) => {
    if (err) console.error("displaySchoolValue Error:", err.message);
    else console.log(value);
  });
};

displaySchoolValue("Holberton");
setNewSchool("HolbertonSanFrancisco", "100");
displaySchoolValue("HolbertonSanFrancisco");

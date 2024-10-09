import { createClient, print } from "redis";
import { promisify } from "util";

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

const getAsync = promisify(client.get).bind(client);

const displaySchoolValue = async (schoolName) => {
  try {
    const value = await getAsync(schoolName);
    console.log(value);
  } catch (error) {
    console.error(`displaySchoolValue Error: ${error.message}`);
  }
};

// async function main() {
//   await displaySchoolValue("Holberton");
//   await setNewSchool("HolbertonSanFrancisco", "100");
//   await displaySchoolValue("HolbertonSanFrancisco");
// }
// main();

/**Or using an IIFE*/
(async () => {
  await displaySchoolValue("Holberton");
  await setNewSchool("HolbertonSanFrancisco", "100");
  await displaySchoolValue("HolbertonSanFrancisco");
})();

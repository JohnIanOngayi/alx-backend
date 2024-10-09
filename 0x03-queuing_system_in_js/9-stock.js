import express from "express";
import { createClient, RedisClient } from "redis";
import { promisify } from "util";

/** @type {Product[]} - list of product objects */
const listProducts = [
  { id: 1, name: "Suitcase 250", price: 50, stock: 4 },
  { id: 2, name: "Suitcase 450", price: 100, stock: 10 },
  { id: 3, name: "Suitcase 650", price: 350, stock: 2 },
  { id: 4, name: "Suitcase 1050", price: 550, stock: 5 },
];

/** @type {Express} */
const app = express();
/** @type {RedisClient} */
const redisClient = createClient()
  .on("error", (error) => console.log(`Redis Client Error: ${error}`))
  .on("connect", () => console.log("Redis Client Successfully Connected"));

const setAsync = promisify(redisClient.hset).bind(redisClient);
const getAsync = promisify(redisClient.hgetall).bind(redisClient);
const hincrAsync = promisify(redisClient.hincrby).bind(redisClient);

/**
 * returns item by id
 * @param {Number} id - id sorted after
 * @returns {Product} product matching id
 */
const getItemById = (id) => listProducts.find((product) => product.id === id);

const initialiseStock = async () => {
  try {
    for (const product of listProducts) {
      await setAsync(product.id, "name", product.name);
      await setAsync(product.id, "price", product.price);
      await setAsync(product.id, "initialAvailableQuantity", product.stock);
      await setAsync(product.id, "currentQuantity", product.stock);
    }
  } catch (error) {
    console.log(`initialiseStock Hset Error: ${error}`);
  }
};

const getCurrentReservedStockById = async (itemId) => {
  try {
    const product = await getAsync(itemId);
    return product;
  } catch (error) {
    console.log(`getCurrentReservedStockById Hget Error: ${error}`);
  }
};

app.get("/list_products/:id", async (req, res) => {
  const { id } = req.params;

  /** fix keys */
  if (!id) {
    const copyListProducts = listProducts.map((product) => {
      const { stock, ...rest } = product;
      return { ...rest, initialAvailableQuantity: stock };
    });
    return res.status(200).json(copyListProducts);
  }

  const product = await getCurrentReservedStockById(id);

  if (!product) res.json({ status: "Product not found" }).status(400);
  else {
    const { currentQuantity, ...rest } = product;
    return res
      .status(200)
      .json({ ...rest, initialAvailableQuantity: currentQuantity });
  }
});

app.get("/reserve_product/:id", async (req, res) => {
  const { id } = req.params;
  const product = await getCurrentReservedStockById(id);
  if (!product) res.json({ status: "Product not found" }).status(400);
  else if (product.currentQuantity < 1)
    res.json({ status: "Not enough stock available", itemId: id });
  else {
    try {
      await hincrAsync(id, "currentQuantity", -1);
      res.json({ status: "Reservation confirmed", itemId: id }).status(200);
    } catch (error) {
      console.log(`reserve_product Controller Error: ${error}`);
      return res.status(500).json({ status: "Internal Server Error" });
    }
  }
});

app.listen(1245, async () => {
  await initialiseStock();
  console.log("API Server successfully connected on port 1245");
});

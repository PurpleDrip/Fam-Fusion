import chalk from "chalk";
import express from "express";
import OneCard from "one-card";

const router = express.Router();

router.post("/", (req, res) => {
  console.log(chalk.bgBlue("API called to verify using One Card"));
  const { encrypt, key, iv } = req.body;
  console.log(encrypt, key, iv);

  const obj = new OneCard("guru");
  obj.signin("guru");

  let decrypt;
  try {
    decrypt = obj.decrypt(encrypt, key, iv);
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Error decoding the encrypted data" });
  }
  console.log(decrypt);
  return res.status(200).json(decrypt);
});

export default router;

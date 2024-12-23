import "dotenv/config";
import express from "express";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

let teaData = [];
let nextId = 1;

app.post("/order", (req, res) => {
  const { name, price } = req.body;
  const newTea = {
    id: nextId++,
    name: name,
    price: price,
  };
  teaData.push(newTea);
  res.status(200).send(newTea);
});

app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

app.get("/teas/:id", (req, res) => {
  const oneTea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!oneTea) {
    return res.status(404).send({ message: "Tea not found" });
  }
  res.status(200).send(oneTea);
});
app.put("/teas/:id", (req, res) => {
  const oneTea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!oneTea) {
    return res.status(404).send({ message: "Tea not found" });
  }
  const { name, price } = req.body;
  oneTea.name = name;
  oneTea.price = price;

  res.status(200).send(oneTea);
});

app.delete("/teas/:id", (req, res) => {
  const indexTea = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (indexTea === -1) {
    res.status(404).send("Tea not found");
  }
  teaData.splice(indexTea, 1);
  res.status(200).send("deleted tea");
});

app.listen(port, () => {
  console.log(`Server is running on the port: ${port}`);
});

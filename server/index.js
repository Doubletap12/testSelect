const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); 

function generateOptions() {
  const list = [];
  for (let i = 1; i <= 1000; i++) {
    list.push({
      name: String(i),
      value: String(i),
    });
  }
  return list;
}

app.get("/options/for/select", (req, res) => {
  res.json(generateOptions());
});

app.post("/selected/option", (req, res) => {
  const value = req.body.value;
  if (!value) {
    return res.status(400).json({ message: "Ошибка: нет value" });
  }
  return res.json({
    message: `Выбранная опция ${value} успешно принята.`,
  });
});

app.listen(4000, () => {
  console.log("Mock API running at http://localhost:4000");
});

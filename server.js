const express=require("express");
const dotenv=require("dotenv");


const app = express();
dotenv.config();

app.get("/page", (req, res) => {
  res.send("Bienvenue dans la page");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port: ${PORT}`);
});

import express from "express";
import cors from "cors";
import empresasRouter from "./routes/empresas.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/empresas", empresasRouter);

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});

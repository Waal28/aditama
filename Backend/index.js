import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/routes/index.js";
import { PORT } from "./src/config/env.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

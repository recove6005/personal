import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

import homeRouter from './routes/home-router.js';

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());
app.use(bodyParser.json());

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}));

// static files
const __filenmae = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenmae);

app.use(express.static('public'));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// routers
app.use('/', homeRouter);

// server excute
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
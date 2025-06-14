import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

// __dirname을 정의(ES 모듈 환경)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 미들 웨어 설정
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json({limit: '50mb'} ));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// public 폴더를 정적 파일로 제공
// node_modules를 정적 파일로 제공
app.use("/node_modules", express.static(path.join(__dirname, "node_modules"))); 
app.use(express.static('public')); 

// 라우터 등록
import authRouter from './routes/auth-route.js';
import boxRouter from './routes/box.route.js';
import boardRouter from './routes/board-route.js';
app.use('/api', authRouter);
app.use('/api', boxRouter);
app.use('/api', boardRouter);

// 서버 실행
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
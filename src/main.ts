import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { DomainError } from "./domain/error/DomainError";
import { gameRouter } from "./presentation/gameRouter";
import { turnRouter } from "./presentation/turnRouter";
import { ApplicationError } from "./application/error/applicationError";
import basicAuth from 'express-basic-auth';
require('dotenv').config();


const PORT = 3000;

const app = express();

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`環境変数 ${key} が設定されていません。`);
  }
  return value;
}

// 環境変数を取得
const basicId = getEnvVariable('BASIC_ID');
const basicPassword = getEnvVariable('BASIC_PASSWORD');



// Basic認証の設定
const users = { 
  [basicId]: basicPassword 
};

app.use(basicAuth({
    users: users,
    challenge: true, 
    realm: 'REVERSI'
}));


app.use(morgan("dev"));
app.use(express.static("static", { extensions: ["html"] }));
app.use(express.json());

app.use(gameRouter);
app.use(turnRouter);

app.use(errorHandler);

app.listen(PORT, () => {});

interface ErrorResponseBody {
  type: string;
  message: string;
}

function errorHandler(
  err: any,
  _req: express.Request,
  res: express.Response<ErrorResponseBody>,
  _next: express.NextFunction
) {
  if (err instanceof DomainError) {
    res.status(400).json({
      type: err.type,
      message: err.message,
    });
    return;
  }

  if (err instanceof ApplicationError) {
    switch (err.type) {
      case "LatestGameNotFound":
        res.status(404).json({
          type: err.type,
          message: err.message,
        });
        return;
    }
  }

  console.error("Unexpected error occurred", err);
  res.status(500).json({
    type: "UnecpectedError",
    message: "Unexpected error occurred",
  });
}

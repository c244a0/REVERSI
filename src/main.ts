import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { DomainError } from "./domain/error/DomainError";
import { gameRouter } from "./presentation/gameRouter";
import { turnRouter } from "./presentation/turnRouter";
import { ApplicationError } from "./application/error/applicationError";
import basicAuth from 'express-basic-auth';

const PORT = 3000;

const app = express();



// Basic認証の設定
const users = { 'admin': 'demo' };

app.use(basicAuth({
    users: users,
    challenge: true, 
    realm: 'MyApplication'
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

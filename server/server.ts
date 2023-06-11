import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import calculatorRouter from './routes/calculatorRouter';
// import cors from "cors";

const app: Application = express();
dotenv.config();

const PORT: string = process.env.PORT!;

// app.use(cors({ origin: true }));
app.use(express.json());

app.use('/api', calculatorRouter)

// Urls that do not exist will hit this 
app.use('*', (req: Request, res: Response) => {
    res.status(404).json(`The url of ${req.originalUrl} does not exist`)
  });

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    let defaultErr = {
      log: "Express error handler caught unknown middleware error",
      status: 400,
      message: { err: "An error occurred" },
    };
    let errorObj = Object.assign(defaultErr, { message: { err: err.message } });
    res.status(errorObj.status).send(errorObj);
  });


app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})
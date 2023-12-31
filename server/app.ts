import express, { Application, NextFunction, Request, Response } from 'express';

import calculatorRouter from './routes/calculatorRouter';
// import cors from "cors";

const app: Application = express();


// app.use(cors({ origin: true }));
app.use(express.json());

// All api urls will be sent to the calculator router
app.use('/api', calculatorRouter)

// Urls that do not exist will hit this (/api/*)
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


export default app;
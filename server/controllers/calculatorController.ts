import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import expressionSchema from "../models/expressionModel";
import { Interface } from "readline";
const Parser = require('expr-eval').Parser;
dotenv.config();

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

const uri: string = process.env.URI!;

mongoose.connect(uri);

mongoose.connection.once('open', () => {
    console.log('Connected to Mongoose Succesfully')
});

interface Calculator {
    returnExpressions(req: Request, res: Response, next: NextFunction): Promise<void>;
    evaluateExpression(req: TypedRequestBody<{ expression: string, variables: object}>, res: Response, next: NextFunction): Promise<void>;

}

const calculatorController: Calculator = {
    //Request data from the backend
    async returnExpressions(req, res, next) {
        try {
            const dbData = await expressionSchema.find();
            res.locals.dbData = dbData;
            next();
            return;
        } catch(err) {
            console.error(err);
            next(err)
        }

    },

    //Save new expressions to the backend
    async evaluateExpression (req, res, next) {
        try {
            // The body will have a math expression and a variable key
            const { expression, variables } = req.body;
            if((typeof expression) !== 'string') throw new Error('The Expression is not a string');
            const result: number = Parser.evaluate(expression, variables);
            await expressionSchema.create({expression, variables, result})
            res.locals.result = result
            next()
            return;
        }
        catch(err) {
            console.error(err);
            // Sends the error to the error handler in server.js
            next(err);
        }

    }
}

export default calculatorController;
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import expressionSchema from "../models/expressionModel";
const Parser = require('expr-eval').Parser;
dotenv.config();

const uri: string = process.env.URI!;

mongoose.connect(uri);

mongoose.connection.once('open', () => {
    console.log('Connected to Mongoose Succesfully')
});

interface Calculator  {
    returnExpressions(req: Request, res: Response, next: NextFunction): void;
    evaluateExpression(req: Request, res: Response, next: NextFunction): void;
}

const calculatorController: Calculator = {
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
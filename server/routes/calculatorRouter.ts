import express, { Request, Response, Router } from "express";
import calculatorController from "../controllers/calculatorController";


const router: Router = express.Router();

//Errors are handled in the controller.

// Should get data from the database
router.get('/', calculatorController.returnExpressions, (req: Request, res: Response) => {
    const { dbData } = res.locals;
    res.json(dbData);
})

router.post('/calculate', calculatorController.evaluateExpression, (req: Request, res: Response) => {
    const { result } = res.locals
    res.status(200).json(result);
})

export default router;
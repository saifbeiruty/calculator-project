import mongoose from "mongoose";

const expressionSchema = new mongoose.Schema({
    expression: {type: String, required: true},
    variables: {type: Object},
    result: {type: Number}
})

export default mongoose.model('expressionDB', expressionSchema);
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    text: {
        type: "string",
        required: true
    },
    complete:{
        type: "boolean", 
        default: false
    },
    timeStamp:{
        type: 'Date',
        default: Date.now()
    }
});
const Todo = mongoose.model("Todo",toDoSchema);

export default Todo;
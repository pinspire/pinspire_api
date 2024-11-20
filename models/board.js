import { toJSON } from "@reis/mongoose-to-json";
import { Schema, model } from "mongoose";

const boardSchema = new Schema ({
    name: {type: String, required: true},
    // description:{type:String, required: true}
},{
    timestamps: true
});

boardSchema.plugin(toJSON);
export const BoardModel = model('Board',boardSchema);
import { toJSON } from "@reis/mongoose-to-json";
import { Schema, Types, model } from "mongoose";


const pinSchema = new Schema({
    title: {type: String, required:true},

    description: {type: String, required:true},

    image: {type: String, required: true},

    price: {type: String, required: true},

    category: {type: String, required: true},
    
    user: {type: Types.ObjectId, required: true, ref: 'User'}
},{
    timestamps: true
});

pinSchema.plugin(toJSON);

export const PinModel = model('Pin', pinSchema);
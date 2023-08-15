import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { productsCollection } from "../../../constants/index.js";

const productsSchema = new mongoose.Schema({
  num: {
    type:Number, 
    required:true
    }, 
  p_name: {
    type:String, 
    required:true
    }, 
  p_desc: {
    type:String, 
    required:true
    }, 
  c_name: {
    type:String, 
    required:true
    }, 
  c_desc: {
    type:String, 
    required:true
    }, 
  price: {
      type: String,
    required:true,
    },
  price_l: {
    type: String,
    required:true,
    },
  specification1: {
    type: String,
    required:true,
    },
  specification2: {
    type: String,
    required:true,
    },
  specification3: {
    type: String,
    required:true,
    },
  link: {
    type:String,
    required:true
    },
  img_1: {
    type:String,
    required:true
    },
  logos:{
    type:[Number],
    require:true
    }
});

//aplicacion de paginate al schema
productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection,productsSchema);
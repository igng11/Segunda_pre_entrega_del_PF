import { Router } from "express";
// import { ProductFS } from "../src/dao/managers/mongo/productsMongo.js";
import { uploader } from "../src/utils.js";

// const ProductFS = new ProductFS();
const products = [];
const router_fs = Router();

router_fs.get("/",(req,res)=>{
    res.render("fileSystem");
});


//post de fileSystem
router_fs.post("/",uploader.single("fileImage"), (req,res)=>{
    console.log("files", req.file);
    const newProduct = req.body;
    products.push(newProduct);
    res.json({status:"success","message":"producto creado"});
});

export { router_fs as routerFS }
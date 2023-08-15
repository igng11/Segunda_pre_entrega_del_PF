import { Router } from "express";
import { ProductManagerMongo } from "../src/dao/managers/mongo/productMgrMongo.js";
import { uploader } from "../src/utils.js";

const productService = new ProductManagerMongo();

const homeRouter = Router();

//esta ruta trae los productos que luego se renderizan en el fetch de /home.hbs
homeRouter.get("/",async(req,res)=>{
    try{
        const products = await productService.get();
        res.json({status:"success",data:products})
    }catch(error){
        console.log(error.message);
        res.json({status:"error",message:"Hubo un error al obtener los productos"});
    }
});

homeRouter.post("/",uploader.single("fileImage"), (req,res)=>{
    try{
        console.log("files", req.file);
        const productsCreated = productService.create(req.body); 
        res.json({status:"success",data:productsCreated});
    }catch(error){
        console.log(error.message);
        res.json({status:"error",message:"Hubo un error al crear producto"});
    }
});

homeRouter.delete("/:sid",async(req,res)=>{
    try{
        const productsId = req.params.sid;
        await productService.delete({_id:productsId}); 
        res.json({status:"success",message:"producto eliminado"});
    }catch(error){
        console.log(error.message);
        res.json({status:"error",message:"Hubo un error al eliminar el producto"});
    }
});

// Ruta para eliminar todos los productos
homeRouter.delete("/", async (req, res) => {
    try {
      const deletedProducts = await productService.deleteAll();
      res.json({
        status: "success",
        message: `Se han eliminado ${deletedProducts.deletedCount} productos`,
      });
    } catch (error) {
      console.log(error.message);
      res.json({ status: "error", message: "Hubo un error al eliminar los productos" });
    }
  });

export {homeRouter as productsRouter}
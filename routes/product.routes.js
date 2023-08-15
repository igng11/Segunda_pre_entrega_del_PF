import { Router } from "express";
// import ProductManager from "../dao/productManager.js";
import { productService, cartService } from "../src/dao/index.js";

const validateFields = (req,res,next)=>{
    const productInfo = req.body;
    if(!productInfo.p_name || !productInfo.p_desc || !productInfo.price){
        return res.json({status:"error",message:"campos incompletos"})
    }else{
        next();
    }
};


const router = Router();

// Ruta raíz GET /api/products/
// Lista todos los productos de la base
router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productService.get();
    if(limit){
        //devolver productos de acuerdo al limite
  } else {
    res.json({ status: "success", data: products });
  }
}catch (error){
    res.json({status:"error", message:error.message});
}
});

// Ruta GET /api/products/:pid
// Obtiene un producto por su ID
router.get("/:pid", (req, res) => {
//   const productId = parseInt(req.params.pid);
//   const product = productService.getProductById(productId);
//   if (product) {
//     res.json({ status: "success", data: product });
//   } else {
//     res.json({ status: "error", message: "Producto no encontrado" });
//   }
});

// Ruta PUT /api/products/:pid
// Actualiza un producto por su ID
router.post("/", validateFields, async (req, res) => {
    try {
        const productInfo = req.body;
        const productCreated = await productService.save(productInfo);
          res.json({ status: "success", data: productCreated, 
          message:"producto creado"});
    } catch (error){
        res.json({status:"error", message:error.message});
    }
  });
  
// Ruta DELETE /api/products/:pid
// Elimina un producto por su ID
router.put("/:pid",validateFields, (req, res) => {
    const productInfo = req.body;
    //actualiza el producto
  });

  router.delete("/:pid",validateFields, (req, res) => {});

export { router as productsRouters }; //aca se exporta la ruta a app.js

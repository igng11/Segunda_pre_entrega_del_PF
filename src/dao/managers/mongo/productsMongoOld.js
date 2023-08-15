// import mongoose from "mongoose";
import { productsModel } from "../models/products.model.js";

export class ProductMongo{
    constructor(){
        this.model = productsModel;
    };
    
    //get products
    async get(){
        try {
            const products = await this.model.find().lean();
            return products;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al obtener los productos");
        }
    }
    //get products
    async create(productInfo){
        try {
            const productCreated = await this.model.create(productInfo);
            return productCreated;
        } catch (error) {
            console.log(error.message);
            throw new Error("Hubo un error al crear el producto");
        }
    }
    
    
    async getById(id){
        //devuelve el producto que cumple con el id recibido
        try{
            const product = await this.model.findById(id);
            return product;
        }catch(error){
            console.log(error.message);
            // throw error
            throw new Error("Hubo un error al obtener el producto");
        }
    }
    //delete products
    async delete(productId) {
        try {
          const productToDelete = await this.model.findById(productId);
          if (!productToDelete) {
            throw new Error("Producto no encontrado");
          }
          const productDeleted = await this.model.deleteOne({ _id: productId });
          console.log(`Se ha eliminado el producto ${productId}`);
          return productToDelete;
        } catch (error) {
          console.log(error.message);
          throw new Error("Hubo un error al eliminar el producto");
        }
      }
      
      //delete all
      async deleteAll() {
        try {
          const deletedProducts = await this.model.deleteMany({});
          console.log(`Se han eliminado ${deletedProducts.deletedCount} productos`);
          return deletedProducts;
        } catch (error) {
          console.log(error.message);
          throw new Error("Hubo un error al eliminar todos los productos");
        }
      }

}
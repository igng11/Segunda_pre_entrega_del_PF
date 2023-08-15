import { productsModel } from "../models/products.model.js";

export class ProductManagerMongo {
  constructor() {
    this.model = productsModel;
  };

    async get() {
    try {
        const products = await this.model.find().lean(); //lean convierte el bison a json
        // console.log(products);
        return products;
    } catch (error) {
        throw error;
    }};

    async getWithPaginate(query, options){
        try {
            const result = await this.model.paginate(query, options);
            console.log("result: ",result);
            return result;
        } catch (error) {
            throw error;
        }
    }

    // Consultar un producto por ID
    getById(id) {
    };

    // Guardar productos en el archivo
    async save(product) {
        try {
            const productCreated = await this.model.create(product);
            return productCreated;
        } catch (error) {
            throw error;
        }
    }};


// module.exports = ProductManager;
export default ProductManagerMongo;
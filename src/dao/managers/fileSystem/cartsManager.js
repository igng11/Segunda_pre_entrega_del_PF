import { __dirname } from "../../../utils.js";
import path from "path";
import fs from 'fs';

export class CartsManager {
  constructor(fileName) {
    this.path = path.join(__dirname,`/files${fileName}`);
    this.products = []; 
    this.loadProducts();
    this.lastId = this.getLastId();
  }

  // Cargar productos desde el archivo
  loadProducts() {
    try {
      const fileData = fs.readFileSync(this.filePath, 'utf-8');
      this.products = JSON.parse(fileData);
    } catch (error) {
      this.products = [];
    }
  }

  // Guardar productos en el archivo
  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf-8');
  }

  // Obtener el último ID utilizado
  getLastId() {
    if (this.products.length === 0) {
      return 0;
    }
    const lastProduct = this.products[this.products.length - 1];
    return lastProduct.id;
  }

  // Agregar un nuevo producto
  addProduct(product) {
    const newProduct = {
      id: this.lastId + 1,
      ...product,
    };
    this.products.push(newProduct);
    this.lastId++;
    this.saveProducts();
    return newProduct;
  }

  // Obtener todos los productos
  getProducts() {
    return this.products;
  }

  // Consultar un producto por ID
  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  // Actualizar un producto por ID
  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
        id,
      };
      this.saveProducts();
      return this.products[productIndex];
    }
    return null;
  }

  // Eliminar un producto por ID
  deleteProduct(id) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const deletedProduct = this.products[productIndex];
      this.products.splice(productIndex, 1);
      this.saveProducts();
      return deletedProduct;
    }
    return null;
  }
}

// module.exports = ProductManager;
export default CartsManager;

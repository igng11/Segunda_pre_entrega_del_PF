import { __dirname } from "../../../utils.js";
import path from "path";
import fs from 'fs';

class ProductManager {
  constructor(fileName) {
    this.path = path.join(__dirname, 'files', fileName);
    this.products = [];
    this.lastId = 0; // Inicializar el último ID como 0
  
    // Llamar a loadProducts() dentro del constructor usando async/await
    (async () => {
      try {
        this.products = await this.get();
        this.lastId = this.getLastId();
        // console.log(this.path);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    })();
  }

  async fileExists() {
    try {
      await fs.promises.access(this.path, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }
  
async get() {
  try {
    if (this.fileExists()) {
      const content = await fs.promises.readFile(this.path, "utf-8");
      // console.log("Contenido del archivo:", content);
      const products = JSON.parse(content);
      return products;
    } else {
      throw new Error("No es posible obtener los productos");
    }
  } catch (error) {
    throw error;
  }
}


  // Cargar productos desde el archivo
  async loadProducts() {
    try {
      this.products = await this.get(); // Esperar a que se resuelva la promesa
    } catch (error) {
      this.products = [];
    }
  }
  
  
  // Guardar productos en el archivo
  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
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
// Dentro de la clase ProductManager

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
export default ProductManager;

import { cartsModel } from "../models/carts.model.js";

export class CartsManagerMongo {
  constructor() {
    this.model = cartsModel;
  };

  // Agregar un producto al carrito
  async addProductToCart(cartId, productId) {
    try {
      const cart = await this.model.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Agregar el ID del producto al arreglo de productos del carrito
      cart.products.push(productId);

      // Guardar los cambios en el carrito
      await cart.save();

      console.log("ID del producto agregado al carrito:", productId);
      console.log("Carrito actualizado:", cart);

      return cart;
    } catch (error) {
        console.log("Error al obtener el carrito por ID:", error);
      throw error;
    }
  }

  
async getCartById(cartId) {
    try {
      const cart = await this.model.findById(cartId).populate("products", "p_name price"); // campos a obtener de los productos
      return cart;
    } catch (error) {
      throw error;
    }
  }

  // Obtener todos los carts
    async getAll() {
        try {
            const carts = await this.model.find();
            return carts;
        } catch (error) {
            throw error;
        }
    }

    async save(){
        try {
            const cartCreated = await this.model.create({});
            return cartCreated;
        } catch (error) {
            throw error;
        }
    };
}

export default CartsManagerMongo;

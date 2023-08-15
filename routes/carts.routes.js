import { Router } from "express";
import { cartService, productService } from "../src/dao/index.js";
// import { cartService } from "../src/dao/index.js";

const router = Router();

// Ruta raíz POST /api/carts/
// Crea un nuevo carrito
router.post("/", (req, res) => {
  const newCart = cartService.save();
  res.json({ status: "success", data: newCart });
});

// Ruta GET /carts/:cid
// Lista los productos que pertenecen al carrito con el cid proporcionado
router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  // console.log(cartId);
  const cart = await cartService.getCartById(cartId);

  if (cart) {
      res.json({ status: "success", data: cart.products });
  } else {
      res.json({ status: "error", message: "Carrito no encontrado" });
  }
});

// Ruta POST /api/carts/:cid/product/:pid
// Agrega el producto al carrito seleccionado
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid);
  // console.log(req.params.cid);
  // console.log(req.params.pid);
  // const quantity = parseInt(req.body.quantity);

  try {
    //obtener el producto
      const product = cartService.addProductToCart(productId);
      //corroborar si existe
      if (!product) {
          return res.json({ status: "error", message: "Producto no encontrado" });
      }

      const cart = cartService.getCartById(cartId);
      if (!cart) {
          return res.json({ status: "error", message: "Carrito no encontrado" });
      };

      // Agrega la referencia del producto al array de productos del carrito
      cart.products.push(product._id);
      console.log(cart.products);
      // Guarda el carrito actualizado en la base de datos
      await cart.save();

      return res.json({ status: "success", message: "Producto agregado al carrito en DB" });

    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      throw new Error("Error al agregar el producto al carrito en DB: " + error.message);
      // No es necesario enviar la respuesta aquí, ya que ya lanzaste un error
  }});

export { router as cartsRouters }

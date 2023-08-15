import { config } from "../config/config.js";
import ProductManager from "./managers/fileSystem/productsManager.js";
import {CartsManager} from "./managers/fileSystem/cartsManager.js";
import {ProductManagerMongo} from "./managers/mongo/productMgrMongo.js"
import {CartsManagerMongo} from "./managers/mongo/cartsMgrMongo.js";

const productService = new ProductManagerMongo();
const cartService = new CartsManagerMongo();

export {productService,cartService};

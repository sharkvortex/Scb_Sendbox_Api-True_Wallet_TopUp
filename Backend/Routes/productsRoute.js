
import { hotProducts, Products ,AllCategory } from "../Controllers/productsControllers.js";
const productsRoutes = async (fastify, options) => {
    fastify.get('/api/hot-products', hotProducts);
    fastify.get('/api/products', Products);
    fastify.get('/api/category', AllCategory);

}

export default productsRoutes;
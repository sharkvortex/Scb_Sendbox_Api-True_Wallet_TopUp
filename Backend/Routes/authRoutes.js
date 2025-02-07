import {Register , Login , isLogin , Logout} from "../Controllers/authControllers.js";

const authRoutes = async (fastify, options) => {
    fastify.post('/api/register', Register);
    fastify.post('/api/login', Login); 
    fastify.post('/api/isLogin', isLogin); 
    fastify.post('/api/logout', Logout); 
}
export default authRoutes;
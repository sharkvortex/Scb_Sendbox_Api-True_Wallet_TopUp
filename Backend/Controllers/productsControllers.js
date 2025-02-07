import pool from "../lib/db.js";

export const AllCategory = async (request, reply)=>{
  try{
    const [rows] = await pool.query("SELECT * FROM categories");
    if (rows.length > 0) {
      return reply.send({
        success: true,
        category: rows,
      });
    } else {
      return reply.send({
        success: false,
        message: "ไม่มีหมวดหมู่",
      });
    }
  }catch(error){
    console.error(error);
    return reply.status(500).send({
      success: false,
      message: "เกิดข้อผิดพลาดของเซิร์ฟเวอร์",
    });
  }
}
export const hotProducts = async (request, reply) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM products WHERE hot = 1 ORDER BY discount DESC LIMIT 8"
    );

    if (rows.length > 0) {
      return reply.send({
        success: true,
        products: rows,
      });
    } else {
      return reply.send({
        success: false,
        message: "ไม่มีสินค้ายอดนิยม",
      });
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    return reply.status(500).send({
      success: false,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูล",
    });
  }
};

export const Products = async (request, reply) => {
  const { search, category } = request.query;

  try {
    let query = "SELECT * FROM products";
    let queryParams = [];

    if (search) {
      query += " WHERE name LIKE ?";
      queryParams.push(`%${search}%`);
    }

    if (category && category !== "") {
      query += search ? " AND category_id = ?" : " WHERE category_id = ?";
      queryParams.push(category);
    }
    
    const [rows] = await pool.query(query, queryParams);

    if (rows.length > 0) {
      return reply.send({
        products: rows,
      });
    } else {
      return reply.send({
        success: false,
        message: "ยังไม่มีสินค้า",
      });
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาด:", error);
    return reply.status(500).send({
      success: false,
      message: "เกิดข้อผิดพลาดในการดึงข้อมูล",
    });
  }
};


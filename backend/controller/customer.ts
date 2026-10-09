import express from "express";
import { conn } from "../dbconnect"; 
import { Customer } from "../model/customer"; 

export const router = express.Router();

// 1. API ดึงรายชื่อลูกค้าทั้งหมด (GET)
router.get("/", async (req, res) => {
  try {
    const [rows] = await conn.query("SELECT * FROM customers");
    let customers = rows as Customer[];
    res.status(200).json(customers);
  } catch (error) {
    console.error("Database Error:", error); 
    if (error instanceof Error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(500).json({ error: "เกิดข้อผิดพลาดที่ไม่รู้จัก" });
    }
  }
});

// 2. API เพิ่มข้อมูลลูกค้าใหม่ (POST)
router.post("/", async (req, res) => {
  try {
    // รับข้อมูลจากที่ Angular (หรือ Bruno) ส่งมา
    let customer: Customer = req.body; 
    
    let sql = "INSERT INTO `customers`(`name`, `phone`, `lat`, `lng`) VALUES (?,?,?,?)";
      
    const [result] = await conn.query(sql, [
      customer.name,
      customer.phone,
      customer.lat,
      customer.lng
    ]);
    
    const insertResult = result as any;
    
    // ตอบกลับไปว่าสร้างสำเร็จ (201 Created) พร้อมส่ง ID ใหม่กลับไป
    res.status(201).json({
      message: "เพิ่มลูกค้าใหม่เรียบร้อยแล้ว!",
      customer_id: insertResult.insertId 
    });
  } catch (error) {
    console.error("Insert Error:", error);
    res.status(500).json({ error: "บันทึกข้อมูลลูกค้าไม่สำเร็จ" });
  }
});
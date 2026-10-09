import { createPool } from 'mysql2/promise';

export const conn = createPool({
    connectionLimit: 10,
    host: 'localhost', // หรือ IP ของ Server ฐานข้อมูล
    port: 3306,
    user: 'root', // เปลี่ยนเป็น username ฐานข้อมูลของคุณโน้ต
    password: '', // เปลี่ยนเป็นรหัสผ่านของคุณ
    database: 'delivery_db' // เปลี่ยนเป็นชื่อฐานข้อมูลที่สร้างไว้สำหรับโปรเจกต์นี้
});
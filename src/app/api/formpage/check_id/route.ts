import mysql from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const patient_id = searchParams.get("patient_id");

  if (!patient_id) {
    return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    const query = `
      SELECT patient_id, patient_name, patienttype_name
      FROM patient  
      JOIN patient_type ON patient.patienttype_id = patient_type.patienttype_id
      WHERE patient_id = ?
    `;
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(query, [String(patient_id)]);
    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    const { patient_id: id, patient_name, patienttype_name } = rows[0];
    return NextResponse.json({
      exists: true,
      student_id: id,
      patient_name,
      role: patienttype_name,
    }, { status: 200 });
  } catch (err) {
    console.error("Error checking student ID:", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
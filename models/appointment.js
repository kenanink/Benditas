const db = require("../db/connection");

const Appointment = {
  async create({ user_id, service_id, appointment_date, appointment_time, status }) {
    const [result] = await db.query(
      "INSERT INTO appointments (user_id, service_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?)",
      [user_id, service_id, appointment_date, appointment_time, status]
    );
    return result.insertId;
  },

  findAll: async (user) => {
    if (user.role === "admin") {
      const [rows] = await db.execute(
        `SELECT a.id, u.name AS user, s.name AS service, a.appointment_date, a.status
         FROM appointments a
         JOIN users u ON a.user_id = u.id
         JOIN services s ON a.service_id = s.id
         ORDER BY a.appointment_date DESC`
      );
      return rows;
    } else {
      const [rows] = await db.execute(
        `SELECT a.id, s.name AS service, a.appointment_date, a.status
         FROM appointments a
         JOIN services s ON a.service_id = s.id
         WHERE a.user_id = ?
         ORDER BY a.appointment_date DESC`,
        [user.id]
      );
      return rows;
    }
  },

  updateStatus: async (id, status) => {
    const [result] = await db.execute(
      "UPDATE appointments SET status = ? WHERE id = ?",
      [status, id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = Appointment;

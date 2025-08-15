import { client } from "../db/db";

interface IAppointmentSlot {
  id_appointment_slot?: string;
  id_practitioner: string;
  id_availability: string;
  id_appointment_type: string;
  date: string;
  hour: string;
  status: string;
}

interface IAppointmentSlotMapper {
  findAll(): Promise<IAppointmentSlot[]>;
  findByIdAppointmentSlot(id_appointment_slot: IAppointmentSlot["id_appointment_slot"]): Promise<IAppointmentSlot>;
  findByIdPractitioner(id_practitioner: IAppointmentSlot["id_practitioner"]): Promise<IAppointmentSlot[]>;
  createAppointmentSlot(data: IAppointmentSlot): Promise<IAppointmentSlot>;
  updateAppointmentSlot(data: IAppointmentSlot): Promise<IAppointmentSlot>;
  deleteAppointmentSlot(id_appointment_slot: IAppointmentSlot["id_appointment_slot"]): Promise<IAppointmentSlot>;
}

const appointmentSlotMapper: IAppointmentSlotMapper = {
  async findAll() {
    const preparedQuery = {
      text: `SELECT id_appointment_slot, id_practitioner, id_availability, id_appointment_type, date, hour, status
                FROM appointment_slots`,
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  },
  async findByIdAppointmentSlot(id_appointment_slot) {
    const preparedQuery = {
      text: `SELECT id_appointment_slot, id_practitioner, id_availability, id_appointment_type, date, hour, status
                FROM appointment_slots
                WHERE id_appointment_slot = $1`,
      values: [id_appointment_slot],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async findByIdPractitioner(id_practitioner) {
    const preparedQuery = {
      text: `SELECT id_appointment_slot, id_practitioner, id_availability, id_appointment_type, date, hour, status
                FROM appointment_slots
                WHERE id_practitioner = $1`,
      values: [id_practitioner],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  },
  async createAppointmentSlot(data) {
    const { id_practitioner, id_availability, id_appointment_type, date, hour, status } = data;
    const preparedQuery = {
      text: `INSERT INTO appointment_slots (id_practitioner, id_availability, id_appointment_type, date, hour, status)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id_appointment_slot, id_practitioner, id_availability, id_appointment_type, date, hour, status`,
      values: [id_practitioner, id_availability, id_appointment_type, date, hour, status],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async updateAppointmentSlot(data) {
    const { id_appointment_slot, id_practitioner, id_availability, id_appointment_type, date, hour, status } = data;
    const preparedQuery = {
      text: `UPDATE appointment_slots SET id_availability = $3, id_appointment_type = $4, date = $5, hour = $6, status = $7
                WHERE id_appointment_slot = $1 AND id_practitioner = $2
                RETURNING id_appointment_slot, id_practitioner, id_availability, id_appointment_type, date, hour, status`,
      values: [id_appointment_slot, id_practitioner, id_availability, id_appointment_type, date, hour, status],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async deleteAppointmentSlot(id_appointment_slot) {
    const preparedQuery = {
      text: `DELETE FROM appointment_slots
                WHERE id_appointment_slot = $1
                RETURNING id_appointment_slot, id_practitioner, id_availability, id_appointment_type, date, hour, status`,
      values: [id_appointment_slot],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
};

export { appointmentSlotMapper };

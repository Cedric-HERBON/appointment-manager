import { client } from "../db/db";

interface IAppointment {
  id_appointment?: string;
  id_patient: string;
  id_appointment_slot: string;
  status: string;
}

interface IAppointmentMapper {
  findAll(): Promise<IAppointment[]>;
  findByIdAppointment(id_appointment: IAppointment["id_appointment"]): Promise<IAppointment>;
  findByIdPatient(id_patient: IAppointment["id_patient"]): Promise<IAppointment[]>;
  createAppointment(data: IAppointment): Promise<IAppointment>;
  updateAppointment(data: IAppointment): Promise<IAppointment>;
  deleteAppointment(id_appointment: IAppointment["id_appointment"]): Promise<IAppointment>;
}

const appointmentMapper: IAppointmentMapper = {
  async findAll() {
    const preparedQuery = {
      text: `SELECT id_appointment, id_patient, id_appointment_slot, status, created_at, updated_at
                FROM appointments`,
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  },
  async findByIdAppointment(id_appointment) {
    const preparedQuery = {
      text: `SELECT id_appointment, id_patient, id_appointment_slot, status, created_at, updated_at
                FROM appointments
                WHERE id_appointment = $1`,
      values: [id_appointment],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async findByIdPatient(id_patient) {
    const preparedQuery = {
      text: `SELECT id_appointment, id_patient, id_appointment_slot, status, created_at, updated_at
                FROM appointments
                WHERE id_patient = $1`,
      values: [id_patient],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  },
  async createAppointment(data) {
    const { id_patient, id_appointment_slot, status } = data;
    const preparedQuery = {
      text: `INSERT INTO appointments (id_patient, id_appointment_slot, status)
                VALUES ($1, $2, $3)
                RETURNING id_appointment, id_patient, id_appointment_slot, status, created_at, updated_at`,
      values: [id_patient, id_appointment_slot, status],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async updateAppointment(data) {
    const { id_appointment, id_patient, id_appointment_slot, status } = data;
    const preparedQuery = {
      text: `UPDATE appointments SET type = $3, duration = $4
                WHERE id_patient = $1 AND id_appointment = $2
                RETURNING id_appointment, id_patient, id_appointment_slot, status, created_at, updated_at`,
      values: [id_patient, id_appointment, id_appointment_slot, status],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async deleteAppointment(id_appointment) {
    const preparedQuery = {
      text: `DELETE FROM appointments
                WHERE id_appointment = $1
                RETURNING id_appointment, id_patient, id_appointment_slot, status, created_at, updated_at`,
      values: [id_appointment],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
};

export { appointmentMapper };

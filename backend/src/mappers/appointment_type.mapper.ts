import { client } from "../db/db";

interface IAppointmentType {
  id_appointment_type?: string;
  id_practitioner: string;
  type: string;
  duration: number;
}

interface IAppointmentTypeMapper {
  findAll(): Promise<IAppointmentType[]>;
  findByIdAppointmentType(id_appointment_type: IAppointmentType["id_appointment_type"]): Promise<IAppointmentType>;
  findByIdPractitioner(id_practitioner: IAppointmentType["id_practitioner"]): Promise<IAppointmentType[]>;
  findByIdAppointmentTypeAndPractitionner(id_appointment_type: string, id_practitioner: string): Promise<IAppointmentType>;
  createAppointmentType(data: IAppointmentType): Promise<IAppointmentType>;
  updateAppointmentType(data: IAppointmentType): Promise<IAppointmentType>;
  deleteAppointmentType(id_appointment_type: IAppointmentType["id_appointment_type"]): Promise<IAppointmentType>;
}

const appointmentTypeMapper: IAppointmentTypeMapper = {
  async findAll() {
    const preparedQuery = {
      text: `SELECT id_appointment_type, id_practitioner, type, duration, created_at, updated_at
                FROM appointment_types`,
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  },
  async findByIdAppointmentType(id_appointment_type) {
    const preparedQuery = {
      text: `SELECT id_appointment_type, id_practitioner, type, duration, created_at, updated_at
                FROM appointment_types
                WHERE id_appointment_type = $1`,
      values: [id_appointment_type],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async findByIdPractitioner(id_practitioner) {
    const preparedQuery = {
      text: `SELECT id_appointment_type, id_practitioner, type, duration, created_at, updated_at
                FROM appointment_types
                WHERE id_practitioner = $1`,
      values: [id_practitioner],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  },
  async findByIdAppointmentTypeAndPractitionner(id_appointment_type, id_practitioner) {
    const preparedQuery = {
      text: `SELECT id_appointment_type, id_practitioner, type, duration, created_at, updated_at
                FROM appointment_types
                WHERE id_appointment_type = $1 AND id_practitioner = $2`,
      values: [id_appointment_type, id_practitioner],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async createAppointmentType(data) {
    const { id_practitioner, type, duration } = data;
    const preparedQuery = {
      text: `INSERT INTO appointment_types (id_practitioner, type, duration)
                VALUES ($1, $2, $3)
                RETURNING id_appointment_type, id_practitioner, type, duration, created_at, updated_at`,
      values: [id_practitioner, type, duration],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async updateAppointmentType(data) {
    const { type, duration, id_practitioner, id_appointment_type } = data;
    const preparedQuery = {
      text: `UPDATE appointment_types SET type = $3, duration = $4
                WHERE id_practitioner = $1 AND id_appointment_type = $2
                RETURNING id_appointment_type, id_practitioner, type, duration, created_at, updated_at`,
      values: [id_practitioner, id_appointment_type, type, duration],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async deleteAppointmentType(id_appointment_type) {
    const preparedQuery = {
      text: `DELETE FROM appointment_types
                WHERE id_appointment_type = $1
                RETURNING id_appointment_type, id_practitioner, type, duration, created_at, updated_at`,
      values: [id_appointment_type],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
};

export { appointmentTypeMapper };

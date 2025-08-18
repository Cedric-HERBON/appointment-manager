import { client } from "../db/db";

interface IAvailability {
  id_availability?: string;
  id_practitioner: string;
  date: string;
  start_time: string;
  end_time: string;
}

interface IAvailabilityMapper {
  findAll(): Promise<IAvailability[]>;
  findByIdAvalability(id_availability: IAvailability["id_availability"]): Promise<IAvailability | null>;
  findByIdPractitioner(id_practitioner: IAvailability["id_practitioner"]): Promise<IAvailability[]>;
  createAvailability(data: IAvailability): Promise<IAvailability>;
  updateAvailability(data: IAvailability): Promise<IAvailability>;
  deleteAvailability(id_availability: IAvailability["id_availability"]): Promise<IAvailability | null>;
}

const availabilityMapper: IAvailabilityMapper = {
  async findAll() {
    const preparedQuery = {
      text: `SELECT id_availability, id_practitioner, date, start_time, end_time
                FROM availabilities`,
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  },
  async findByIdAvalability(id_availability) {
    const preparedQuery = {
      text: `SELECT id_availability, id_practitioner, date, start_time, end_time
                FROM availabilities
                WHERE id_availability = $1`,
      values: [id_availability],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async findByIdPractitioner(id_practitioner) {
    const preparedQuery = {
      text: `SELECT id_availability, id_practitioner, date, start_time, end_time
                FROM availabilities
                WHERE id_practitioner = $1`,
      values: [id_practitioner],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async createAvailability(data) {
    const { id_practitioner, date, start_time, end_time } = data;
    const preparedQuery = {
      text: `INSERT INTO availabilities (id_practitioner, date, start_time, end_time)
                VALUES($1, $2, $3, $4)
                RETURNING id_availability, id_practitioner, date, start_time, end_time`,
      values: [id_practitioner, date, start_time, end_time],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async updateAvailability(data) {
    const { id_availability, id_practitioner, date, start_time, end_time } = data;
    const preparedQuery = {
      text: `UPDATE availabilities
                SET date = $3, start_time = $4, end_time = $5
                WHERE id_availability = $1 AND id_practitioner = $2
                RETURNING id_availability, id_practitioner, date, start_time, end_time`,
      values: [id_availability, id_practitioner, date, start_time, end_time],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async deleteAvailability(id_availability) {
    const preparedQuery = {
      text: `DELETE FROM avalabilities
                WHERE id_availability = $1
                RETURNING id_availability, id_practitioner, date, start_time, end_time`,
      values: [id_availability],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
};

export { availabilityMapper };

import { client } from "../db/db";

interface IPatient {
  id_patient?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: Date;
  adress?: string;
  phone?: string;
}

interface IPatientMapper {
  findAll(): Promise<IPatient[]>;
  findByIdPatient(id_patient: IPatient["id_patient"]): Promise<IPatient>;
  findByEmail(email: IPatient["email"]): Promise<IPatient>;
  createPatient(data: IPatient): Promise<IPatient>;
  updatePatient(data: IPatient): Promise<IPatient>;
  deletePatient(id_patient: IPatient["id_patient"]): Promise<IPatient>;
}

const patientMapper: IPatientMapper = {
  async findAll() {
    const preparedQuery = {
      text: `SELECT id_patient, firstname, lastname, email, birthdate, adress, phone, created_at, updated_at
                FROM patients`,
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  },
  async findByIdPatient(id_patient) {
    const preparedQuery = {
      text: `SELECT id_patient, firstname, lastname, email, birthdate, adress, phone, created_at, updated_at
                FROM patients
                WHERE id_patient = $1`,
      values: [id_patient],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async findByEmail(email) {
    const preparedQuery = {
      text: `SELECT id_patient, firstname, lastname, email, birthdate, adress, phone, created_at, updated_at
                FROM patients
                WHERE email = $1`,
      values: [email],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async createPatient(data) {
    const { firstname, lastname, email, password, birthdate, adress, phone } = data;
    const preparedQuery = {
      text: `INSERT INTO patients (firstname, lastname, email, password, birthdate, adress, phone)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id_patient, firstname, lastname, email, password, birthdate, adress, phone`,
      values: [firstname, lastname, email, password, birthdate, adress, phone],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async updatePatient(data) {
    const { id_patient, firstname, lastname, email, password, birthdate, adress, phone } = data;
    const preparedQuery = {
      text: `UPDATE patients 
                SET firstname = $2, lastname = $3, email = $4, password = $5, birthdate = $6, adress = $7, phone = $8
                WHERE id_patient = $1
                RETURNING id_patient, firstname, lastname, email, password, birthdate, adress, phone`,
      values: [id_patient, firstname, lastname, email, password, birthdate, adress, phone],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async deletePatient(id_patient) {
    const preparedQuery = {
      text: `DELETE FROM patients
            WHERE id_patient = $1
            RETURNING id_patient, firstname, lastname, email, password, birthdate, adress, phone`,
      values: [id_patient],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
};

export { patientMapper };

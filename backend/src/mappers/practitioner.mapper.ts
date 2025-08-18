import { client } from "../db/db";

interface IPractitioner {
  id_practitioner?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  birthdate: string;
  adress?: string;
  phone?: string;
  speciality?: string;
}

interface IPractitionerMapper {
  findAll(): Promise<IPractitioner[]>;
  findByIdPractitioner(id_practitioner: IPractitioner["id_practitioner"]): Promise<IPractitioner>;
  findByEmail(email: IPractitioner["email"]): Promise<IPractitioner>;
  createPractitioner(data: IPractitioner): Promise<IPractitioner>;
  updatePractitioner(data: IPractitioner): Promise<IPractitioner>;
  deletePractitioner(id_practitioner: IPractitioner["id_practitioner"]): Promise<IPractitioner>;
}

const practitionerMapper: IPractitionerMapper = {
  async findAll() {
    const preparedQuery = {
      text: `SELECT id_practitioner, firstname, lastname, email, birthdate, adress, phone, speciality, created_at, updated_at
                FROM practitioners`,
    };
    const result = await client.query(preparedQuery);

    return result.rows;
  },
  async findByIdPractitioner(id_practitioner) {
    const preparedQuery = {
      text: `SELECT id_practitioner, firstname, lastname, email, birthdate, adress, phone, speciality, created_at, updated_at
                FROM practitioners
                WHERE id_practitioner = $1`,
      values: [id_practitioner],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async findByEmail(email) {
    const preparedQuery = {
      text: `SELECT id_practitioner, firstname, lastname, email, birthdate, adress, phone, speciality, created_at, updated_at
                FROM practitioners
                WHERE email = $1`,
      values: [email],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async createPractitioner(data) {
    const { firstname, lastname, email, password, birthdate, adress, phone, speciality } = data;

    const preparedQuery = {
      text: `INSERT INTO practitioners (firstname, lastname, email, password, birthdate, adress, phone, speciality)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id_practitioner, firstname, lastname, email, password, birthdate, adress, phone, speciality`,
      values: [firstname, lastname, email, password, birthdate, adress, phone, speciality],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async updatePractitioner(data) {
    const { id_practitioner, firstname, lastname, email, password, birthdate, adress, phone, speciality } = data;

    const preparedQuery = {
      text: `UPDATE practitioners 
                SET firstname = $2, lastname = $3, email = $4, password = $5, birthdate = $6, adress = $7, phone = $8, speciality = $9
                WHERE id_practitioner = $1
                RETURNING id_practitioner, firstname, lastname, email, password, birthdate, adress, phone, speciality`,
      values: [id_practitioner, firstname, lastname, email, password, birthdate, adress, phone, speciality],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
  async deletePractitioner(id_practitioner) {
    const preparedQuery = {
      text: `DELETE FROM practitioners
            WHERE id_practitioner = $1
            RETURNING id_practitioner, firstname, lastname, email, password, birthdate, adress, phone, speciality`,
      values: [id_practitioner],
    };
    const result = await client.query(preparedQuery);
    return result.rows[0];
  },
};

export { practitionerMapper };

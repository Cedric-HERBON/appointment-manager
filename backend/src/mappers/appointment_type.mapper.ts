import { client } from "../db/db";

interface IAppointmentType {
    id_appointment_type? : string;
    id_practitioner : string;
    type : string;
    duration : number;
    created_at? : Date;
    updated_at? : Date;
};

interface IAppointmentTypeMapper {
    findAll(): Promise<IAppointmentType[]>;
    findByIdAppointmentType(id_appointment_type : string): Promise<IAppointmentType>;
    findByIdPractitioner(id_practitioner : string): Promise<IAppointmentType[]>;
    findByIdAppointmentTypeAndPractitionner(id_appointment_type: string, id_practitioner : string): Promise<IAppointmentType>;
    createAppointmentType(id_practitioner: string, type: string, duration: number): Promise<IAppointmentType>;
    updateAppointmentType(type: string, duration: number, id_practitioner: string, id_appointment_type: string): Promise<IAppointmentType>;
    deleteAppointmentType(id_appointment_type: string): Promise<IAppointmentType>;
};

const appointmentTypeMapper : IAppointmentTypeMapper = {
    async findAll() {
        const preparedQuery = {
            text : `SELECT id_appointment_type, id_practitioner, type, duration, created_at, updated_at
                FROM appointment_types`,
        };
        const result = await client.query(preparedQuery);
        return result.rows;
    },
    async findByIdAppointmentType(id_appointment_type) {
        const preparedQuery = {
            text : `SELECT id_appointment_type, id_practitioner, type, duration, created_at, updated_at
                FROM appointment_types
                WHERE id_appointment_type = $1`,
            values : [id_appointment_type],
        };
        const result = await client.query(preparedQuery);
        return result.rows[0];
    },
    async findByIdPractitioner(id_practitioner) {
        const preparedQuery = {
            text : `SELECT id_appointment_type, id_practitioner, type, duration, created_at, updated_at
                FROM appointment_types
                WHERE id_practitioner = $1`,
            values : [id_practitioner],
        };
        const result = await client.query(preparedQuery);
        return result.rows;
    },
    async findByIdAppointmentTypeAndPractitionner(id_appointment_type, id_practitioner) {
        const preparedQuery = {
            text : `SELECT id_appointment_type, id_practitioner, type, duration, created_at, updated_at
                FROM appointment_types
                WHERE id_appointment_type = $1 AND id_practitioner = $2`,
            values: [id_appointment_type, id_practitioner],
        };
        const result = await client.query(preparedQuery);
        return result.rows[0];
    },
    async createAppointmentType(id_practitioner, type, duration) {
        const preparedQuery = {
            text : `INSERT INTO appointment_types (id_practitioner, type, duration)
                VALUES ($1, $2, $3)
                RETURNING id_appointment_type, id_practitioner, type, duration, created_at, updated_at`,
            values : [id_practitioner, type, duration],
        };
        const result = await client.query(preparedQuery);
        return result.rows[0];
    },
    async updateAppointmentType(type, duration, id_practitioner, id_appointment_type) {
        const preparedQuery = {
            text : `UPDATE appointment_types SET type = $1, duration = $2
                WHERE id_practitioner = $3 AND id_appointment_type = $4
                RETURNING id_appointment_type, id_practitioner, type, duration, created_at, updated_at`,
            values : [id_practitioner, type, duration, id_appointment_type],
        };
        const result = await client.query(preparedQuery);
        return result.rows[0];
    },
    async deleteAppointmentType(id_appointment_type) {
        const preparedQuery = {
            text : `DELETE FROM appointment_types
                WHERE id_appointment_type = $1
                RETURNING id_appointment_type, id_practitioner, type, duration, created_at, updated_at`,
            values : [id_appointment_type],
        };
        const result = await client.query(preparedQuery);
        return result.rows[0];
    },
};

export { appointmentTypeMapper };

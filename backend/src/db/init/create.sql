BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS appointment_slots;
DROP TABLE IF EXISTS appointment_types;
DROP TABLE IF EXISTS availabilities;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS practitioners;


CREATE TABLE patients (
    id_patient UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    birthdate DATE NOT NULL,
    address TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE practitioners (
    id_practitioner UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    birthdate DATE NOT NULL,
    address TEXT,
    phone TEXT,
    speciality TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE availabilities (
    id_availability UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    id_practitioner UUID NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_availability_practitioner FOREIGN KEY (id_practitioner) REFERENCES practitioners(id_practitioner)
);

CREATE TABLE appointment_types (
    id_appointment_type UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    id_practitioner UUID NOT NULL,
    type TEXT NOT NULL,
    duration INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_appointment_type_practitioner FOREIGN KEY (id_practitioner) REFERENCES practitioners(id_practitioner)
);

CREATE TABLE appointment_slots (
    id_appointment_slot UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    id_practitioner UUID NOT NULL,
    id_availability UUID NOT NULL,
    id_appointment_type UUID NOT NULL,
    date DATE NOT NULL,
    hour TIME NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_appointment_slot_practitioner FOREIGN KEY (id_practitioner) REFERENCES practitioners(id_practitioner),
    CONSTRAINT fk_appointment_slot_availability FOREIGN KEY (id_availability) REFERENCES availabilities(id_availability),
    CONSTRAINT fk_appointment_slot_appointment_type FOREIGN KEY (id_appointment_type) REFERENCES appointment_types(id_appointment_type)
);

CREATE TABLE appointments (
    id_appointments UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    id_patient UUID NOT NULL,
    id_appointment_slot UUID NOT NULL,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_appointments_patient FOREIGN KEY (id_patient) REFERENCES patients(id_patient),
    CONSTRAINT fk_appointments_appointment_slot FOREIGN KEY (id_appointment_slot) REFERENCES appointment_slots(id_appointment_slot)
);

COMMIT;

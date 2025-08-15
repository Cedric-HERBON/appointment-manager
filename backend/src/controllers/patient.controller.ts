import type { Request, Response } from "express";
import { patientMapper } from "../mappers/patient.mapper";

interface IPatientController {
  getAllPatients(_req: Request, res: Response): Promise<void>;
  getPatientByIdPatient(req: Request, res: Response): Promise<void>;
  getPatientByEmail(req: Request, res: Response): Promise<void>;
  createPatient(req: Request, res: Response): Promise<void>;
  updatePatient(req: Request, res: Response): Promise<void>;
  deletePatient(req: Request, res: Response): Promise<void>;
}

const patientController: IPatientController = {
  async getAllPatients(_req, res) {
    const patients = await patientMapper.findAll();

    res.status(200).json(patients);
  },
  async getPatientByIdPatient(req: Request, res: Response) {
    const id_patient = req.body.id_patient;

    const patient = await patientMapper.findByIdPatient(id_patient);
    res.status(200).json(patient);
  },
  async getPatientByEmail(req: Request, res: Response) {
    const email = req.body.email;

    const patient = await patientMapper.findByEmail(email);
    res.status(200).json(patient);
  },
  async createPatient(req: Request, res: Response) {
    const { firstname, lastname, email, password, birthdate, adress, phone } = req.body;
    const data = { firstname, lastname, email, password, birthdate, adress, phone };

    const patient = await patientMapper.createPatient(data);
    res.status(201).json(patient);
  },
  async updatePatient(req: Request, res: Response) {
    const { id_patient, firstname, lastname, email, password, birthdate, adress, phone } = req.body;
    const data = { id_patient, firstname, lastname, email, password, birthdate, adress, phone };

    const patient = await patientMapper.updatePatient(data);
    res.status(200).json(patient);
  },
  async deletePatient(req: Request, res: Response) {
    const id_patient = req.body.id_patient;

    const patient = await patientMapper.deletePatient(id_patient);
    res.status(204).json(patient);
  },
};

export { patientController };

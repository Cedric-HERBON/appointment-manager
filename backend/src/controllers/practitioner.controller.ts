import type { Request, Response } from "express";
import { practitionerMapper } from "../mappers/practitioner.mapper";

interface IPractitionerController {
  getAllPractitioners(_req: Request, res: Response): Promise<void>;
  getPractitionerByIdPractitioner(req: Request, res: Response): Promise<void>;
  getPractitionerByEmail(req: Request, res: Response): Promise<void>;
  createPractitioner(req: Request, res: Response): Promise<void>;
  updatePractitioner(req: Request, res: Response): Promise<void>;
  deletePractitioner(req: Request, res: Response): Promise<void>;
}

const practitionerController: IPractitionerController = {
  async getAllPractitioners(_req, res) {
    const practitioners = await practitionerMapper.findAll();
    res.status(200).json(practitioners);
  },
  async getPractitionerByIdPractitioner(req: Request, res: Response) {
    const id_practitioner = req.body.id_practitioner;

    const practitioner = await practitionerMapper.findByIdPractitioner(id_practitioner);
    res.status(200).json(practitioner);
  },
  async getPractitionerByEmail(req: Request, res: Response) {
    const email = req.body.email;

    const practitioner = await practitionerMapper.findByEmail(email);
    res.status(200).json(practitioner);
  },
  async createPractitioner(req: Request, res: Response) {
    const { firstname, lastname, email, password, birthdate, adress, phone, speciality } = req.body;
    const data = { firstname, lastname, email, password, birthdate, adress, phone, speciality };

    const practitioner = await practitionerMapper.createPractitioner(data);
    res.status(201).json(practitioner);
  },
  async updatePractitioner(req: Request, res: Response) {
    const { id_practitioner, firstname, lastname, email, password, birthdate, adress, phone, speciality } = req.body;
    const data = { id_practitioner, firstname, lastname, email, password, birthdate, adress, phone, speciality };

    const practitioner = await practitionerMapper.updatePractitioner(data);
    res.status(200).json(practitioner);
  },
  async deletePractitioner(req: Request, res: Response) {
    const id_practitioner = req.body.id_practitioner;

    const practitioner = await practitionerMapper.deletePractitioner(id_practitioner);
    res.status(204).json(practitioner);
  },
};

export { practitionerController };

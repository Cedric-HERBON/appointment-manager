import type { Request, Response } from "express";
import { appointmentTypeMapper } from "../mappers/appointment_type.mapper";

interface IAppointmentTypeController {
  getAllAppointmentTypes(_req: Request, res: Response): Promise<void>;
  getAppointmentTypeByIdAppointmentType(req: Request, res: Response): Promise<void>;
  getAppointmentTypeByIdPractitioner(req: Request, res: Response): Promise<void>;
  getAppointmentTypeByIdAppointmentTypeAndIdPractitioner(req: Request, res: Response): Promise<void>;
  createAppointmentType(req: Request, res: Response): Promise<void>;
  updateAppointmentType(req: Request, res: Response): Promise<void>;
  deleteAppointmentType(req: Request, res: Response): Promise<void>;
}

const appointmentTypeController: IAppointmentTypeController = {
  async getAllAppointmentTypes(_req, res) {
    const allAppointmentTypes = await appointmentTypeMapper.findAll();
    res.status(200).json(allAppointmentTypes);
  },
  async getAppointmentTypeByIdAppointmentType(req: Request, res: Response) {
    const id_appointment_type = req.body.id_appointment_type;

    const appointmentType = await appointmentTypeMapper.findByIdAppointmentType(id_appointment_type);
    res.status(200).json(appointmentType);
  },
  async getAppointmentTypeByIdPractitioner(req, res) {
    const id_practitioner = req.body.id_practitioner;
    const appointmentTypes = await appointmentTypeMapper.findByIdPractitioner(id_practitioner);
    res.status(200).json(appointmentTypes);
  },
  async getAppointmentTypeByIdAppointmentTypeAndIdPractitioner(req, res) {
    const id_appointment_type = req.body.id_appointment_type;
    const id_practitioner = req.body.id_practitioner;

    const appointmentType = await appointmentTypeMapper.findByIdAppointmentTypeAndPractitionner(id_appointment_type, id_practitioner);
    res.status(200).json(appointmentType);
  },
  async createAppointmentType(req, res) {
    const { id_practitioner, type, duration } = req.body;
    const data = { id_practitioner, type, duration };

    const appointmentType = await appointmentTypeMapper.createAppointmentType(data);
    res.status(201).json(appointmentType);
  },
  async updateAppointmentType(req, res) {
    const { type, duration, id_practitioner, id_appointment_type } = req.body;
    const data = { type, duration, id_practitioner, id_appointment_type };

    const appointmentType = await appointmentTypeMapper.updateAppointmentType(data);
    res.status(200).json(appointmentType);
  },
  async deleteAppointmentType(req, res) {
    const id_appointment_type = req.body.id_appointment_type;

    const appointment_type = await appointmentTypeMapper.deleteAppointmentType(id_appointment_type);
    res.status(204).json(appointment_type);
  },
};

export { appointmentTypeController };

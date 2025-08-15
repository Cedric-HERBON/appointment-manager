import type { Request, Response } from "express";
import { appointmentMapper } from "../mappers/appointment.mapper";

interface IAppointmentController {
  getAllAppointments(_req: Request, res: Response): Promise<void>;
  getAppointmentByIdAppointment(req: Request, res: Response): Promise<void>;
  getAppointmentByIdPatient(req: Request, res: Response): Promise<void>;
  createAppointment(req: Request, res: Response): Promise<void>;
  updateAppointment(req: Request, res: Response): Promise<void>;
  deleteAppointment(req: Request, res: Response): Promise<void>;
}

const appointmentController: IAppointmentController = {
  async getAllAppointments(_req, res) {
    const allAppointments = await appointmentMapper.findAll();
    res.status(200).json(allAppointments);
  },
  async getAppointmentByIdAppointment(req: Request, res: Response) {
    const id_appointment = req.body.id_appointment;

    const appointment = await appointmentMapper.findByIdAppointment(id_appointment);
    res.status(200).json(appointment);
  },
  async getAppointmentByIdPatient(req, res) {
    const id_patient = req.body.id_patient;
    const appointments = await appointmentMapper.findByIdPatient(id_patient);
    res.status(200).json(appointments);
  },
  async createAppointment(req, res) {
    const { id_patient, id_appointment_slot, status } = req.body;
    const data = { id_patient, id_appointment_slot, status };

    const appointment = await appointmentMapper.createAppointment(data);
    res.status(201).json(appointment);
  },
  async updateAppointment(req, res) {
    const { id_appointment, id_patient, id_appointment_slot, status } = req.body;
    const data = { id_appointment, id_patient, id_appointment_slot, status };

    const appointment = await appointmentMapper.updateAppointment(data);
    res.status(200).json(appointment);
  },
  async deleteAppointment(req, res) {
    const id_appointment = req.body.id_appointment;

    const appointment = await appointmentMapper.deleteAppointment(id_appointment);
    res.status(204).json(appointment);
  },
};

export { appointmentController };

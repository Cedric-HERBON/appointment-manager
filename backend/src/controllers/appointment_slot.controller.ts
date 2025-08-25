import type { Request, Response } from "express";
import { appointmentSlotMapper } from "../mappers/appointment_slot.mapper";
import { AppointmentSlotSchema } from "../schemas/appointment_slot.schema";

interface IAppointmentSlotController {
  getAllAppointmentSlots(_req: Request, res: Response): Promise<void>;
  getByIdAppointmentSlot(req: Request, res: Response): Promise<void>;
  getAllByIdPractitioner(req: Request, res: Response): Promise<void>;
  createAppointmentSlot(req: Request, res: Response): Promise<void>;
  updateAppointmentSlot(req: Request, res: Response): Promise<void>;
  deleteAppointmentSlot(req: Request, res: Response): Promise<void>;
}

const appointmentSlotController: IAppointmentSlotController = {
  async getAllAppointmentSlots(_req, res) {
    const result = await appointmentSlotMapper.findAll;
    res.status(200).json(result);
  },
  async getByIdAppointmentSlot(req, res) {
    const { id_appointment_slot } = req.body;
    const result = await appointmentSlotMapper.findByIdAppointmentSlot(id_appointment_slot);
    res.status(200).json(result);
  },
  async getAllByIdPractitioner(req, res) {
    const { id_practitioner } = req.body;
    const result = await appointmentSlotMapper.findByIdPractitioner(id_practitioner);
    res.status(200).json(result);
  },
  async createAppointmentSlot(req, res) {
    // const { id_practitioner, id_availability, id_appointment_type, date, hour, status } = req.body;
    // const data = { id_practitioner, id_availability, id_appointment_type, date, hour, status };
    const { dataParsed } = req.body;

    const result = await appointmentSlotMapper.createAppointmentSlot(dataParsed);
    res.status(201).json(result);
  },
  async updateAppointmentSlot(req, res) {
    const { id_appointment_slot, id_practitioner, id_availability, id_appointment_type, date, hour, status } = req.body;
    const data = { id_appointment_slot, id_practitioner, id_availability, id_appointment_type, date, hour, status };
    const result = await appointmentSlotMapper.updateAppointmentSlot(data);
    res.status(200).json(result);
  },
  async deleteAppointmentSlot(req, res) {
    const { id_appointment_slot } = req.body;
    const result = await appointmentSlotMapper.deleteAppointmentSlot(id_appointment_slot);
    res.status(204).json(result);
  },
};

export { appointmentSlotController };

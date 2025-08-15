import type { Request, Response } from "express";
import { availabilityMapper } from "../mappers/availability.mapper";

interface IAvailabilityController {
  getAllAvailabilities(_req: Request, res: Response): Promise<void>;
  getByIdAvailability(req: Request, res: Response): Promise<void>;
  getByIdPractitioner(req: Request, res: Response): Promise<void>;
  createAvailability(req: Request, res: Response): Promise<void>;
  updateAvailability(req: Request, res: Response): Promise<void>;
  deleteAvailability(req: Request, res: Response): Promise<void>;
}

const availabilityController: IAvailabilityController = {
  async getAllAvailabilities(_req, res) {
    const availabilities = await availabilityMapper.findAll();
    res.status(200).json(availabilities);
  },
  async getByIdAvailability(req, res) {
    const { id_availability } = req.body;
    const availability = await availabilityMapper.findByIdAvalability(id_availability);
    res.status(200).json(availability);
  },
  async getByIdPractitioner(req, res) {
    const { id_practitioner } = req.body;
    const availability = await availabilityMapper.findByIdPractitioner(id_practitioner);
    res.status(200).json(availability);
  },
  async createAvailability(req, res) {
    const { id_practitioner, date, start_time, end_time } = req.body;
    const data = { id_practitioner, date, start_time, end_time };
    const availability = await availabilityMapper.createAvailability(data);
    res.status(200).json(availability);
  },
  async updateAvailability(req, res) {
    const { id_practitioner, date, start_time, end_time } = req.body;
    const data = { id_practitioner, date, start_time, end_time };
    const availability = await availabilityMapper.updateAvailability(data);
    res.status(200).json(availability);
  },
  async deleteAvailability(req, res) {
    const { id_availability } = req.body;
    const availability = await availabilityMapper.deleteAvailability(id_availability);
    res.status(200).json(availability);
  },
};

export { availabilityController };

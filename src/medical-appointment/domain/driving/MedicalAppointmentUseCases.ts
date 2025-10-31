import { MedicalAppointment } from "../entities/MedicalAppointment";
import { MedicalAppointmentDto } from "./dto/MedicalAppointmentDto";

export interface MedicalAppointmentUseCases {
  registerMedicalAppointment(
    medicalAppointmentDto: MedicalAppointmentDto
  ): Promise<MedicalAppointment>;
  listMedicalAppointmentsByInsured(
    insuredId: string
  ): Promise<MedicalAppointment[]>;
}

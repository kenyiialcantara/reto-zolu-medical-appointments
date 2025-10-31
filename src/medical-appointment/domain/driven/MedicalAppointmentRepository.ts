import { MedicalAppointment } from "../entities/MedicalAppointment";

export interface MedicalAppointmentRepository {
  saveMedicalAppointment(
    appointment: MedicalAppointment
  ): Promise<MedicalAppointment>;
  updateStatusMedicalAppointment(
    appointment: MedicalAppointment
  ): Promise<MedicalAppointment>;
  findMedicalAppointmentsByInsured(
    insuredId: string
  ): Promise<MedicalAppointment[]>;
}

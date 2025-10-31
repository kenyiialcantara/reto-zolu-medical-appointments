import { MedicalAppointmentService } from "../application/driving/MedicalAppointmentService";
import { MedicalAppointmentDto } from "../domain/driving/dto/MedicalAppointmentDto";
import { MedicalAppointment } from "../domain/entities/MedicalAppointment";

export class MedicalAppointmentController {
  private readonly medicalAppointmentService: MedicalAppointmentService;
  constructor() {
    this.medicalAppointmentService = new MedicalAppointmentService();
  }

  async createMedicalAppointment(medicalAppointmentDto: MedicalAppointmentDto) {
    return this.medicalAppointmentService.postMedicalAppointmentUseCases(
      medicalAppointmentDto
    );
  }

  async getMedicalAppointmentsByInsured(insuredId: string) {
    return this.medicalAppointmentService.getListMedicalAppointmentsByInsuredUseCases(
      insuredId
    );
  }
}

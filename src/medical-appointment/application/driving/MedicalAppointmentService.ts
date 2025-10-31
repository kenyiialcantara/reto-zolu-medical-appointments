import { MedicalAppointmentUseCases } from "../../domain/driving/MedicalAppointmentUseCases";
import { MedicalAppointmentDomainService } from "../../domain/MedicalAppointmentDomainService";
import { MedicalAppointmentAdapter } from "../driven/MedicalAppointmentAdapter";
import { MedicalAppointmentDto } from "../../domain/driving/dto/MedicalAppointmentDto";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment";
export class MedicalAppointmentService {
  private readonly medicalAppointmentUseCases: MedicalAppointmentUseCases;

  constructor() {
    this.medicalAppointmentUseCases = new MedicalAppointmentDomainService(
      new MedicalAppointmentAdapter()
    );
  }

  async postMedicalAppointmentUseCases(
    medicalAppointmentDto: MedicalAppointmentDto
  ): Promise<MedicalAppointment> {
    return this.medicalAppointmentUseCases.registerMedicalAppointment(
      medicalAppointmentDto
    );
  }

  getListMedicalAppointmentsByInsuredUseCases(
    insuredId: string
  ): Promise<MedicalAppointment[]> {
    return this.medicalAppointmentUseCases.listMedicalAppointmentsByInsured(
      insuredId
    );
  }
}

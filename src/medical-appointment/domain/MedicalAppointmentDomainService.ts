import { MedicalAppointmentRepository } from "./driven/MedicalAppointmentRepository";
import { MedicalAppointmentDto } from "./driving/dto/MedicalAppointmentDto";
import { MedicalAppointmentUseCases } from "./driving/MedicalAppointmentUseCases";
import { MedicalAppointmentStatusEnum } from "./entities/enum/MedicalAppointmentStatusEnum";
import { MedicalAppointment } from "./entities/MedicalAppointment";

export class MedicalAppointmentDomainService
  implements MedicalAppointmentUseCases
{
  constructor(
    private medicalAppointmentRepository: MedicalAppointmentRepository
  ) {}

  async registerMedicalAppointment(
    medicalAppointmentDto: MedicalAppointmentDto
  ): Promise<MedicalAppointment> {
    const appointment = new MedicalAppointment({
      id: crypto.randomUUID(),
      insuredId: medicalAppointmentDto.insuredId,
      scheduleId: medicalAppointmentDto.scheduleId,
      countryISO: medicalAppointmentDto.countryISO,
      date: medicalAppointmentDto.date,
      status: MedicalAppointmentStatusEnum.PENDING,
    });
    await this.medicalAppointmentRepository.saveMedicalAppointment(appointment);
    return appointment;
  }

  async listMedicalAppointmentsByInsured(
    insuredId: string
  ): Promise<MedicalAppointment[]> {
    return this.medicalAppointmentRepository.findMedicalAppointmentsByInsured(
      insuredId
    );
  }
}

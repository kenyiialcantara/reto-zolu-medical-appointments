import { CountryISOEnum } from "../entities/enum/CountryISOEnum";
import { MedicalAppointment } from "../entities/MedicalAppointment";

export interface MedicalAppointmentCountryRepository {
  save(medicalAppointment: MedicalAppointment): Promise<MedicalAppointment>;
  findByInsuredId(
    insuredId: string,
    countryISO: CountryISOEnum
  ): Promise<MedicalAppointment[]>;
}

import { CountryISOEnum } from "../../entities/enum/CountryISOEnum";

export interface MedicalAppointmentDto {
  insuredId: string;
  scheduleId: string;
  countryISO: CountryISOEnum;
  date: string;
}

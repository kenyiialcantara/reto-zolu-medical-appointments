import { get } from "http";
import { CountryISOEnum } from "./enum/CountryISOEnum";
import { MedicalAppointmentStatusEnum } from "./enum/MedicalAppointmentStatusEnum";
import { setDefaultHighWaterMark } from "stream";

type MedicalAppointmentProps = {
  id: string;
  insuredId: string;
  scheduleId: string;
  countryISO: CountryISOEnum;
  date: string;
  status: MedicalAppointmentStatusEnum;
};

export class MedicalAppointment {
  private id: string;
  private insuredId: string;
  private scheduleId: string;
  private date: string;
  private countryISO: CountryISOEnum;
  private status: MedicalAppointmentStatusEnum;

  constructor(props: MedicalAppointmentProps) {
    this.id = props.id;
    this.insuredId = props.insuredId;
    this.scheduleId = props.scheduleId;
    this.countryISO = props.countryISO;
    this.status = props.status;
    this.date = props.date;
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getInsuredId(): string {
    return this.insuredId;
  }

  getScheduleId(): string {
    return this.scheduleId;
  }

  getCountryISO(): CountryISOEnum {
    return this.countryISO;
  }

  getDate(): string {
    return this.date;
  }
  getStatus(): MedicalAppointmentStatusEnum {
    return this.status;
  }

  // Setters

  setDate(date: string): void {
    this.date = date;
  }

  setInsuredId(insuredId: string): void {
    this.insuredId = insuredId;
  }

  setScheduleId(scheduleId: string): void {
    this.scheduleId = scheduleId;
  }

  setCountryISO(countryISO: CountryISOEnum): void {
    this.countryISO = countryISO;
  }

  setStatus(status: MedicalAppointmentStatusEnum): void {
    this.status = status;
  }
}

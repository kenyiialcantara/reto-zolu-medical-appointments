import { MedicalAppointmentCountryAdapter } from "../../application/driven/MedicalAppointmentCountryAdapter";
import { EventBridgePublisher } from "../events-bridge/event_bridge.publisher";
import { CountryISOEnum } from "../../domain/entities/enum/CountryISOEnum";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment";

export const handler = async (event: any) => {
  const repository = new MedicalAppointmentCountryAdapter();

  for (const record of event.Records) {
    const appointmentData = JSON.parse(record.body);
    const medicalAppointment = new MedicalAppointment({
      id: appointmentData.id,
      insuredId: appointmentData.insuredId,
      scheduleId: appointmentData.scheduleId,
      countryISO: appointmentData.countryISO as CountryISOEnum,
      date: appointmentData.date,
      status: appointmentData.status,
    });
    await repository.save(medicalAppointment);
    await EventBridgePublisher.publishMedicalAppointmentCreated(
      medicalAppointment
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "SQS messages processed successfully" }),
  };
};

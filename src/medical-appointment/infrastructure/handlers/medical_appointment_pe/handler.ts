import { MedicalAppointmentCountryAdapter } from "../../../application/driven/MedicalAppointmentCountryAdapter";
import { EventBridgePublisher } from "../../events-bridge/event_bridge.publisher";

export const handler = async (event: any) => {
  const medicalAppointmentPeRepository = new MedicalAppointmentCountryAdapter();

  for (const record of event.Records) {
    const medicalAppointment = JSON.parse(record.body);
    await medicalAppointmentPeRepository.save(medicalAppointment);
    await EventBridgePublisher.publishMedicalAppointmentCreated(
      medicalAppointment
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Processed successfully" }),
  };
};

import {
  EventBridgeClient,
  PutEventsCommand,
} from "@aws-sdk/client-eventbridge";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment";

const client = new EventBridgeClient({
  region: process.env.AWS_REGION,
});

export class EventBridgePublisher {
  static async publishMedicalAppointmentCreated(
    detail: MedicalAppointment
  ): Promise<void> {
    const params = {
      Entries: [
        {
          EventBusName: process.env.EVENT_BUS_NAME!,
          Source: "medical.appointment.service",
          DetailType: "MedicalAppointmentCreated",
          Detail: JSON.stringify(detail),
        },
      ],
    };

    try {
      await client.send(new PutEventsCommand(params));
    } catch (error) {
      console.error("Error publishing to EventBridge", error);
      throw new Error("Error publishing to EventBridge");
    }
  }
}

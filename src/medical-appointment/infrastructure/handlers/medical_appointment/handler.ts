import { MedicalAppointmentAdapter } from "../../../application/driven/MedicalAppointmentAdapter";
import { MedicalAppointmentStatusEnum } from "../../../domain/entities/enum/MedicalAppointmentStatusEnum";

import { MedicalAppointment } from "../../../domain/entities/MedicalAppointment";
import { MedicalAppointmentController } from "../../MedicalAppointmentController";
import { SnsPublisher } from "../../sns/sns.publisher";

export const handler = async (event: any) => {
  try {
    if (event.httpMethod) {
      const controller = new MedicalAppointmentController();

      if (event.httpMethod === "POST") {
        const body = JSON.parse(event.body);

        if (!body.insuredId || !body.scheduleId || !body.countryISO) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing fields" }),
          };
        }

        const result = await controller.createMedicalAppointment(body);

        await SnsPublisher.publishMedicalAppointmentCreated(result);

        return { statusCode: 201, body: JSON.stringify(result) };
      }

      if (event.httpMethod === "GET") {
        const insuredId = event.pathParameters.id;

        if (!insuredId) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing insuredId parameter" }),
          };
        }

        const result = await controller.getMedicalAppointmentsByInsured(
          insuredId
        );

        return { statusCode: 200, body: JSON.stringify(result) };
      }

      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }

    if (event.Records) {
      const adapter = new MedicalAppointmentAdapter();
      await Promise.all(
        event.Records.map(async (record: any) => {
          const appointment = JSON.parse(record.body);
          const updated = new MedicalAppointment({
            ...appointment,
            status: MedicalAppointmentStatusEnum.COMPLETED,
          });
          await adapter.updateStatusMedicalAppointment(updated);
        })
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Status updated" }),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Unsupported event type" }),
    };
  } catch (error: any) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

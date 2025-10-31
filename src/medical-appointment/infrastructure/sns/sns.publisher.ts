import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment";
const sns = new SNSClient({
  region: process.env.AWS_REGION,
});

export class SnsPublisher {
  static async publishMedicalAppointmentCreated(
    message: MedicalAppointment
  ): Promise<void> {
    const params = {
      TopicArn: process.env.MEDICAL_APPOINTMENT_TOPIC_ARN!,
      Message: JSON.stringify(message),
      MessageAttributes: {
        countryISO: {
          DataType: "String",
          StringValue: message.getCountryISO(),
        },
      },
    };

    try {
      await sns.send(new PublishCommand(params));
    } catch (error) {
      console.error("Error publishing to SNS topic", error);
      throw new Error("Error publishing to SNS topic");
    }
  }
}

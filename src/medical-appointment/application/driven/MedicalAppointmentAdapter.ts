import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { MedicalAppointmentRepository } from "../../domain/driven/MedicalAppointmentRepository";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { MedicalAppointmentStatusEnum } from "../../domain/entities/enum/MedicalAppointmentStatusEnum";
import { CountryISOEnum } from "../../domain/entities/enum/CountryISOEnum";
export class MedicalAppointmentAdapter implements MedicalAppointmentRepository {
  private client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient();
  }

  async saveMedicalAppointment(
    appointment: MedicalAppointment
  ): Promise<MedicalAppointment> {
    try {
      const docClient = DynamoDBDocumentClient.from(this.client);
      const params = {
        TableName: process.env.MEDICAL_APPOINTMENTS_TABLE!,
        Item: appointment,
      };
      const command = new PutCommand(params);
      const result = await docClient.send(command);
      if (result) {
        return appointment;
      } else {
        console.error("Failed to save appointment:", result);
        throw new Error("Error saving medical appointment");
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error saving medical appointment");
    }
  }

  async findMedicalAppointmentsByInsured(
    insuredId: string
  ): Promise<MedicalAppointment[]> {
    try {
      const docClient = DynamoDBDocumentClient.from(this.client);
      const params = {
        TableName: process.env.MEDICAL_APPOINTMENTS_TABLE!,
        IndexName: "InsuredIdIndex",
        KeyConditionExpression: "insuredId = :insuredId",
        ExpressionAttributeValues: {
          ":insuredId": { S: insuredId },
        },
      };
      const command = new QueryCommand(params);
      const { Items } = await docClient.send(command);
      return (
        Items?.map(
          (item) =>
            new MedicalAppointment({
              id: item.id.S!,
              insuredId: item.insuredId.S!,
              scheduleId: item.scheduleId.S!,
              countryISO: item.countryISO.S! as CountryISOEnum,
              date: item.date.S!,
              status: item.status.S! as MedicalAppointmentStatusEnum,
            })
        ) || []
      );
    } catch (error) {
      console.error(error);
      throw new Error("Error retrieving medical appointments");
    }
  }

  async updateStatusMedicalAppointment(
    appointment: MedicalAppointment
  ): Promise<MedicalAppointment> {
    try {
      const docClient = DynamoDBDocumentClient.from(this.client);
      const params = {
        TableName: process.env.MEDICAL_APPOINTMENT_TABLE!,
        Item: appointment,
      };
      const command = new PutCommand(params);
      const result = await docClient.send(command);
      if (result) {
        return appointment;
      } else {
        throw new Error("Error updating medical appointment");
      }
    } catch (error) {
      throw new Error("Error updating medical appointment");
    }
  }
}

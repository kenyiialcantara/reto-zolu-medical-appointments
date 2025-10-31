import { MedicalAppointmentCountryRepository } from "../../domain/driven/MedicalAppointmentCountryRepositiory";
import { CountryISOEnum } from "../../domain/entities/enum/CountryISOEnum";
import { MedicalAppointment } from "../../domain/entities/MedicalAppointment";
import { MySqlConnection } from "../../infrastructure/mysql/mysql.connection";

export class MedicalAppointmentCountryAdapter
  implements MedicalAppointmentCountryRepository
{
  async save(
    medicalAppointment: MedicalAppointment
  ): Promise<MedicalAppointment> {
    const conn = await MySqlConnection.getConnection(
      medicalAppointment.getCountryISO()
    );
    const query =
      "INSERT INTO medical_appointments (insured_id, schedule_id, country_iso, status, date) VALUES (?, ?, ?, ?, ?)";
    const values = [
      medicalAppointment.getInsuredId(),
      medicalAppointment.getScheduleId(),
      medicalAppointment.getCountryISO(),
      medicalAppointment.getStatus(),
      medicalAppointment.getDate(),
    ];

    await conn.execute(query, values);
    await conn.end();

    return medicalAppointment;
  }

  async findByInsuredId(
    insuredId: string,
    countryISO: CountryISOEnum
  ): Promise<MedicalAppointment[]> {
    const conn = await MySqlConnection.getConnection(countryISO);
    const query = "SELECT * FROM medical_appointments WHERE insured_id = ?";
    const [rows] = await conn.execute(query, [insuredId]);
    await conn.end();

    return (rows as any[]).map(
      (row) =>
        new MedicalAppointment({
          id: row.id,
          insuredId: row.insured_id,
          scheduleId: row.schedule_id,
          countryISO: row.country_iso,
          date: row.date,
          status: row.status,
        })
    );
  }
}

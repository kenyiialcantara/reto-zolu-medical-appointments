import mysql from "mysql2/promise";
import { CountryISOEnum } from "../../domain/entities/enum/CountryISOEnum";

export class MySqlConnection {
  static async getConnection(countryISO: CountryISOEnum) {
    switch (countryISO) {
      case CountryISOEnum.CL:
        return mysql.createConnection({
          host: process.env.MYSQL_CL_HOST,
          user: process.env.MYSQL_CL_USER,
          password: process.env.MYSQL_CL_PASSWORD,
          database: process.env.MYSQL_CL_DATABASE,
        });
      case CountryISOEnum.PE:
        return mysql.createConnection({
          host: process.env.MYSQL_PE_HOST,
          user: process.env.MYSQL_PE_USER,
          password: process.env.MYSQL_PE_PASSWORD,
          database: process.env.MYSQL_PE_DATABASE,
        });
    }
  }
}

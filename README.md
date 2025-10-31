
# Reto Zoluxiones - Medical Appointment

Proyecto orientado a la gestión de citas médicas, implementado con arquitectura limpia y desplegado en AWS usando Serverless Framework.

## Estructura del Proyecto

```text
reto-zoluxiones/
├── package.json
├── README.md
├── serverless.yml
├── src/
│   └── medical-appointment/
│       ├── application/
│       │   ├── driven/
│       │   │   ├── MedicalAppointmentAdapter.ts
│       │   │   └── MedicalAppointmentCountryAdapter.ts
│       │   └── driving/
│       │       └── MedicalAppointmentService.ts
│       ├── domain/
│       │   ├── MedicalAppointmentDomainService.ts
│       │   ├── driven/
│       │   │   ├── MedicalAppointmentCountryRepositiory.ts
│       │   │   └── MedicalAppointmentRepository.ts
│       │   ├── driving/
│       │   │   ├── MedicalAppointmentUseCases.ts
│       │   │   └── dto/
│       │   │       └── MedicalAppointmentDto.ts
│       │   └── entities/
│       │       ├── MedicalAppointment.ts
│       │       └── enum/
│       │           ├── CountryISOEnum.ts
│       │           └── MedicalAppointmentStatusEnum.ts
│       └── infrastructure/
│           ├── MedicalAppointmentController.ts
│           ├── events-bridge/
│           │   └── event_bridge.publisher.ts
│           ├── handlers/
│           │   ├── medical_appointment/
│           │   │   └── handler.ts
│           │   ├── medical_appointment_cl/
│           │   │   └── handler.ts
│           │   └── medical_appointment_pe/
│           │       └── handler.ts
│           ├── mysql/
│           │   └── mysql.connection.ts
│           ├── sns/
│           │   └── sns.publisher.ts
│           └── sqs/
│               └── sqs.handler.ts
```

## Descripción General

- **Arquitectura limpia:** Separación en capas (aplicación, dominio, infraestructura).
- **Serverless:** Despliegue en AWS Lambda, integración con DynamoDB, SQS, SNS y EventBridge.
- **Soporte multi-país:** Handlers y configuración para Chile (CL) y Perú (PE).

## Principales Componentes

- **Handlers:** Entradas para eventos HTTP y SQS.
- **Adapters:** Adaptadores para persistencia y servicios externos.
- **Entities y DTOs:** Modelos de datos y transferencia.
- **Enums:** Estados y países soportados.
- **Controller:** Orquestación de la lógica de negocio.

## Especificación de API (tipo Swagger)

### Endpoints HTTP

#### Crear cita médica

`POST /medical-appointments`

**Request Body:**
```json
{
	"patientId": "string",
	"doctorId": "string",
	"date": "YYYY-MM-DDTHH:mm:ssZ",
	"country": "PE | CL",
	"status": "PENDING | CONFIRMED | CANCELLED"
}
```

**Response:**
```json
{
	"id": "string",
	"patientId": "string",
	"doctorId": "string",
	"date": "YYYY-MM-DDTHH:mm:ssZ",
	"country": "PE | CL",
	"status": "PENDING | CONFIRMED | CANCELLED"
}
```

#### Obtener cita médica por ID

`GET /medical-appointments/{id}`

**Response:**
```json
{
	"id": "string",
	"patientId": "string",
	"doctorId": "string",
	"date": "YYYY-MM-DDTHH:mm:ssZ",
	"country": "PE | CL",
	"status": "PENDING | CONFIRMED | CANCELLED"
}
```

### Eventos y Colas

- **SNS Topic:** `MedicalAppointmentTopic` para notificaciones de citas.
- **SQS Queues:**
	- `medical-appointment-queue-pe` (Perú)
	- `medical-appointment-queue-cl` (Chile)
	- `completed-medical-appointment` (citas completadas)
- **EventBridge:** Regla para eventos de cita completada.

## Variables de Entorno

- `MEDICAL_APPOINTMENTS_TABLE`: Nombre de la tabla DynamoDB.
- `MEDICAL_APPOINTMENT_TOPIC_ARN`: ARN del topic SNS.
- `EVENT_BUS_NAME`: Nombre del bus de eventos.
- `MYSQL_PE_*`, `MYSQL_CL_*`: Configuración de bases de datos MySQL por país.

## Despliegue

Usa Serverless Framework:

```bash
sls deploy
```

## Autores

- Equipo Zoluxiones

---
Documentación generada automáticamente.

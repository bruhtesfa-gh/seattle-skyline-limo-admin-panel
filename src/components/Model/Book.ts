export interface Book {
  id: string;
  firstName: string;
  lastName: string;
  fromAddress: string;
  toAddress: string;
  email: string;
  phoneNumber: string;
  luggageCount: number;
  personCount: number;
  journeyDate: Date;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  vehicleId: string;
}

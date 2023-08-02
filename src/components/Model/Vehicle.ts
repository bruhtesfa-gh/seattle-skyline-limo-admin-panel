export type VehicleType = "SUV" | "BUS" | "VAN" | "SEDAN";
export interface Vehicle {
  id: string;
  img: string;
  name: string;
  model: string;
  description: string;
  speed: number;
  pricePerDay: number;
  type: VehicleType;
  passengerSize: number;
  createdAt: Date;
  updatedAt: Date;
}

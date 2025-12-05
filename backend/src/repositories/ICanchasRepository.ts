import { Cancha } from "../domain/Cancha";

export interface ICanchasRepository {
  create(cancha: Cancha): Promise<void>;
  findById(id: string): Promise<Cancha | null>;
  findAll(): Promise<Cancha[]>;
  update(cancha: Cancha): Promise<void>;
  delete(id: string): Promise<void>;
}
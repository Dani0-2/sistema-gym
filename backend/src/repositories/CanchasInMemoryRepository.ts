import { ICanchasRepository } from "./ICanchasRepository";
import { Cancha } from "../domain/Cancha";

export class CanchasInMemoryRepository implements ICanchasRepository {
  private canchas: Cancha[] = [];

  async create(cancha: Cancha): Promise<void> {
    this.canchas.push(cancha);
  }

  async findById(id: string): Promise<Cancha | null> {
    return this.canchas.find((c) => c.props.id === id) ?? null;
  }

  async findAll(): Promise<Cancha[]> {
    return this.canchas;
  }

  async update(cancha: Cancha): Promise<void> {
    const index = this.canchas.findIndex((c) => c.props.id === cancha.props.id);
    if (index !== -1) {
      this.canchas[index] = cancha;
    }
  }

  async delete(id: string): Promise<void> {
    this.canchas = this.canchas.filter((c) => c.props.id !== id);
  }
}
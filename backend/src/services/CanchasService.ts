import { randomUUID } from "crypto";
import { ICanchasRepository } from "../repositories/ICanchasRepository";
import { Cancha } from "../domain/Cancha";

export class CanchasService {
  constructor(private canchasRepo: ICanchasRepository) {}

  async crearCancha(data: {
    nombre: string;
    tipo: string;
    ubicacion: string;
    precioPorHora: number;
  }): Promise<Cancha> {
    const cancha = new Cancha({
      id: randomUUID(),
      nombre: data.nombre,
      tipo: data.tipo,
      ubicacion: data.ubicacion,
      precioPorHora: data.precioPorHora,
      activa: true,
      creadoEn: new Date(),
    });

    await this.canchasRepo.create(cancha);
    return cancha;
  }

  async listarCanchas(): Promise<Cancha[]> {
    return this.canchasRepo.findAll();
  }

  async obtenerCanchaPorId(id: string): Promise<Cancha> {
    const cancha = await this.canchasRepo.findById(id);
    if (!cancha) {
      throw new Error("Cancha no encontrada");
    }
    return cancha;
  }

  async actualizarCancha(id: string, data: {
    nombre?: string;
    tipo?: string;
    ubicacion?: string;
    precioPorHora?: number;
    activa?: boolean;
  }): Promise<Cancha> {
    const cancha = await this.obtenerCanchaPorId(id);
    cancha.actualizarDatos(data);
    await this.canchasRepo.update(cancha);
    return cancha;
  }

  async eliminarCancha(id: string): Promise<void> {
    const cancha = await this.canchasRepo.findById(id);
    if (!cancha) {
      throw new Error("Cancha no encontrada");
    }
    await this.canchasRepo.delete(id);
  }
}
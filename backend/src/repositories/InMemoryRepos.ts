import { CanchasInMemoryRepository } from "./CanchasInMemoryRepository";
import { ReservasInMemoryRepository } from "./ReservasInMemoryRepository";

export const canchasRepo = new CanchasInMemoryRepository();
export const reservasRepo = new ReservasInMemoryRepository();
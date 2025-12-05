import { Router } from "express";
import { ReservasController } from "../controllers/ReservasController";
import { ReservasService } from "../services/ReservasService";
import { ReservasInMemoryRepository } from "../repositories/ReservasInMemoryRepository";

const router = Router();

const reservasRepo = new ReservasInMemoryRepository();
const reservasService = new ReservasService(reservasRepo);
const reservasController = new ReservasController(reservasService);

router.post("/", reservasController.crearReserva);

export default router;
import { Router } from "express";
import { ReservasController } from "../controllers/ReservasController";
import { ReservasService } from "../services/ReservasService";
import { ReservasInMemoryRepository } from "../repositories/ReservasInMemoryRepository";
import { FakePaymentGateway } from "../infrastructure/payments/FakePaymentGateway";

const router = Router();

const reservasRepo = new ReservasInMemoryRepository();
const paymentGateway = new FakePaymentGateway();
const reservasService = new ReservasService(reservasRepo, paymentGateway);
const reservasController = new ReservasController(reservasService);

router.post("/", reservasController.crearReserva);
router.get("/:id", reservasController.obtenerReservaPorId);
router.get("/disponibilidad/check", reservasController.consultarDisponibilidad);
router.post("/:id/cancelar", reservasController.cancelarReserva);
router.post("/:id/pagar", reservasController.pagarReserva);
export default router;
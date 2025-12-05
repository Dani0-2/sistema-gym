import { Router } from "express";
import { ReservasController } from "../controllers/ReservasController";
import { ReservasService } from "../services/ReservasService";
import { FakePaymentGateway } from "../infrastructure/payments/FakePaymentGateway";
import { canchasRepo, reservasRepo } from "../repositories/InMemoryRepos";


const router = Router();

const paymentGateway = new FakePaymentGateway();
const reservasService = new ReservasService(reservasRepo, canchasRepo, paymentGateway);
const reservasController = new ReservasController(reservasService);

router.post("/", reservasController.crearReserva);
router.get("/:id", reservasController.obtenerReservaPorId);
router.get("/disponibilidad/check", reservasController.consultarDisponibilidad);
router.post("/:id/cancelar", reservasController.cancelarReserva);
router.post("/:id/pagar", reservasController.pagarReserva);


export default router;
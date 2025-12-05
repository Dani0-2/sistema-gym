import { Router } from "express";
import { CanchasInMemoryRepository } from "../repositories/CanchasInMemoryRepository";
import { CanchasService } from "../services/CanchasService";
import { CanchasController } from "../controllers/CanchasController";

const router = Router();

const canchasRepo = new CanchasInMemoryRepository();
const canchasService = new CanchasService(canchasRepo);
const canchasController = new CanchasController(canchasService);

router.post("/", canchasController.crearCancha);
router.get("/", canchasController.listarCanchas);
router.get("/:id", canchasController.obtenerCanchaPorId);
router.put("/:id", canchasController.actualizarCancha);
router.delete("/:id", canchasController.eliminarCancha);

export default router;
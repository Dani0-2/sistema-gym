import express from "express";
import cors from "cors";
import reservasRoutes from "./routes/reservasRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/reservas", reservasRoutes);

// Simple health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
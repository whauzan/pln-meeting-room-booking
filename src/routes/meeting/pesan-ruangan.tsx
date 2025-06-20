import { createFileRoute } from "@tanstack/react-router";
import PesanRuanganPage from "../../features/meeting/components/PesanRuanganPage";

export const Route = createFileRoute("/meeting/pesan-ruangan")({
  component: PesanRuanganPage,
});

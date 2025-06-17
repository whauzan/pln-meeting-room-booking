import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/meeting/pesan-ruangan")({
  component: PesanRuangan,
});

function PesanRuangan() {
  return <div>PesanRuangan</div>;
}

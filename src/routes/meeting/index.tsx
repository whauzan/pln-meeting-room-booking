import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/meeting/")({
  component: Meeting,
});

function Meeting() {
  return <div>Meeting</div>;
}

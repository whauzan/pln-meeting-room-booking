import { createFileRoute } from "@tanstack/react-router";
import MeetingPage from "../../features/meeting/components/MeetingPage";

export const Route = createFileRoute("/meeting/")({
  component: MeetingPage,
});

import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/lessons/")({
  loader: () => {
    throw redirect({ to: "/lessons/$lessonId", params: { lessonId: "1" } });
  },
  component: () => null,
});

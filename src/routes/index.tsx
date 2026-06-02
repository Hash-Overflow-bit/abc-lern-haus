import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")(({
  loader: () => {
    throw redirect({ to: "/lessons/$lessonId", params: { lessonId: "1" } });
  },
  component: () => null,
}));

import { createFileRoute } from "@tanstack/react-router";
import { Journey } from "@/components/journey/Journey";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "The Journey — From Foundations to Global Impact" },
    { name: "description", content: "Eight chapters of leadership, learning and innovation across technology and consulting." },
    { property: "og:title", content: "The Journey — From Foundations to Global Impact" },
    { property: "og:description", content: "Explore eight chapters of entrepreneurship, Salesforce innovation and global impact." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Journey,
});

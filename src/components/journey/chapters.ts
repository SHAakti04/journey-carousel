import { Box, Building2, ChartNoAxesCombined, Lightbulb, Rocket, Trophy, UsersRound, type LucideIcon } from "lucide-react";
export type MilestoneContent = {
  chapter: string; period: string; title: string; body: string; tags: string[];
  icon: LucideIcon; href?: string; linkLabel?: string; status?: string;
};
type Milestone = MilestoneContent & {
  point: { x: number; y: number }; placement: "above" | "below";
  final?: boolean; alternate?: MilestoneContent;
};
const milestones: Milestone[] = [
  {
    chapter: "Chapter 08",
    period: "Earlier",
    title: "Foundations - Staffing, SAP & Datorama",
    body: "Country Manager for a U.S.-focused staffing organization, partner leadership building SAP consulting capability in Western India, and introducing Datorama to the Indian market.",
    tags: ["Staffing", "SAP", "Datorama"],
    point: { x: 160, y: 160 },
    placement: "above",
    icon: Lightbulb,
  },
  {
    chapter: "Chapter 07",
    period: "2010 - 2015",
    title: "AUSIB - Cross-Border PR & Stakeholder Relations",
    body: "Led cross-border public relations, stakeholder engagement, and relationship-building work for the Alliance for US India Business - experience that now strengthens the RealtyConnect PR and media story.",
    tags: ["AUSIB", "Public Relations"],
    point: { x: 500, y: 120 },
    placement: "below",
    icon: UsersRound,
  },
  {
    chapter: "Chapter 06",
    period: "2019",
    title: "Best Visualization Award - Limitless",
    body: "Recognized for data-driven storytelling on Datorama - a signature capability later taught across bootcamps in Singapore, Europe, India, and the USA.",
    tags: ["Datorama", "Recognition"],
    point: { x: 840, y: 185 },
    placement: "above",
    icon: Trophy,
  },
  {
    chapter: "Chapter 05",
    period: "2020",
    title: "Bombora App on Salesforce AppExchange",
    body: "Launched a custom connector on the Salesforce AppExchange, unlocking new enterprise revenue for intent-data driven marketing teams.",
    tags: ["Salesforce", "AppExchange"],
    point: { x: 1180, y: 130 },
    placement: "below",
    icon: Box,
  },
  {
    chapter: "Chapter 04",
    period: "2021",
    title: "Chairman, SSS Anandvan",
    body: "Currently serving as Chairman, Sardar Swaran Singh's Anandvan was founded in memory of his father to provide free education, life skills, and career pathways for underprivileged children.",
    status: "CURRENT CHAIRMAN",
    tags: ["Leadership", "Social Impact"],
    point: { x: 1520, y: 170 },
    placement: "above",
    icon: UsersRound,
    href: "https://www.sssanandvan.com/",
    linkLabel: "Visit Anandvan",
  },
  {
    chapter: "Chapter 03",
    period: "2023",
    title: "Acquisition & Merger",
    body: "SOLISTIC Decision Sciences, built into an early specialist in Marketing Analytics and Salesforce Marketing Cloud Intelligence, was acquired and merged into a broader Salesforce analytics practice.",
    tags: ["Marketing Analytics", "Growth"],
    point: { x: 1860, y: 125 },
    placement: "below",
    icon: ChartNoAxesCombined,
  },
  {
    chapter: "Chapter 01",
    period: "Sep 2025 - Present",
    title: "Founded Kefaru Technologies",
    body: "A boutique Salesforce and cloud transformation partner across India, the United States, and Canada - building Salesforce-powered growth ecosystems for SMBs and enterprises.",
    tags: ["Salesforce", "Cloud Transformation"],
    point: { x: 2200, y: 160 },
    placement: "above",
    icon: Rocket,
    href: "https://kefaru.com/",
    linkLabel: "Visit Kefaru",
    final: true,
    alternate: {
      chapter: "Chapter 02",
      period: "Present",
      title: "Managing Partner, RealtyConnect",
      body: "Managing Partner at RealtyConnect, strengthening cross-border real estate relationships, media strategy, and growth across emerging markets.",
      tags: ["RealtyConnect", "Managing Partner"],
      icon: Building2,
      href: "https://realtyconnect.tech/",
      linkLabel: "Visit RealtyConnect",
    },
  },
];
export const journeyCarouselItems: MilestoneContent[] = milestones
  .slice()
  .reverse()
  .flatMap((item) => {
    const currentItem: MilestoneContent = {
      chapter: item.chapter,
      period: item.period,
      title: item.title,
      body: item.body,
      tags: item.tags,
      icon: item.icon,
      ...(item.href ? { href: item.href } : {}),
      ...(item.linkLabel ? { linkLabel: item.linkLabel } : {}),
      ...(item.status ? { status: item.status } : {}),
    };

    return item.alternate ? [currentItem, item.alternate] : [currentItem];
  });


"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radial chart with a label";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#F8333C" },
  { browser: "safari", visitors: 200, fill: "#FCAB10" },
  { browser: "firefox", visitors: 187, fill: "#44AF69" },
  { browser: "edge", visitors: 173, fill: "#1B98E0" },
  { browser: "other", visitors: 90, fill: "#E8F1F2" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#F8333C",
  },
  safari: {
    label: "Safari",
    color: "#FCAB10",
  },
  firefox: {
    label: "Firefox",
    color: "#44AF69",
  },
  edge: {
    label: "Edge",
    color: "#1B98E0",
  },
  other: {
    label: "Other",
    color: "#E8F1F2",
  },
};

export default function Component() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Source Wise Vulnerability</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] bg-black/10 rounded-full mt-3"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="fill-black capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#F8333C" },
  { browser: "safari", visitors: 200, fill: "#FCAB10" },
  { browser: "firefox", visitors: 287, fill: "#44AF69" },
  { browser: "edge", visitors: 173, fill: "#1B98E0" },
  { browser: "other", visitors: 190, fill: "#E8F1F2" }
]

const chartConfig = {
  visitors: {
    label: "Visitors"
  },
  chrome: {
    label: "Chrome",
    color: "#F8333C"
  },
  safari: {
    label: "Safari",
    color: "#FCAB10"
  },
  firefox: {
    label: "Firefox",
    color: "#44AF69"
  },
  edge: {
    label: "Edge",
    color: "#1B98E0"
  },
  other: {
    label: "Other",
    color: "#E8F1F2"
  }
}

export default function Component() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl font-semibold">Vulnerability Analytics</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Detected
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

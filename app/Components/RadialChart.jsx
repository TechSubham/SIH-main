import React, { useState, useEffect } from 'react';
import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  vulnerabilitiesFound: {
    label: "Vulnerabilities Found",
  },
};

const colors = ["#F8333C", "#FCAB10", "#44AF69", "#1B98E0", "#9B59B6", "#3498DB"];

export default function Component({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      const processedData = data.map((item, index) => ({
        ...item,
        fill: colors[index % colors.length],
      }));
      setChartData(processedData);
      setIsLoading(false);
    }
  }, [data]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Source Wise Vulnerability</CardTitle>
        <CardDescription>Total Vulnerabilities Found</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <Skeleton className="mx-auto aspect-square h-[250px] rounded-full mt-3" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] bg-black/10 rounded-full mt-3"
          >
            <RadialBarChart
              data={chartData}
              startAngle={-90}
              endAngle={270}
              innerRadius={30}
              outerRadius={110}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="source" />}
              />
              <RadialBar dataKey="vulnerabilitiesFound" background>
                <LabelList
                  position="insideStart"
                  dataKey="source"
                  className="fill-black capitalize mix-blend-luminosity"
                  fontSize={11}
                />
              </RadialBar>
            </RadialBarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
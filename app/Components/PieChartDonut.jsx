import React from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const colors = ["#F8333C", "#FCAB10", "#44AF69", "#1B98E0", "#E8F1F2", "#8B4513"];

export default function VulnerabilityPieChart({ data }) {
  const chartData = React.useMemo(() => {
    if (!data || !data.totalVulnerabilities) return [];
    return data.totalVulnerabilities.map((item, index) => ({
      severity: item._id,
      count: item.count,
      fill: colors[index % colors.length]
    }));
  }, [data]);

  const totalVulnerabilities = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  const chartConfig = React.useMemo(() => {
    return chartData.reduce((acc, item) => {
      acc[item.severity] = {
        label: item.severity,
        color: item.fill
      };
      return acc;
    }, {});
  }, [chartData]);

  if (!data || !data.totalVulnerabilities) {
    return (
      <Card className="flex flex-col h-full">
        <CardHeader className="items-center pb-0">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <Skeleton className="h-[250px] w-[250px] rounded-full mx-auto" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl font-semibold">
          Vulnerability Analytics
        </CardTitle>
        <CardDescription>Total Vulnerabilities by Severity</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="severity"
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
                          {totalVulnerabilities.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
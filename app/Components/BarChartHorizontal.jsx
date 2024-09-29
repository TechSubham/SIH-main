import React, { useMemo } from "react";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  count: {
    label: "Notifications",
    color: "#2176FF",
  },
};

export default function NotifiedVulnerabilitiesChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || !data.monthlyNotifications) return [];
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return data.monthlyNotifications
      .sort((a, b) => (a._id.year - b._id.year) || (a._id.month - b._id.month))
      .map(item => ({
        month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
        count: item.count
      }))
      .slice(-6);  // Get the last 6 months of data
  }, [data]);

  if (!data || !data.monthlyNotifications) {
    return (
      <Card className="h-full">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  const dateRange = `${chartData[0]?.month} - ${chartData[chartData.length - 1]?.month}`;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Notified Vulnerabilities</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                left: -20,
                right: 10,
                top: 10,
                bottom: 10,
              }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={5} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
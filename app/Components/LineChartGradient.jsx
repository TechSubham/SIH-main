import React, { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const severityColors = {
  Critical: "#FF0000", // Red
  High: "#44AF69",     // Orange
  Important: "#FFD700", // Yellow
  Medium: "#1B98E0"    // Green
};

export default function SeverityAnalyticsChart({ data }) {
  const chartData = useMemo(() => {
    if (!data || !data.severityAnalytics) return [];
    
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const last6Months = Array.from({ length: 4 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return { month: monthNames[d.getMonth()], year: d.getFullYear() };
    }).reverse();

    return last6Months.map(({ month, year }) => {
      const monthData = data.severityAnalytics.filter(item => 
        item._id.month === monthNames.indexOf(month) + 1 && 
        item._id.year === year
      );

      const result = { month: `${month}` };
      Object.keys(severityColors).forEach(severity => {
        result[severity] = monthData.find(item => item._id.severity === severity)?.count || 0;
      });

      return result;
    });
  }, [data]);

  const chartConfig = useMemo(() => {
    return Object.entries(severityColors).reduce((acc, [severity, color]) => {
      acc[severity] = { label: severity, color: color };
      return acc;
    }, {});
  }, []);

  if (!data || !data.severityAnalytics) {
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

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Severity Analytics</CardTitle>
        <CardDescription>
          Showing Medium, Important, High, and Critical vulnerabilities for the last 4 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                {Object.entries(severityColors).map(([severity, color]) => (
                  <linearGradient key={severity} id={`fill${severity}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              {Object.keys(severityColors).reverse().map(severity => (
                <Area
                  key={severity}
                  dataKey={severity}
                  type="natural"
                  fill={`url(#fill${severity})`}
                  fillOpacity={0.4}
                  stroke={severityColors[severity]}
                  stackId="1"
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
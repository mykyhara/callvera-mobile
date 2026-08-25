import { ActivityIndicator, View } from "react-native";

import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

import {
  DASHBOARD_METRIC_SECTIONS,
  DashboardMetricCardConfig,
  Metrics,
} from "../constants/metrics-ui-config";
import { useDashboardMetrics } from "../hooks/use-dashboard-metrics";

export const DashboardMetricsGrid = () => {
  const { data: metrics, isLoading } = useDashboardMetrics();

  return (
    <View className="flex-row flex-wrap gap-y-4">
      {DASHBOARD_METRIC_SECTIONS.map((section) => (
        <MetricSection
          key={`section-${section.title}`}
          {...section}
          metrics={metrics}
          loading={isLoading}
        />
      ))}
    </View>
  );
};

const MetricSection = ({
  title,
  cards,
  metrics,
  loading,
}: {
  title: string;
  metrics: Metrics | undefined;
  cards: DashboardMetricCardConfig[];
  loading: boolean;
}) => {
  const getMetric = (k: keyof Exclude<typeof metrics, undefined>) =>
    metrics?.[k] ?? 0;

  const isFullWidth = (index: number) =>
    cards.length % 2 !== 0 && index === cards.length - 1;

  return (
    <View className="w-full">
      <Text variant="h2" className="mb-4">
        {title}
      </Text>
      <View className="-mr-3 flex-row flex-wrap gap-y-3">
        {cards.map((card, i) => (
          <View
            key={`card-${card.key}`}
            className={cn("w-1/2 pr-3", {
              "w-full": isFullWidth(i),
            })}
          >
            <MetricCard
              label={card.label}
              value={getMetric(card.key)}
              loading={loading}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const MetricCard = ({
  label,
  value,
  loading,
}: {
  label: string;
  value: number;
  loading: boolean;
}) => (
  <Card className="flex-1 px-4 py-2">
    <CardContent className="flex-row items-center justify-between gap-1 px-0">
      <Text className="text-sm font-medium">{label}</Text>
      <View>
        <Text className="font-bold">{value}</Text>
        {loading && <Loader />}
      </View>
    </CardContent>
  </Card>
);

const Loader = () => (
  <View className="bg-card absolute inset-0 items-center justify-center">
    <ActivityIndicator />
  </View>
);

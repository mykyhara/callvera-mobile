import { router } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, RefreshControl, ScrollView } from "react-native";

import { CardSeparator } from "@/components/card-separator";

import { DashboardMetrics } from "../types";
import { MetricsCardRow as CardRow } from "./metrics-card-row";
import { MetricsCardWrapper as CardWrapper } from "./metrics-card-wrapper";

interface MetricsViewProps {
  metrics: DashboardMetrics | null;
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function MetricsView({
  metrics,
  isLoading,
  isRefreshing,
  onRefresh,
}: MetricsViewProps) {
  const getMetricOrLoader = (k: keyof DashboardMetrics) =>
    isLoading ? <ActivityIndicator /> : String(metrics?.[k] ?? 0);

  const goToLeads = useCallback(() => {
    router.navigate({ pathname: "/leads" });
  }, []);

  const goToCalls = useCallback(() => {
    router.navigate({ pathname: "/calls" });
  }, []);

  return (
    <ScrollView
      contentContainerClassName="gap-y-4"
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    >
      <CardWrapper title="Leads" onPress={goToLeads}>
        <CardRow
          label="Qualified"
          content={getMetricOrLoader("qualifiedLeads")}
        />
        <CardSeparator />
        <CardRow
          label="Unqualified"
          content={getMetricOrLoader("unqualifiedLeads")}
        />
        <CardSeparator />
        <CardRow
          label="In-progress"
          content={getMetricOrLoader("inProgressLeads")}
        />
        <CardSeparator />
        <CardRow
          label="Unreached"
          content={getMetricOrLoader("unreachableLeads")}
        />
        <CardSeparator />
        <CardRow label="Total" content={getMetricOrLoader("totalLeads")} />
      </CardWrapper>

      <CardWrapper title="Calls" onPress={goToCalls}>
        <CardRow label="Converted" content={getMetricOrLoader("converted")} />
        <CardSeparator />
        <CardRow
          label="Not Converted"
          content={getMetricOrLoader("notConverted")}
        />
        <CardSeparator />
        <CardRow
          label="Transfer Successfull"
          content={getMetricOrLoader("transferSuccessful")}
        />
        <CardSeparator />
        <CardRow
          label="Transfer Unsuccessfull"
          content={getMetricOrLoader("transferUnsuccessful")}
        />
        <CardSeparator />
        <CardRow label="Total" content={getMetricOrLoader("totalCalls")} />
      </CardWrapper>
    </ScrollView>
  );
}

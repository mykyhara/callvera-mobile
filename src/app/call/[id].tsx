import { useLocalSearchParams } from "expo-router";

import { ScreenHeader } from "@/components/screen-header";
import { ScreenTemplate } from "@/components/screen-template";
import CallDetails from "@/features/calls/components/call-details";
import {
  CallDetailsLoading,
  CallDetailsNotFound,
} from "@/features/calls/components/call-details-states";
import { useCallDetails } from "@/features/calls/hooks/use-call-details";

export default function CallDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: call, isLoading, refetch, isRefetching } = useCallDetails(id);

  return (
    <ScreenTemplate contentContainerClassName="gap-y-4 pb-0">
      <ScreenHeader title="Call details" withBackButton />
      {isLoading ? (
        <CallDetailsLoading />
      ) : call ? (
        <CallDetails
          call={call}
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      ) : (
        <CallDetailsNotFound />
      )}
    </ScreenTemplate>
  );
}

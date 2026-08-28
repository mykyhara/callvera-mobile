import { View } from "react-native";

import { Text } from "@/components/ui/text";

import { LeadDetailsViewModel } from "../types";

interface LeadDetailsHeaderProps {
  lead: LeadDetailsViewModel;
}

export function LeadDetailsHeader({ lead }: LeadDetailsHeaderProps) {
  return (
    <View className="bg-card border-border pt-safe -mx-4 gap-1 border-b px-4 pb-4 sm:-mx-2 sm:px-2">
      <Text variant="h3">{lead.name ?? "Unknown lead"}</Text>
      <Text variant="muted" className="text-sm">
        {lead.dispositionLabel}
      </Text>

      <View className="mt-1 flex-row gap-4">
        <View className="flex-1 gap-1.5">
          <Text numberOfLines={1} className="text-sm">
            {lead.revenueLabel}
          </Text>
          <Text numberOfLines={1} className="text-sm">
            {lead.createdAtLabel}
          </Text>
        </View>
        <View className="flex-1 gap-1.5">
          <Text numberOfLines={1} className="text-sm">
            {lead.phone ?? "No phone"}
          </Text>
          <Text numberOfLines={1} className="text-sm">
            {lead.email ?? "No email"}
          </Text>
        </View>
      </View>
    </View>
  );
}

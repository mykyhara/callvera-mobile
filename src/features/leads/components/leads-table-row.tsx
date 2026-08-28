import { Pressable } from "react-native";

import { Table } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { LeadRow } from "../types";

interface LeadsTableRowProps {
  item: LeadRow;
  onOpenLead: (id: string) => void;
}

export function LeadsTableRow({ item, onOpenLead }: LeadsTableRowProps) {
  return (
    <Pressable className="active:bg-muted" onPress={() => onOpenLead(item.id)}>
      <Table.Row className="gap-0" pointerEvents="none">
        <Table.Cell className="min-w-0 flex-[2.5]">
          <Text numberOfLines={1}>{item.name ?? "Unknown"}</Text>
          {item.phone && (
            <Text numberOfLines={1} variant="muted" className="text-xs">
              {item.phone}
            </Text>
          )}
        </Table.Cell>
        <Table.Cell className="min-w-0 flex-[2.5]">
          <Text numberOfLines={1} className="text-sm">
            {item.disposition ?? "—"}
          </Text>
        </Table.Cell>
        <Table.Cell className="w-20 flex-none">
          <Text numberOfLines={1} className="text-sm">
            {item.messageCount ?? "—"}
          </Text>
        </Table.Cell>
      </Table.Row>
    </Pressable>
  );
}

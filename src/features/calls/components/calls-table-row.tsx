import { Pressable, View } from "react-native";

import { Table } from "@/components/ui/table";
import { Text } from "@/components/ui/text";
import { formatDuration } from "@/lib/utils";

import { CallRow } from "../types";

export function CallsTableHeaderRow() {
  return (
    <Table.Header>
      <Table.Row className="gap-0">
        <Table.Head className="flex-1 self-start">
          <Text numberOfLines={1}>Customer</Text>
        </Table.Head>
        <Table.Head className="flex-2 self-start">
          <Text numberOfLines={1}>From/To Number</Text>
        </Table.Head>
        <Table.Head className="w-20 flex-none self-start">
          <Text numberOfLines={1}>Duration</Text>
        </Table.Head>
      </Table.Row>
    </Table.Header>
  );
}

interface CallsTableRowProps {
  item: CallRow;
  onOpenCall: (id: string) => void;
}

export function CallsTableRow({ item, onOpenCall }: CallsTableRowProps) {
  return (
    <Pressable className="active:bg-muted" onPress={() => onOpenCall(item.id)}>
      <Table.Row className="gap-0" pointerEvents="none">
        <Table.Cell className="flex-1">
          <Text numberOfLines={1}>{item.customerName || "-"}</Text>
        </Table.Cell>
        <Table.Cell className="flex-2">
          <View>
            <Text numberOfLines={1} variant="muted" className="text-xs">
              From:{" "}
              <Text numberOfLines={1} variant="default" className="text-xs">
                {item.fromNumber}
              </Text>
            </Text>
            <Text numberOfLines={1} variant="muted" className="text-xs">
              To:{" "}
              <Text numberOfLines={1} variant="default" className="text-xs">
                {item.toNumber}
              </Text>
            </Text>
          </View>
        </Table.Cell>
        <Table.Cell className="w-20 flex-none">
          <Text numberOfLines={1} className="text-sm">
            {formatDuration(item.callDuration)}
          </Text>
        </Table.Cell>
      </Table.Row>
    </Pressable>
  );
}

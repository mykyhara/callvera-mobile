import { memo, useCallback } from "react";
import { FlatList, ListRenderItemInfo, RefreshControl } from "react-native";

import { Table } from "@/components/ui/table";
import { Text } from "@/components/ui/text";

import { LeadRow } from "../types";
import { LeadsListEmpty, LeadsListFooter } from "./leads-list-states";
import { LeadsTableRow } from "./leads-table-row";

interface LeadsTableProps {
  rows: LeadRow[];
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onOpenLead: (id: string) => void;
}

function renderSeparator() {
  return <Table.Separator />;
}

const emptyComponent = <LeadsListEmpty />;

function LeadsTableComponent({
  rows,
  refreshing,
  onRefresh,
  onEndReached,
  hasNextPage,
  isFetchingNextPage,
  onOpenLead,
}: LeadsTableProps) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<LeadRow>) => (
      <LeadsTableRow item={item} onOpenLead={onOpenLead} />
    ),
    [onOpenLead],
  );

  return (
    <Table.Root className="flex-1 gap-2">
      <Table.Header>
        <Table.Row className="gap-0">
          <Table.Head className="min-w-0 flex-[2] self-start">
            <Text numberOfLines={1}>Lead</Text>
          </Table.Head>
          <Table.Head className="min-w-0 flex-[3] self-start">
            <Text numberOfLines={1}>Disposition</Text>
          </Table.Head>
          <Table.Head className="w-20 flex-none self-start">
            <Text numberOfLines={1}>Messages</Text>
          </Table.Head>
        </Table.Row>
      </Table.Header>

      <FlatList
        data={rows}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={renderSeparator}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={emptyComponent}
        ListFooterComponent={
          <LeadsListFooter
            isFetchingNextPage={isFetchingNextPage}
            hasReachedEnd={!hasNextPage && rows.length > 0}
          />
        }
        renderItem={renderItem}
      />
    </Table.Root>
  );
}

export const LeadsTable = memo(LeadsTableComponent);

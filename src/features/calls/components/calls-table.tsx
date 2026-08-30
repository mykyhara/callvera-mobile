import { memo, useCallback } from "react";
import { FlatList, ListRenderItemInfo, RefreshControl } from "react-native";

import { Table } from "@/components/ui/table";

import { CallRow } from "../types";
import { CallsListEmpty, CallsListFooter } from "./calls-list-states";
import { CallsTableHeaderRow, CallsTableRow } from "./calls-table-row";

interface CallsTableProps {
  rows: CallRow[];
  refreshing: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onOpenCall: (id: string) => void;
}

function renderSeparator() {
  return <Table.Separator />;
}

const emptyComponent = <CallsListEmpty />;

function CallsTableComponent({
  rows,
  refreshing,
  onRefresh,
  onEndReached,
  hasNextPage,
  isFetchingNextPage,
  onOpenCall,
}: CallsTableProps) {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<CallRow>) => (
      <CallsTableRow item={item} onOpenCall={onOpenCall} />
    ),
    [onOpenCall],
  );

  return (
    <Table.Root className="flex-1">
      <CallsTableHeaderRow />

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
          <CallsListFooter
            isFetchingNextPage={isFetchingNextPage}
            hasReachedEnd={!hasNextPage && rows.length > 0}
          />
        }
        renderItem={renderItem}
      />
    </Table.Root>
  );
}

export const CallsTable = memo(CallsTableComponent);

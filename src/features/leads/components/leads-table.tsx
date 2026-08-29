import { memo, useCallback } from "react";
import { FlatList, ListRenderItemInfo, RefreshControl } from "react-native";

import { Table } from "@/components/ui/table";

import { LeadRow } from "../types";
import { LeadsListEmpty, LeadsListFooter } from "./leads-list-states";
import { LeadsTableHeaderRow, LeadsTableRow } from "./leads-table-row";

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
      <LeadsTableHeaderRow />

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

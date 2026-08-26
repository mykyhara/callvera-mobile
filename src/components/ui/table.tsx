import { View } from "react-native";

import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";

function TableRoot({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <View
      className={cn(
        "bg-card border-border overflow-hidden rounded-xl border",
        className,
      )}
      {...props}
    />
  );
}

function TableHeader({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <TextClassContext.Provider value="text-muted-foreground text-xs font-medium uppercase">
      <View
        className={cn("bg-muted/50 border-border border-b", className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function TableRow({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <View
      className={cn("flex-row items-center px-4 py-3", className)}
      {...props}
    />
  );
}

function TableHead({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn("flex-1 px-1", className)} {...props} />;
}

function TableCell({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn("flex-1 px-1", className)} {...props} />;
}

function TableSeparator({ className }: { className?: string }) {
  return <View className={cn("bg-border h-px", className)} />;
}

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Separator: TableSeparator,
};

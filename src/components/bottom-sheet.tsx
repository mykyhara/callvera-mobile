import * as Gorhom from "@gorhom/bottom-sheet";
import { type BottomSheetModalProps as GorhomBottomSheetModalProps } from "@gorhom/bottom-sheet";
import { ComponentProps, RefObject, useRef } from "react";
import { withUniwind } from "uniwind";

import { useColors } from "@/hooks/use-colors";

export const BottomSheetView = withUniwind(Gorhom.BottomSheetView);
export const BottomSheetScrollView = withUniwind(Gorhom.BottomSheetScrollView);

type BottomSheetBackdropProps = ComponentProps<
  typeof Gorhom.BottomSheetBackdrop
>;

interface BottomSheetModalProps extends GorhomBottomSheetModalProps {
  ref: BottomSheetModalRef;
  disableIndicator?: boolean;
  backdropProps?: Partial<BottomSheetBackdropProps>;
}

const BORDER_TOP_RADIUS = 16;

export const BottomSheetModal = ({
  ref,
  children,
  disableIndicator = true,
  backdropProps,
  snapPoints,
  enableDynamicSizing,
  ...rest
}: BottomSheetModalProps) => {
  const colors = useColors();

  return (
    <Gorhom.BottomSheetModal
      ref={ref}
      enableOverDrag={false}
      snapPoints={snapPoints}
      backgroundStyle={{
        borderTopLeftRadius: BORDER_TOP_RADIUS,
        borderTopRightRadius: BORDER_TOP_RADIUS,
        backgroundColor: colors.background,
      }}
      backdropComponent={(props) => (
        <Gorhom.BottomSheetBackdrop
          opacity={0.75}
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          {...props}
          {...backdropProps}
        />
      )}
      handleIndicatorStyle={disableIndicator ? { display: "none" } : undefined}
      {...rest}
    >
      {children}
    </Gorhom.BottomSheetModal>
  );
};

export type BottomSheetModalRef = RefObject<Gorhom.BottomSheetModal | null>;

export const useBottomSheetModalRef = (): BottomSheetModalRef => useRef(null);

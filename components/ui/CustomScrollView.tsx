import { forwardRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

export const CustomScrollView = forwardRef<any, ScrollViewProps>(
  (props, ref) => {
    return (
      <ScrollView
        contentInset={{ bottom: 0 }}
        scrollIndicatorInsets={{ bottom: 0 }}
        automaticallyAdjustsScrollIndicatorInsets
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        {...props}
        ref={ref}
      />
    );
  }
);

import { Pressable, Text, View, StyleSheet } from "react-native";

export const Chip = ({
  label,
  color = "#00C853",
  onPress,
  selected = false,
}: any) => (
  <Pressable onPress={onPress}>
    <View
      style={[
        styles.chip,
        {
          backgroundColor: selected ? color : "#fff",
          borderColor: selected ? "#222222" : "#D1D5DB",
        },
      ]}
    >
      <Text
        style={[styles.chipText, { color: selected ? "white" : "#222222" }]}
      >
        {label}
      </Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: { fontWeight: "500" },
});

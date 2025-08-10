import { Pressable, Text, StyleSheet } from "react-native";

export const Button = ({ children, onPress, disabled }: any) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={[styles.btn, disabled ? styles.btnDisabled : styles.btnEnabled]}
  >
    <Text style={styles.btnText}>{children}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  btn: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  btnEnabled: { backgroundColor: "#00C853" },
  btnDisabled: { backgroundColor: "#D1D5DB" },
  btnText: { color: "white", fontWeight: "600" },
});

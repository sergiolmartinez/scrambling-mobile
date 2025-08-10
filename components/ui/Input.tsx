import { TextInput, StyleSheet } from "react-native";

export const Input = (props: any) => (
  <TextInput {...props} placeholderTextColor="#888" style={styles.input} />
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: "#222222",
  },
});

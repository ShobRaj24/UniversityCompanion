import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Assignments() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Assignments Screen</Text>

      <Button
        title="All Assignments"
        onPress={() => {
          /* Handle All Assignments action */
        }}
      />
      <Button
        title="Get Assignment"
        onPress={() => {
          /* Handle Get Assignment action */
        }}
      />
      <Button
        title="Update Assignment"
        onPress={() => {
          /* Handle Update Assignment action */
        }}
      />
      <Button
        title="Delete Assignment"
        onPress={() => {
          /* Handle Delete Assignment action */
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

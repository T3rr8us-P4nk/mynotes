import useNote from "@/hooks/useNote";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddNote() {
  const router = useRouter();

  const {
    title,
    setTitle,
    body,
    setBody,
    items,
    setItems,
    storeData,
    removeNote,
    getData,
  } = useNote();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.label}>NEW NOTE</Text>
        <TextInput
          style={styles.input_title}
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          placeholderTextColor="#888"
        />
        <View style={styles.divider} />
        <TextInput
          style={styles.input_body}
          value={body}
          onChangeText={setBody}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          placeholder="Type something here"
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.button_wrap}>
        <Pressable
          style={styles.saveButton}
          onPress={async () => {
            await storeData();
            router.back();
          }}
        >
          <Text style={{ color: "#fff" }}>Add Note</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F4EF",
  },
  top: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  label: {
    fontSize: 10,
    letterSpacing: 1,
    color: "#7A8A99",
    fontWeight: "600",
    marginBottom: 6,
  },
  input_title: {
    fontFamily: "serif",
    fontSize: 34,
    color: "#2B2B2B",
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#DDDAD2",
    marginTop: 14,
    marginBottom: 20,
  },
  input_body: {
    flex: 1,
    fontFamily: "serif",
    fontSize: 16,
    color: "#3A3A3A",
    textAlignVertical: "top",
  },
  saveButton: {
    height: 44,
    backgroundColor: "#1C1C1A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
  },
  button_wrap: {
    padding: 12,
  },
  note: {
    fontSize: 30,
  },
  noteTitle: {
    fontSize: 30,
  },
});

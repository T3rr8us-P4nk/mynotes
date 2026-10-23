import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewNote() {
  const { note_id, note_title, note_body } = useLocalSearchParams<{
    note_id: string;
    note_title: string;
    note_body: string;
  }>();
  const date = new Date(Number(note_id));

  const [newTitle, setNewTitle] = useState(note_title ?? "");
  const [newBody, setNewBody] = useState(note_body ?? "");

  // Edit Notes
  const EditNote = async (noteId: string) => {
    if (newTitle.trim() === "" && newBody.trim() === "") {
      console.log("empty input");
      return false;
    }
    try {
      const jsonValue = await AsyncStorage.getItem("Notes");
      const notes = jsonValue ? JSON.parse(jsonValue) : [];

      const updatedNotes = notes.map((note: any) => {
        if (note.id === noteId) {
          return {
            ...note,
            title: newTitle,
            body: newBody,
          };
        }
        return note;
      });

      await AsyncStorage.setItem("Notes", JSON.stringify(updatedNotes));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // Toast
  const showToast = () => {
    Toast.show("Note Saved", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: false,
      animation: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.label}>{date.toDateString()}</Text>
        <TextInput
          style={styles.input_title}
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <View style={styles.divider} />
        <TextInput
          style={styles.input_body}
          value={newBody}
          onChangeText={setNewBody}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
      <View style={styles.button_wrap}>
        <Pressable
          style={styles.saveButton}
          onPress={async () => {
            const saved = await EditNote(note_id);
            if (saved) {
              showToast();
            }
          }}
        >
          <Text style={{ color: "#fff" }}>Save Note</Text>
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
    margin: 10,
    paddingHorizontal: 5,
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
    color: "#1E1E1E",
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
    textAlignVertical: "top",
    fontFamily: "serif",
    fontSize: 16,
    lineHeight: 26,
    color: "#3A3A3A",
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

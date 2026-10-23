import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Note = {
  id: string;
  title: string;
  body: string;
};

export default function Testing() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [items, setItems] = useState<Note[]>([]);

  // Store and Add Notes
  const storeData = async () => {
    if (title.trim() === "" && body.trim() === "") {
      console.log("empty input");
      return;
    }
    try {
      const jsonValue = await AsyncStorage.getItem("Notes");
      const parsed = jsonValue ? JSON.parse(jsonValue) : [];
      const currentArray = Array.isArray(parsed) ? parsed : [];

      const newNote = {
        id: Date.now().toString(),
        title: title,
        body: body,
      };

      currentArray.push(newNote);
      await AsyncStorage.setItem("Notes", JSON.stringify(currentArray));
      setItems(currentArray);
      setTitle("");
      setBody("");
    } catch (e) {
      console.log(e);
    }
  };

  // Remove Notes
  const removeNote = async (id: string) => {
    try {
      const removeItem = items.filter((item) => item.id !== id);
      setItems(removeItem);
      await AsyncStorage.setItem("Notes", JSON.stringify(removeItem));
    } catch (e) {
      console.log(e);
    }
  };

  // Retrieve Notes
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("Notes");
      console.log(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  useEffect(() => {
    async function load() {
      const save = await getData();
      setItems(save);
    }
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Type title here...."
        />
        <TextInput
          style={styles.bodyInput}
          value={body}
          onChangeText={setBody}
          placeholder="Type body here..."
        />

        <Pressable style={styles.submitButton} onPress={storeData}>
          <Text style={{ color: "#fff" }}>Press Me</Text>
        </Pressable>

        <View>
          {items.map((item) => (
            <View key={item.id}>
              <Text>{item.id}</Text>
              <Text>{item.title}</Text>
              <Text>{item.body}</Text>
              <Button title="Press" onPress={() => removeNote(item.id)} />
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "#20232a",
    marginBottom: 10,
  },
  bodyInput: {
    borderWidth: 1,
    borderColor: "#20232a",
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 10,
    marginTop: 5,
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

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

  return {
    title,
    setTitle,
    body,
    setBody,
    items,
    setItems,
    storeData,
    removeNote,
    getData,
  };
}

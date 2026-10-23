import useNote from "@/hooks/useNote";
import Feather from "@react-native-vector-icons/feather";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SERIF = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: "serif",
});

export default function Homepage() {
  const date = new Date();

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

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      async function load() {
        const save = await getData();
        setItems(save);
      }
      load();
    }, [getData, setItems]),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F5F0" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.date}>{date.toDateString()}</Text>
            <Text style={styles.title}>My notes</Text>
          </View>

          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/AddNote")}
          >
            <Feather name="plus" size={22} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Notes list (one sample card) */}
        <View style={styles.list}>
          {items.map((item) => (
            <View style={styles.card} key={item.id}>
              <View style={styles.cardTop}>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/ViewNote",
                      params: {
                        note_id: item.id,
                        note_title: item.title,
                        note_body: item.body,
                      },
                    })
                  }
                >
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                </Pressable>
                <Pressable
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={() => removeNote(item.id)}
                >
                  <Feather name="trash-2" size={15} color="#9A9A95" />
                </Pressable>
              </View>
              <Text style={styles.cardBody} numberOfLines={3}>
                {item.body}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F7F5F0",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
  },
  date: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.4,
    color: "#8A8A85",
    marginBottom: 2,
  },
  title: {
    fontFamily: SERIF,
    fontSize: 36,
    lineHeight: 42,
    color: "#1C1C1A",
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1C1C1A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#ECE8DF",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: SERIF,
    fontSize: 20,
    color: "#1C1C1A",
  },
  cardBody: {
    fontSize: 12.5,
    lineHeight: 20,
    color: "#6B7280",
  },
});

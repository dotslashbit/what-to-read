import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import * as rssParser from "react-native-rss-parser";

export default function Index() {
  const [rssData, setRssData] = useState(null);

  useEffect(() => {
    const fetchRSSData = async () => {
      try {
        const response = await fetch("https://www.freecodecamp.org/news/rss");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const xml = await response.text();
        const parsedData = await rssParser.parse(xml);
        setRssData(parsedData);
      } catch (error) {
        console.error("Error fetching or parsing RSS data:", error);
      }
    };

    fetchRSSData();
  }, []);

  if (!rssData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => alert(item.title)}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
        <Text>{item.link}</Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text>Title: {rssData.title}</Text>
      <Text>Number of Items: {rssData.items.length}</Text>
      <FlatList
        data={rssData.items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Linking } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

const API_KEY = "965ae43c49ce1253a20b4ff279e60fba"; // Replace with your API key
const API_URL = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=in&keywords=women+safety&languages=en`;

const NewsScreen = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get(API_URL);
            setNews(response.data.data); // Mediastack stores articles in `data`
        } catch (error) {
            console.error("Error fetching news:", error);
        } finally {
            setLoading(false);
        }
    };

    const openArticle = (url) => {
        if (url) {
            Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
        } else {
            alert("No URL available for this article.");
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.newsCard} onPress={() => openArticle(item.url)}>
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.source}>Source: {item.source}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header Section */}  
            <View style={styles.header}>
                <Image source={require("../../assets/images/women-icon.png")} style={styles.logo} />
                <View>
                    <Text style={styles.headerTitle}>NEWS ARTICLES</Text>
                    <Text style={styles.headerSubtitle}>Latest Updates</Text>
                </View>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#FF5733" />
            ) : (
                <FlatList 
                    data={news}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    // Header Styles
    header: {
        backgroundColor: "#ff2e79", // Dark maroon
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    logo: { 
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        marginRight: 10 
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#F9D8E2",
        textTransform: "uppercase",
    },
    headerSubtitle: {
        fontSize: 16,
        fontStyle: "italic",
        color: "#F9D8E2",
    },

    // News Card Styles
    newsCard: {
        margin: 15,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 10 },
    title: { fontSize: 16, fontWeight: "bold", color: "#333" },
    source: { fontSize: 14, color: "#777" },
});

export default NewsScreen;

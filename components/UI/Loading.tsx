import React from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";

export default function Loading() {
    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#2196F3" />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
    },
});
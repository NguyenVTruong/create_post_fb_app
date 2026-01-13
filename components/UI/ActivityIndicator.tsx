import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function Loading() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <ActivityIndicator size="large" color="#4CAF50" />
        </View>
    );
}
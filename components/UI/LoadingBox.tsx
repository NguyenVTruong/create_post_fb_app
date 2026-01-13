import React from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";

export default function LoadingBox({ style }: { style?: any }) {
    return (
        <View style={[styles.box, style]}>
            <ActivityIndicator size="small" color="#2196F3" />
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        // backgroundColor: "rgba(0,0,0,0.1)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        padding: 16,
    },
});
// Cách dùng

// <View style={{ position: "relative" }}>
//     <LoginForm />
//     {loading && (
//         <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
//             <LoadingBox />
//         </View>
//     )}
// </View>
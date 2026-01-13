import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function CustomToast({ visible, onClose, title, message }) {
    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.popup}>
                    {/* Nút đóng (X) */}
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={20} color="#333" />
                    </Pressable>

                    {/* Icon dấu V xanh lá */}
                    <Ionicons name="checkmark-circle" size={30} color="green" />

                    <Text style={styles.title}>{title}</Text>
                    {message ? <Text style={styles.message}>{message}</Text> : null}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    popup: {
        minWidth: 250,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: "green",
        elevation: 5,
        alignItems: "center",
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: 8,
        right: 8,
        padding: 4,
    },
    title: { fontSize: 16, fontWeight: "bold", marginTop: 8, marginBottom: 4 },
    message: { fontSize: 14, color: "#333", textAlign: "center" },
});

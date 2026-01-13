import { View, Text, StyleSheet } from "react-native";
import { ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
    success: ({ text1, text2 }) => (
        <View pointerEvents="box-none" style={styles.overlay}>
            <View style={[styles.popup, { borderColor: "green" }]}>
                <Text style={[styles.title, { color: "green" }]}>{text1}</Text>
                {text2 ? <Text style={styles.message}>{text2}</Text> : null}
            </View>
        </View>
    ),
    error: ({ text1, text2 }) => (
        <View pointerEvents="box-none" style={styles.overlay}>
            <View style={[styles.popup, { borderColor: "red" }]}>
                <Text style={[styles.title, { color: "red" }]}>{text1}</Text>
                {text2 ? <Text style={styles.message}>{text2}</Text> : null}
            </View>
        </View>
    ),
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        justifyContent: "center",  //  canh giữa dọc
        alignItems: "center",      //  canh giữa ngang
        zIndex: 9999,
    },
    popup: {
        minWidth: 250,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    title: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
    message: { fontSize: 14, color: "#333" },
});

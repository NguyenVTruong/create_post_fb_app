import React from "react";
import {
    Modal,
    View,
    Image,
    Pressable,
    StyleSheet,
    Text,
} from "react-native";

type Props = {
    uri: string | null;
    visible: boolean;
    onClose: () => void;
};

export default function ImageDialog({ uri, visible, onClose }: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                {/* Bấm nền đen để đóng */}
                <Pressable style={StyleSheet.absoluteFillObject} onPress={onClose} />

                <View style={styles.content}>
                    {uri ? (
                        <Image source={{ uri }} style={styles.image} resizeMode="contain" />
                    ) : (
                        <Text style={{ color: "#fff" }}>Không có ảnh</Text>
                    )}
                    <Pressable style={styles.closeBtn} onPress={onClose}>
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Đóng</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        alignItems: "center",
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 8,
    },
    closeBtn: {
        marginTop: 12,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: "#444",
        borderRadius: 20,
    },
});

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export interface PhongTro {
    id: string;
    tenPhong: string;
    diaChi: string;
    quan: string;
    gia: number;
    dienTich: number;
    moTa?: string;
    tienDien?: number;
    tienNuoc?: number;
    soNguoiToiDa?: number;
    tienCoc?: number;
    anh: string[];
    trangThai: "trong" | "da_thue";
    createdAt?: string;
}

export default function PhongTroDetailScreen() {
    const params = useLocalSearchParams();

    if (!params.phong || typeof params.phong !== "string") {
        return <Text>Lỗi dữ liệu phòng trọ</Text>;
    }

    const phong = JSON.parse(params.phong);

    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={phong.anh}
                horizontal
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.image} />
                )}
                showsHorizontalScrollIndicator={false}
            />

            <View style={styles.section}>
                <Text style={styles.title}>{phong.tenPhong}</Text>
                <Text style={styles.price}>
                    {phong.gia.toLocaleString()} đ / tháng
                </Text>
                <Text style={styles.address}>
                    {phong.diaChi}, Quận {phong.quan}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Diện tích</Text>
                <Text>{phong.dienTich} m²</Text>

                <Text style={styles.label}>Tiền cọc</Text>
                <Text>{phong.tienCoc?.toLocaleString()} đ</Text>

                <Text style={styles.label}>Số người tối đa</Text>
                <Text>{phong.soNguoiToiDa} người</Text>

                <Text style={styles.label}>Trạng thái</Text>
                <Text
                    style={{
                        color: phong.trangThai === "trong" ? "green" : "red",
                    }}
                >
                    {phong.trangThai === "trong" ? "Còn trống" : "Đã thuê"}
                </Text>
            </View>

            {phong.moTa && (
                <View style={styles.section}>
                    <Text style={styles.label}>Mô tả</Text>
                    <Text>{phong.moTa}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },

    /* IMAGE */
    image: {
        width: 320,
        height: 210,
        marginHorizontal: 8,
        borderRadius: 12,
        backgroundColor: "#eee",
    },

    /* CARD */
    section: {
        backgroundColor: "#fff",
        marginHorizontal: 12,
        marginTop: 12,
        padding: 16,
        borderRadius: 12,
        elevation: 2, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },

    /* TEXT */
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#222",
    },

    price: {
        fontSize: 18,
        fontWeight: "600",
        color: "#e53935",
        marginVertical: 6,
    },

    address: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginTop: 12,
    },

    value: {
        fontSize: 14,
        color: "#555",
        marginTop: 2,
    },

    /* STATUS */
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    statusEmpty: {
        backgroundColor: "#e8f5e9",
    },

    statusRented: {
        backgroundColor: "#ffebee",
    },

    statusTextEmpty: {
        color: "#2e7d32",
        fontWeight: "600",
    },

    statusTextRented: {
        color: "#c62828",
        fontWeight: "600",
    },

    /* DESCRIPTION */
    description: {
        fontSize: 14,
        color: "#444",
        lineHeight: 20,
        marginTop: 6,
    },

    /* ACTION BAR (dùng sau) */
    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },

    actionBtn: {
        flex: 1,
        backgroundColor: "#1976d2",
        paddingVertical: 12,
        marginHorizontal: 6,
        borderRadius: 10,
        alignItems: "center",
    },

    actionText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 15,
    },
});


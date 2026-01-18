import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Modal} from "react-native";

type RoomStatus = "available" | "rented" | "holding";

const STATUS_MAP = {
    available: { label: "Còn trống", color: "#22c55e" },
    rented: { label: "Đã thuê", color: "#ef4444" },
    holding: { label: "Giữ chỗ", color: "#f59e0b" },
};
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";
import {router} from "expo-router";
// TODO: Expo Bare share nhiêu ảnh
// import Share from "react-native-share";

export const shareMultipleImages = async (imageUrls: string[]) => {
    try {
        // await Share.open({
        //     title: "Chia sẻ phòng trọ",
        //     message: "Phòng trọ giá tốt – liên hệ ngay",
        //     urls: imageUrls, // 👈 MẢNG ẢNH
        //     failOnCancel: false,
        // });
    } catch (e) {
        console.log("Share error:", e);
    }
};


export function RoomCard({ room }: { room: any }) {
    // @ts-ignore
    const status = STATUS_MAP[room.status];

    return (
        <>

            <View style={roomStyles.card}>
                {/* Slider ảnh */}
                <FlatList
                    data={room.images}
                    horizontal
                    keyExtractor={(item, index) => item + index}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={roomStyles.image}
                            onError={() => console.log("Image error:", item)}
                        />
                    )}
                />


                {/*<View style={[roomStyles.badge, { backgroundColor: status.color }]}>*/}
                {/*    <Text style={roomStyles.badgeText}>{status.label}</Text>*/}
                {/*</View>*/}

                <View style={roomStyles.body}>
                    <Text style={roomStyles.title}>{room.name}</Text>
                    <Text style={roomStyles.price}>
                        {room.price.toLocaleString()}/tháng
                    </Text>
                    <Text style={roomStyles.address} numberOfLines={1}>
                        {room.address}
                    </Text>

                    <View style={roomStyles.meta}>
                        <Text>{room.area} m²</Text>
                        {/*<Text>Tầng {room.floor}</Text>*/}
                    </View>

                    <View style={roomStyles.actions}>
                        <TouchableOpacity style={roomStyles.callBtn} onPress={() => shareMultipleImages(room.images)} >
                            <Text style={roomStyles.callText}>Chia sẻ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={roomStyles.detailBtn}
                            onPress={() => {
                                router.push({
                                    pathname: "/PhongTroDetail/PhongTroDetailScreen",
                                    params: {
                                        phong: JSON.stringify(room),
                                    },
                                });
                            }}
                        >
                            <Text style={roomStyles.detailText}>Chi tiết</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>

    );
}

const roomStyles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
        overflow: "hidden",
        elevation: 3,
    },

    image: {
        width: 220,
        height: 150,
        marginRight: 12,
    },
    badge: {
        position: "absolute",
        top: 12,
        left: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    body: {
        padding: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },
    price: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2563eb",
        marginVertical: 4,
    },
    address: {
        fontSize: 13,
        color: "#6b7280",
    },
    meta: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    actions: {
        flexDirection: "row",
        marginTop: 12,
    },
    callBtn: {
        flex: 1,
        backgroundColor: "#22c55e",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 8,
    },
    callText: {
        color: "#fff",
        fontWeight: "600",
    },
    detailBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#2563eb",
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    detailText: {
        color: "#2563eb",
        fontWeight: "600",
    },
});

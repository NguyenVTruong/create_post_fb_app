import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    FlatList, Platform, SafeAreaView, TouchableOpacity,
} from "react-native";
import {router, Stack, useLocalSearchParams} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Feather";

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
    console.log(params);

    if (!params.phong || typeof params.phong !== "string") {
        return <Text>Lỗi dữ liệu phòng trọ</Text>;
    }
    console.log(JSON.parse(params.phong));
    const phong = JSON.parse(params.phong);

    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: "#fff",
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
                <View
                    style={{
                        height: 50,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 10,
                        backgroundColor: "#fff",
                        borderBottomWidth: 1,
                        borderColor: "#eee",
                    }}
                >
                    {/* Back */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{width: 40, height: 40, justifyContent: "center", alignItems: "center"}}
                    >
                        <Ionicons name="chevron-back" size={24} color="#000"/>
                    </TouchableOpacity>

                    {/* Title */}
                    <Text
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            fontSize: 18,
                            fontWeight: "600",
                            color: "#000",
                        }}
                    >
                        Chi tiết
                    </Text>

                    {/* Delete */}
                    <TouchableOpacity
                        onPress={() => setShowFilterModel(true)}
                        style={{
                            marginLeft: "auto",
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >

                        <Icon name="share" size={18} color="#000"/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.container}>
                    <FlatList
                        data={phong.images}
                        horizontal
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({item}) => (
                            <Image source={{uri: item}} style={styles.image}/>
                        )}
                        style={{marginTop: 10}}
                        showsHorizontalScrollIndicator={false}
                    />

                    <View style={styles.section}>
                        <Text style={styles.price}>
                            {phong.price.toLocaleString()} đ / tháng
                        </Text>
                        <Text style={styles.address}>
                            {phong.address}
                        </Text>
                    </View>

                    <View style={styles.section}>
                        {
                            phong.area && (<>
                                    <Text style={styles.label}>Diện tích</Text>

                                    <Text>{phong.area.match(/\d+/)[0]} m²</Text>

                            </>
                            )
                        }

                        <Text style={styles.label}>Trạng thái</Text>
                        <Text
                            style={{
                                color: phong.trangThai === "trong" ? "red" : "green",
                            }}
                        >
                            {phong.trangThai === "trong" ? "" : "Còn trống"}
                        </Text>
                    </View>

                    {phong.content && (
                        <View style={styles.section}>
                            <Text style={styles.label}>Mô tả</Text>
                            <Text>{phong.content}</Text>
                        </View>
                    )}

                </ScrollView>
            </SafeAreaView>
        </>
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
        shadowOffset: {width: 0, height: 2},
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


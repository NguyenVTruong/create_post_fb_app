import {useEffect, useState} from "react";
import {getPhongTro} from "@/service/phongtro.service";
import {
    FlatList,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Modal from "react-native-modal";

import {RoomCard} from "@/components/RoomCard";
import {router, Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import {Ionicons} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Feather";

export interface Room {
    id: string;
    name: string;
    price: number;
    address: string;
    area: number;
    floor: number;
    status: "available" | "rented" | "holding";
    image: string;
}

export const parseAndNormalizeDriveUrls = (raw?: string): string[] => {
    if (!raw || typeof raw !== "string") return [];

    return raw
        .split(",")                 // tách theo dấu phẩy
        .map((url) => url.trim())   // xoá khoảng trắng
        .filter(Boolean)
        .map((url) => {
            // open?id=
            if (url.includes("drive.google.com/open?id=")) {
                const fileId = url.split("id=")[1];
                return `https://drive.google.com/uc?export=view&id=${fileId}`;
            }

            // file/d/.../view
            if (url.includes("drive.google.com/file/d/")) {
                const fileId = url.split("/d/")[1].split("/")[0];
                return `https://drive.google.com/uc?export=view&id=${fileId}`;
            }

            return url;
        });
};

const DISTRICTS = [
    "Quận 1",
    "Quận 3",
    "Quận 5",
    "Quận 7",
    "Quận 10",
    "Thủ Đức",
    "Bình Thạnh",
    "Gò Vấp",
    'Hoàn Kiếm',
    'Đống Đa',
    'Ba Đình',
    'Hai Bà Trưng',
    'Hoàng Mai',
    'Thanh Xuân',
    'Long Biên',
    'Nam Từ Liêm',
    'Bắc Từ Liêm',
    'Tây Hồ',
    'Cầu Giấy',
    'Hà Đông'
];

export default function TabOneScreen() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilterModel, setShowFilterModel] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");
    const [district, setDistrict] = useState("");

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const data = await getPhongTro();
            console.log(data);
            const normalized = data.data.map((item: any, index: number) => ({
                id: item.id ?? index.toString(),
                name: item.name ?? "Phòng trọ",
                price: item.price ?? "Liên hệ",
                area: item.area ?? "Liên hệ",
                address: item.address ?? "",
                images: parseAndNormalizeDriveUrls(item.imageUrl), // 👈 QUAN TRỌNG
            }));
            setRooms(normalized);

            setError(null);
        } catch (err) {
            console.error(err);
            setError("Không thể tải danh sách phòng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    // /** Loading */
    // if (loading) {
    //     return (
    //         <View style={styles.container}>
    //             <ActivityIndicator size="large" color="#2563eb" />
    //         </View>
    //     );
    // }


    function onPressClearSearch() {

    }

    function onPressSearch() {

    }

    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: "#fff",
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
                <Modal
                    isVisible={showFilterModel}
                    onBackdropPress={() => setShowFilterModel(false)}
                    onSwipeComplete={() => setShowFilterModel(false)}
                    swipeDirection="down"
                    backdropOpacity={0.1}
                    style={{ justifyContent: "flex-end", margin: 0, height: '80%' }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            padding: 16,
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            height: "80%",
                        }}
                    >
                        {/* Header */}
                        <View
                            style={{
                                alignItems: "center",
                                marginBottom: 12,
                            }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    height: 4,
                                    borderRadius: 2,
                                    backgroundColor: "#e5e7eb",
                                    marginBottom: 8,
                                }}
                            />
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>
                                Bộ lọc tìm kiếm
                            </Text>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Giá */}
                            <Text style={labelStyle}>Khoảng giá (VNĐ)</Text>
                            <View style={{ flexDirection: "row", gap: 12 }}>
                                <TextInput
                                    placeholder="Từ"
                                    keyboardType="numeric"
                                    value={priceFrom}
                                    onChangeText={setPriceFrom}
                                    style={inputStyle}
                                />
                                <TextInput
                                    placeholder="Đến"
                                    keyboardType="numeric"
                                    value={priceTo}
                                    onChangeText={setPriceTo}
                                    style={inputStyle}
                                />
                            </View>

                            {/* Quận / Huyện */}
                            <Text style={labelStyle}>Quận / Huyện</Text>
                            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                                {DISTRICTS.map((item) => (
                                    <TouchableOpacity
                                        key={item}
                                        onPress={() => setDistrict(item)}
                                        style={{
                                            paddingVertical: 8,
                                            paddingHorizontal: 12,
                                            borderRadius: 20,
                                            borderWidth: 1,
                                            borderColor: district === item ? "#2563eb" : "#e5e7eb",
                                            backgroundColor: district === item ? "#2563eb" : "#fff",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: district === item ? "#fff" : "#374151",
                                            }}
                                        >
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

                        {/* Footer */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: 16,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setPriceFrom("");
                                    setPriceTo("");
                                    setDistrict("");
                                }}
                            >
                                <Text style={{ color: "#9ca3af", fontWeight: "600" }}>
                                    Xóa tất cả
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    onPressSearch({ priceFrom, priceTo, district });
                                    setShowFilterModel(false);
                                }}
                                style={{
                                    backgroundColor: "#2563eb",
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 10,
                                }}
                            >
                                <Text style={{ color: "#fff", fontWeight: "600" }}>
                                    Tìm kiếm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
                        Phòng trọ
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

                        <Icon name="sliders" size={18} color="#000"/>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={rooms}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <RoomCard room={item}/>}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={fetchRooms}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Không có phòng trọ</Text>
                        </View>
                    }
                />
            </SafeAreaView>


        </>
    );
}

const labelStyle = {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: "#111827",
};

const inputStyle = {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
};

const styles = StyleSheet.create({
    /** Container chính */
    container: {
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingTop: 50,
    },

    /** Title */
    title: {
        fontSize: 20,
        fontWeight: "800",
        color: "#111827",
        paddingHorizontal: 16,
        marginBottom: 12,
    },

    /** FlatList */
    listContent: {
        paddingBottom: 120, // chừa chỗ cho FAB / bottom tab
    },

    /** Empty state */
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 80,
    },
    emptyText: {
        fontSize: 16,
        color: "#6b7280",
        marginTop: 12,
    },

    /** Floating Action Button (thêm phòng / lọc) */
    fab: {
        position: "absolute",
        right: 20,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111827",
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 5},
    },
    fabText: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "700",
    },

    /** Header filter (sau này dùng) */
    filterRow: {
        flexDirection: "row",
        paddingHorizontal: 16,
        marginBottom: 8,
        gap: 10,
    },
    filterItem: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#E5E7EB",
    },
    filterItemActive: {
        backgroundColor: "#2563EB",
    },
    filterText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#374151",
    },
    filterTextActive: {
        color: "#fff",
    },

    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0)",
    },
    bottomSheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 30,
    },
    dragIndicator: {alignItems: "center", marginBottom: 10},
    dragBar: {
        width: 50,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#ccc",
    },
    title: {fontSize: 20, fontWeight: "bold", marginBottom: 8},
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'ios' ? 10 : 2,   // 🔥 Android nhỏ hơn
        marginBottom: 14,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 15,
        color: "#333",
        fontWeight: "bold",
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#555",
        marginBottom: 5,
    },
    item: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 10,
    },
    itemTitle: {fontWeight: "600", fontSize: 15, color: "#333"},
    itemDesc: {fontSize: 13, color: "#777"},
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    searchButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ff385c",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
});


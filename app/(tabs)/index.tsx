import {useEffect, useState} from "react";
import {getPhongTro} from "@/service/phongtro.service";
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import {RoomCard} from "@/components/RoomCard";

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


export default function TabOneScreen() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const data = await getPhongTro();
            const normalized = data.data.map((item: any, index: number) => ({
                id: item.id ?? index.toString(),
                name: item.name ?? "Phòng trọ",
                price: item.price ?? "Liên hệ",
                address: item.address ?? "",
                images: parseAndNormalizeDriveUrls(item.imageUrl), // 👈 QUAN TRỌNG
            }));
            setRooms(normalized );

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



    return (
        <>
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách phòng trọ</Text>

            <FlatList
                data={rooms}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <RoomCard room={item} />}
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
        </View>
        </>
    );
}


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
        shadowOffset: { width: 0, height: 5 },
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
});


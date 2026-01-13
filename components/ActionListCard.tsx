import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

export type ActionItem = {
    id: string;
    title: string;
    subtitle?: string;
    // dùng emoji làm icon nhẹ nhàng, có thể thay bằng react-native-vector-icons sau
    icon?: string;             // ví dụ "📝"
    tone?: "default" | "danger"; // để tô màu cho logout
};

type Props = {
    title?: string;
    items: ActionItem[];
    onPress: (id: string) => void;
};

export default function ActionListCard({ title = "Hành động", items, onPress }: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.list}>
                {items.map((it, idx) => {
                    const isLast = idx === items.length - 1;
                    return (
                        <View key={it.id}>
                            <Pressable
                                onPress={() => onPress(it.id)}
                                style={({ pressed }) => [
                                    styles.row,
                                    pressed && { opacity: 0.85 },
                                ]}
                            >
                                {it.icon ? (
                                    <Icon
                                        name={it.icon}          // ví dụ "user", "calendar", "sign-out-alt"
                                        size={12}
                                        color={it.tone === 'danger' ? '#DC2626' : '#374151'}
                                        style={styles.icon}
                                    />
                                ) : (
                                    <View style={styles.iconPlaceholder} />
                                )}
                                <View style={styles.textBox}>
                                    <Text
                                        style={[
                                            styles.titleRow,
                                            it.tone === "danger" && { color: "#DC2626" },
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {it.title}
                                    </Text>
                                    {it.subtitle ? (
                                        <Text style={styles.subtitle} numberOfLines={1}>
                                            {it.subtitle}
                                        </Text>
                                    ) : null}
                                </View>
                                {/*<Text style={styles.chev}>{">"}</Text>*/}
                            </Pressable>

                            {!isLast && <View style={styles.separator} />}
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 8,
        marginHorizontal: 16,
        marginTop: 12,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    list: {
        paddingHorizontal: 8,
        paddingBottom: 6,
    },
    row: {
        minHeight: 52,
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: { fontSize: 20, width: 28, textAlign: "center" },
    iconPlaceholder: { width: 28 },
    textBox: { flex: 1, marginLeft: 6 },
    titleRow: { fontSize: 15, fontWeight: "600", color: "#111827" },
    subtitle: { fontSize: 12, color: "#6B7280", marginTop: 2 },
    chev: { fontSize: 18, color: "#9CA3AF", paddingLeft: 8 },
    separator: { height: 1, backgroundColor: "#E5E7EB", marginLeft: 44 },
});
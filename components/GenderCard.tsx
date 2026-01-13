import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Platform} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function GenderCardExample({ onSendDataSession }: any) {
    const [malePrice, setMalePrice] = useState(75000);
    const [femalePrice, setFemalePrice] = useState(50000);
    const levels = ["Yếu", "TB-", "TB", "TB+", "Khá", "Khá+"];
    const [selectedMaleLevels, setSelectedMaleLevels] = useState([]);
    const [selectedFemaleLevels, setSelectedFemaleLevels] = useState([]);

    useEffect(() => {
        onSendDataSession({ malePrice: malePrice, femalePrice: femalePrice, selectedMaleLevels: selectedMaleLevels, selectedFemaleLevels: selectedFemaleLevels }); // mỗi khi selectedLevels thay đổi → gọi cha
    }, [selectedMaleLevels, selectedFemaleLevels, malePrice, femalePrice]);


    const updateMalePrice = (price: number) => {
        setMalePrice(price);
    };

    const updateFemalePrice = (price: number) => {
        setFemalePrice(price);
    };

    const toggleMaleLevel = (level) => {
        if (selectedMaleLevels.includes(level)) {
            // nếu đã chọn rồi → bỏ chọn
            setSelectedMaleLevels(selectedMaleLevels.filter((item) => item !== level));
        } else {
            // nếu chưa chọn → thêm vào
            setSelectedMaleLevels([...selectedMaleLevels, level]);
        }
    };

    const toggleFemaleLevel = (level) => {
        if (selectedFemaleLevels.includes(level)) {
            // nếu đã chọn rồi → bỏ chọn
            setSelectedFemaleLevels(selectedFemaleLevels.filter((item) => item !== level));
        } else {
            // nếu chưa chọn → thêm vào
            setSelectedFemaleLevels([...selectedFemaleLevels, level]);
        }
    };
    return (
        <View style={styles.container}>
            {/* Card Nam */}
            <View style={[styles.card, { backgroundColor: "#F5F7FF" }]}>
                <FontAwesome name="user" size={40} color="#3366FF" />
                <Text style={styles.genderText}>Nam</Text>

                <View style={styles.levelContainer}>
                    {levels.map((level) => (
                        <TouchableOpacity key={level} onPress={() => toggleMaleLevel(level)}>
                            <Text
                                style={[
                                    styles.level,
                                    selectedMaleLevels.includes(level) && styles.levelActive,
                                ]}
                            >
                                {level}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.price}>{malePrice.toLocaleString("vi-VN")} đ</Text>

                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.circleBtn, { borderColor: "#3366FF" }]}
                        onPress={() => updateMalePrice(Math.max(0, malePrice - 5000))}
                    >
                        <Text style={[styles.circleBtnText, { color: "#3366FF" }]}>−</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.circleBtn, { borderColor: "#3366FF" }]}
                        onPress={() => updateMalePrice(Math.max(0, malePrice + 5000))}
                    >
                        <Text style={[styles.circleBtnText, { color: "#3366FF" }]}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Card Nữ */}
            <View style={[styles.card, { backgroundColor: "#FFF5FA" }]}>
                <FontAwesome name="user" size={40} color="#FF3399" />
                <Text style={styles.genderText}>Nữ</Text>

                <View style={styles.levelContainer}>
                    {levels.map((level) => (
                        <TouchableOpacity key={level} onPress={() => toggleFemaleLevel(level)}>
                            <Text
                                style={[
                                    styles.level,
                                    selectedFemaleLevels.includes(level) && styles.levelFemaleActive,
                                ]}
                            >
                                {level}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.price}>{femalePrice.toLocaleString("vi-VN")} đ</Text>

                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.circleBtn, { borderColor: "#FF3399" }]}
                        onPress={() => updateFemalePrice(Math.max(0, femalePrice - 5000))}
                    >
                        <Text style={[styles.circleBtnText, { color: "#FF3399" }]}>−</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.circleBtn, { borderColor: "#FF3399" }]}
                        onPress={() => updateFemalePrice(Math.max(0, femalePrice + 5000))}
                    >
                        <Text style={[styles.circleBtnText, { color: "#FF3399" }]}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    card: {
        width: 150,
        borderRadius: 16,
        padding: Platform.OS === "ios" ? 16 : 5,
        alignItems: "center",
    },
    genderText: {
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 8,
    },
    levelContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 10,
        gap: 6,
    },
    level: {
        backgroundColor: "#eee",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
        fontSize: 13,
        margin: 3,
    },
    levelActive: {
        backgroundColor: "#3366FF",
        color: "#fff",
    },

    levelFemaleActive: {
        backgroundColor: "#FF3399FF",
        color: "#fff",
    },
    price: {
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 8,
    },
    row: {
        flexDirection: "row",
        gap: 16,
        marginTop: 8,
    },
    circleBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    circleBtnText: {
        fontSize: 24,
        fontWeight: "bold",
    },
});

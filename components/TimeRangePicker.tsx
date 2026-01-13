import React, {useState} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function TimeRangePicker() {
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [mode, setMode] = useState<"start" | "end">("start");
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    const showPicker = (type: "start" | "end") => {
        setMode(type);
        setPickerVisible(true);
    };

    const hidePicker = () => {
        setPickerVisible(false);
    };

    const handleConfirm = (date: Date) => {
        if (mode === "start") {
            setStartTime(date);
        } else {
            setEndTime(date);
        }
        hidePicker();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Chọn thời gian chơi cầu lông</Text>

            <View style={styles.row}>
                <Button title="Chọn giờ bắt đầu" onPress={() => showPicker("start")} />
                <Text style={styles.time}>
                    {startTime ? startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}
                </Text>
            </View>

            <View style={styles.row}>
                <Button title="Chọn giờ kết thúc" onPress={() => showPicker("end")} />
                <Text style={styles.time}>
                    {endTime ? endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}
                </Text>
            </View>

            <DateTimePickerModal
                isVisible={isPickerVisible}   // phải là true thì mới hiện
                mode="time"
                display="spinner"
                onConfirm={handleConfirm}
                onCancel={hidePicker}
                is24Hour={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: 18,
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    time: {
        marginLeft: 15,
        fontSize: 16,
        fontWeight: "bold",
    },
});

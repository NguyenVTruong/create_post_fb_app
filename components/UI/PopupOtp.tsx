import React, {useEffect, useRef, useState} from "react";
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface PopupOtpProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (otp: string) => void;
    length?: number;
    email?: string;
    errorMessage?: string;
}

const PopupOtp: React.FC<PopupOtpProps> = ({
                                               visible,
                                               onClose,
                                               onConfirm,
                                               length = 4,
                                                email, errorMessage = ''
                                           }) => {
    const [digits, setDigits] = useState<string[]>(Array(length).fill(""));
    const [timeLeft, setTimeLeft] = useState(300); // 5 phút
    const inputsRef = useRef<Array<TextInput | null>>([]);
    const [lengthOtpCrr, setLengthOtpCrr] = useState(0); // 5 phút

    // Reset khi popup mở
    useEffect(() => {
        if (visible) {
            setDigits(Array(length).fill(""));
            setTimeLeft(300);
            setTimeout(() => inputsRef.current[0]?.focus(), 200);
        }
    }, [visible]);

    // Countdown
    useEffect(() => {
        if (!visible) return;

        if (timeLeft === 0) {
            onClose(); // hết 5 phút → đóng popup
            return;
        }

        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, visible]);

    // Khi đủ OTP → auto confirm
    useEffect(() => {
        if (digits.every(d => d !== "")) {
            const otp = digits.join("");
            setLengthOtpCrr(otp.length);
            if(otp.length === length) {
                onConfirm(otp);
            }
        }
    }, [digits]);

    const handleChange = (text: string, index: number) => {
        if (!/^[0-9]?$/.test(text)) return;

        const newDigits = [...digits];
        newDigits[index] = text;
        setDigits(newDigits);

        // move to next input
        if (text && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === "Backspace" && digits[index] === "" && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const formatTime = () => {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        return `${m}:${s < 10 ? "0" + s : s}`;
    };

    return (
        <Modal visible={visible} transparent animationType="fade">

            <View style={styles.overlay}>

                <View style={styles.container}>
                    <View style={styles.popupHeader}>
                        <View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={onClose}>
                                <FontAwesome size={30} name='close'/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={styles.title}>Nhập mã OTP</Text>
                    <Text style={styles.desc}>Mã OTP đã gửi đến email của bạn, vui lòng nhập trong {formatTime()}</Text>

                    <View style={styles.otpRow}>
                        {digits.map((digit, i) => (
                            <TextInput
                                key={i}
                                ref={(ref) => (inputsRef.current[i] = ref)}
                                style={styles.otpBox}
                                keyboardType="number-pad"
                                maxLength={1}
                                value={digit}
                                onChangeText={(t) => handleChange(t, i)}
                                onKeyPress={(e) => handleKeyPress(e, i)}
                            />
                        ))}
                    </View>
                    {
                        errorMessage && lengthOtpCrr === length && (
                            <Text style={styles.timer}>{errorMessage}</Text>
                        )
                    }
                    {/*<Text style={styles.timer}>OTP không hợp lệ hoặc đã hết hạn</Text>*/}
                </View>
            </View>
        </Modal>
    );
};

export default PopupOtp;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "88%",
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 16,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        alignItems: "center",
    },
    popupHeader: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 6,
    },
    desc: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    otpRow: {
        flexDirection: "row",
        gap: 14,
        marginBottom: 20,
    },
    otpBox: {
        width: 55,
        height: 55,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#999",
        fontSize: 26,
        textAlign: "center",
        fontWeight: "600",
        backgroundColor: "#fafafa",
    },
    timer: {
        fontSize: 15,
        color: "#ef4444",
        marginBottom: 10,
    },
    closeBtn: {
        backgroundColor: "#2563eb",
        paddingVertical: 10,
        paddingHorizontal: 28,
        borderRadius: 10,
    },
    closeText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

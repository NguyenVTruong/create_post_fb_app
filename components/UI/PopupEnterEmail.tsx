import React, {useEffect, useRef, useState} from "react";
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {handlePress} from "react-native-paper/lib/typescript/components/RadioButton/utils";

interface PopupEnterEmailProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (email: string) => void;
    email?: string;
    errorMessage?: string;
}

const PopupEnterEmail: React.FC<PopupEnterEmailProps> = ({
                                               visible,
                                               onClose,
                                               onConfirm,
                                                errorMessage = ''
                                           }) => {
    const [email, setEmail] = useState('');
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.popupHeader}>
                        <View />
                        <TouchableOpacity onPress={onClose}>
                            <FontAwesome name="close" size={22} color="#333" />
                        </TouchableOpacity>
                    </View>

                    {/* Content */}
                    <Text style={styles.title}>Nhập email</Text>
                    <Text style={styles.desc}>
                        Nhập email đã đăng ký để nhận mã OTP
                    </Text>

                    <TextInput
                        placeholder="Email của bạn"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#666"
                    />
                    {
                        errorMessage && (
                            <Text style={styles.messageError}>{errorMessage}</Text>
                        )
                    }

                    <TouchableOpacity style={styles.button} onPress={() => onConfirm(email)}>
                        <Text style={styles.buttonText}>Gửi email</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

export default PopupEnterEmail;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    popupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    desc: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 16,
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 15,
        marginBottom: 16,
    },
    button: {
        height: 44,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    messageError: {
        fontSize: 15,
        color: "#ef4444",
        marginBottom: 10,
    },
});

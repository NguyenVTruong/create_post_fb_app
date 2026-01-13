import React, {useEffect, useRef, useState} from "react";
import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {handlePress} from "react-native-paper/lib/typescript/components/RadioButton/utils";

interface PopupUpdatePasswordProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (password: string, rePassword: string) => void;
    email?: string;
    errorMessage?: string;
}

const PopupUpdatePassword: React.FC<PopupUpdatePasswordProps> = ({
                                               visible,
                                               onClose,
                                               onConfirm,
                                                errorMessage = ''
                                           }) => {
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
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
                    <Text style={styles.title}>Cập nhật mật khẩu</Text>


                    <TextInput
                        placeholder="Mật khẩu mới"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#666"
                    />

                    <TextInput
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        style={styles.input}
                        value={rePassword}
                        onChangeText={setRePassword}
                        placeholderTextColor="#666"
                    />

                    <TouchableOpacity style={styles.button} onPress={() => onConfirm(password, rePassword)}>
                        <Text style={styles.buttonText}>Cập nhật mật khẩu</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

export default PopupUpdatePassword;

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
});

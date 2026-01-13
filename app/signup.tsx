import React, {useEffect, useState} from 'react';
import {Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {SplashScreen, useRouter} from 'expo-router';
import axios from 'axios';
import {Ionicons} from "@expo/vector-icons";
import {API_AUTH_URL} from '../constants/Contants';
import {Asset} from "expo-asset";
import PopupOtp from "@/components/UI/PopupOtp";
import PopupEnterEmail from "@/components/UI/PopupEnterEmail";

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [agree, setAgree] = useState(false);
    const [secure, setSecure] = useState(true);
    const [secure2, setSecure2] = useState(true);
    const router = useRouter();
    const [otpModal, setOtpModal] = useState(false);
    const [error, setError] = useState('');
    const [otpError, setOtpError] = useState('');

    // load và cache trước khi render UI
    const [ready, setReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // preload logo
                await Asset.loadAsync([require('@/assets/images/icon.png')]);
            } finally {
                setReady(true);
                await SplashScreen.hideAsync();
            }
        }
        prepare();
    }, []);

    if (!ready) return null;

    const handleSignUp = async () => {
        if (!email|| !password || !rePassword) {
            return Alert.alert('Vui lòng điền đầy đủ thông tin.');
        }
        if (password !== rePassword) {
            return Alert.alert('Mật khẩu không khớp.');
        }
        // if (!agree) {
        //     return Alert.alert('Bạn cần đồng ý với điều khoản.');
        // }

        try {
            const data = {
                email: email,
                password: password,
                username: username
            }
            const res = await axios.post(API_AUTH_URL + '/api/v1/sendOTP', data);
            setError('');
            setOtpModal(true);
            // router.replace('/login');
        } catch (error) {
            // console.error("API Error:", error.response?.data.message);
            setError(error.response?.data.message || "Email không hợp")

        }
    };

    const handleConfirmOtp = async (otp: string) => {
        try {
            const data = {
                otp: otp,
                email: email,
                password: password,
                username: username
            }
            const res = await axios.post(API_AUTH_URL + '/api/v1/signUp', data);
            router.replace('/login');
        } catch (error) {
            // console.error("API Error:", error.response?.data.message);
            setOtpError(error.response?.data.message);
        }
    };

    const closeOtpModel = async () => {
        setOtpModal(false);
        setOtpError("");
    };

    return (
        <>
            <PopupOtp
                visible={otpModal}
                onClose={closeOtpModel}
                onConfirm={handleConfirmOtp}
                email={email}
                errorMessage={otpError}
            />
            {/*<TouchableWithoutFeedback onPress={Keyboard.dismiss}>*/}
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/icon.png')}
                style={styles.icon}
            />
            {/*<Image*/}
            {/*    source={require('../assets/images/icon.png')}*/}
            {/*    style={styles.icon}*/}
            {/*/>*/}
            <Text style={styles.title}>Vụt nào</Text>
            <Text style={styles.subtitle}>Hãy đăng ký tài khoản và vụt ngay nào</Text>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab]}  onPress={() => router.push('/login')}>
                    <Text style={styles.tabText}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab,styles.tabActive]}>
                    <Text style={styles.tabTextActive}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            {/*<View style={styles.inputBox}>*/}
            {/*    <TextInput*/}
            {/*        style={styles.input}*/}
            {/*        placeholder="Họ và tên"*/}
            {/*        value={name}*/}
            {/*        onChangeText={setName}*/}
            {/*    />*/}
            {/*</View>*/}
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(t) => {
                        setEmail(t);
                        setError('');
                    }}
                />
            </View>

            {/*<View style={styles.inputBox}>*/}
            {/*    <TextInput*/}
            {/*        style={styles.input}*/}
            {/*        placeholder="Tên đăng nhập"*/}
            {/*        keyboardType="email-address"*/}
            {/*        value={username}*/}
            {/*        onChangeText={(t) => {*/}
            {/*            setUsername(t);*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</View>*/}
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {/*<View style={styles.inputBox}>*/}
            {/*    <TextInput*/}
            {/*        style={styles.input}*/}
            {/*        placeholder="Số điện thoại"*/}
            {/*        keyboardType="email-address"*/}
            {/*        value={phoneNumber}*/}
            {/*        onChangeText={setPhoneNumber}*/}
            {/*    />*/}
            {/*</View>*/}

            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secure}
                />
                <TouchableOpacity onPress={() => setSecure(!secure)}>
                    <Ionicons
                        name={secure ? 'eye-off' : 'eye'}
                        size={20}
                        color="#999"
                        style={{ marginRight: 10 }}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập lại mật khẩu"
                    value={rePassword}
                    onChangeText={setRePassword}
                    secureTextEntry={secure2}
                />
                <TouchableOpacity onPress={() => setSecure2(!secure2)}>
                    <Ionicons
                        name={secure ? 'eye-off' : 'eye'}
                        size={20}
                        color="#999"
                        style={{ marginRight: 10 }}
                    />
                </TouchableOpacity>
            </View>


            {/* Checkbox */}
            {/*<TouchableOpacity*/}
            {/*    style={styles.checkboxRow}*/}
            {/*    onPress={() => setAgree(!agree)}*/}
            {/*>*/}
            {/*    <View style={styles.checkbox}>*/}
            {/*        {agree && <View style={styles.checkboxInner} />}*/}
            {/*    </View>*/}
            {/*    <Text style={styles.checkboxText}>Tôi đồng ý với điều khoản</Text>*/}
            {/*</TouchableOpacity>*/}

            {/* Button */}
            <TouchableOpacity style={styles.signupButton} onPress={async () => await handleSignUp()}>
                <Text style={styles.signupButtonText}>Đăng ký</Text>
            </TouchableOpacity>
        </View>
            {/*</TouchableWithoutFeedback>*/}
        </>
    );
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        marginBottom: 10,
    },
    container: { padding: 24, paddingTop: 60 },
    icon: {
        width: 40,
        height: 40,

        borderRadius: 8,
        marginBottom: 12,
        alignSelf: 'center',
        resizeMode: "contain",
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        textAlign: 'center',
        color: '#888',
        marginBottom: 24,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
    },
    inputInner: {
        flex: 1,
        fontSize: 16,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#888',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxInner: {
        width: 10,
        height: 10,
        backgroundColor: '#4169e1',
        borderRadius: 2,
    },
    checkboxText: {
        marginLeft: 8,
        color: '#555',
    },
    signupButton: {
        backgroundColor: '#4169e1',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
    },
    signupButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },

    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    tabActive: {
        backgroundColor: '#fff',
        elevation: 2,
    },
    tabText: {
        color: '#999',
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#000',
        fontWeight: '600',
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginBottom: 20,
        tintColor: '#4169e1',
    },
});
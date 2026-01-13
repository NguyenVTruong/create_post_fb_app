import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import {SplashScreen, useRouter} from 'expo-router';
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons';
import {login as loginSerive, loginGoogle} from "@/service/login.service";
import Loading from "@/components/UI/Loading";
import {Asset} from "expo-asset";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from "expo-auth-session";
import {jwtDecode} from "jwt-decode";
import {AuthContext} from "@/context/AuthContext";
import PopupOtp from "@/components/UI/PopupOtp";
import axios from "axios";
import {API_AUTH_URL} from "@/constants/Contants";
import PopupEnterEmail from "@/components/UI/PopupEnterEmail";
import PopupUpdatePassword from "@/components/UI/PopupUpdatePassword";

const socialIcons = [
    {name: 'google', color: '#DB4437', lib: AntDesign},
    {name: 'facebook-square', color: '#1877F2', lib: FontAwesome},
];
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    const { login, logout } = useContext(AuthContext);
    const [otpModal, setOtpModal] = useState(false);
    const [enterEmailModel, setEnterEmailModal] = useState(false);
    const [showPopupUpdatePassword, setShowPopupUpdatePassword] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [otpEmailError, setOtpEmailError] = useState('');
    const [updatePasswordError, setUpdatePasswordError] = useState('');
    const [popupUpdatePassword, setPopupUpdatePassword] = useState('');

    const schemeAndroid =
        "com.googleusercontent.apps.1079376030693-fl6cboddh08jfm2dg9lmo1o54uvj5mbg";
    const schemeIos =
        "com.googleusercontent.apps.1079376030693-ej23m1nunn6n8k01drt1glqh0betdusk";
    const schemeWeb =
        "1079376030693-gehcu83b1eaq8op62gufgn9o43768map.apps.googleusercontent.com";

    const redirectUri = AuthSession.makeRedirectUri({
        scheme:
            Platform.OS === "android"
                ? schemeAndroid
                : Platform.OS === "ios"
                    ? schemeIos
                    : schemeWeb
    });
    const [request, response, promptAsync] = Google.useAuthRequest({
        scopes: ["openid", "email", "profile"],
        androidClientId: "1079376030693-fl6cboddh08jfm2dg9lmo1o54uvj5mbg.apps.googleusercontent.com",
        iosClientId: schemeIos + ".apps.googleusercontent.com",
        webClientId: schemeWeb,
        redirectUri: redirectUri
    });

    const handleLogin = async () => { // Login bang tai khoan mat khau
        if (!email) {
            setError("Email hoặc tên đăng nhập không được để trống")
            return;
        }
        if (!password ) {
            setError("Mật khẩu không được để trống")
            return;
        }
        setError('');
        setIsLoading(true);
        // Logic đăng nhập
        const result  = await loginSerive(email, password);
        if (result.success) {
            await login(); // goi ham login trong auth context
            // Lưu token để push noti
            // await registerPushToken();
        } else {
            setError(result.message);
        }
        setIsLoading(false);
    };

    useEffect(() => { // Login google auth
        if (response?.type !== "success") return;
        setIsLoading(true);
        try {
            const fetchData = (async () => {
                if (response?.type === "success") {
                    const { id_token } = response.params;
                    const decoded: any = jwtDecode(id_token);
                    // Gửi token này về backend để verify & login
                    const token = await loginGoogle(id_token, decoded.email);
                    if (token && token.error == null) {
                        await login(); // goi ham login trong auth context
                        // await registerPushToken();
                    } else {
                        alert("Lỗi hệ thống vui lòng thử lại sau vài phút!");
                        setIsLoading(false);
                        setError('Email, sđt, tên đăng nhập hoặc mật khẩu không đúng!');
                    }
                }
            });
            fetchData();
        } catch (error) {
            logout();
            alert("Lỗi hệ thống vui lòng thử lại sau vài phút!");
        } finally {
            setIsLoading(false);
        }
    }, [response]);

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [secure, setSecure] = useState(true);
    const router = useRouter();
    const [error, setError] = useState('');

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


    const closeOtpModel = async () => {
        setOtpModal(false);
        setOtpError("");
    };


    const closeEmailModel = async () => {
        setEnterEmailModal(false);
        setOtpEmailError("");
    };

    const closePopupUpdatePassword = async () => {
        setShowPopupUpdatePassword(false);
        setPopupUpdatePassword("");
    };

    const handleSendOtp = async (email: string) => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email || !email.trim()) {
                setOtpEmailError('Email không được để trống');
                return;
            }

            if (!emailRegex.test(email.trim())) {
                setOtpEmailError('Email không hợp lệ');
                return;
            }

            const data = {
                email: email,
            }
            const res = await axios.post(API_AUTH_URL + '/api/v1/forgotPassword', data);
            setEmail(data.email);
            setEnterEmailModal(false);
            setOtpModal(true);   // chỉ mở OTP
            setOtpError('');
        } catch (error) {
            setOtpEmailError(error.response?.data.message);
        }
    };

    const handleUpdatePassword = async (password: string, rePassword: string) => {
        try {
            const data = {
                password: password,
                rePassword: rePassword,
                otp: otp,
                email: email,
            }
            const res = await axios.post(API_AUTH_URL + '/api/v1/updatePassword', data);
            setShowPopupUpdatePassword(false);
            setUpdatePasswordError('');
        } catch (error) {
            setUpdatePasswordError(error.response?.data.message);
        }
    };

    const handleConfirmOtp = async (otp: string) => {
        try {
            const data = {
                otp: otp,
                email: email,
            }
            const res = await axios.post(API_AUTH_URL + '/api/v1/verifyOtp', data);
            setOtp(data.otp);
            if (res.status === 200) {
                setShowPopupUpdatePassword(true);
                setOtpModal(false);
            }
            setOtpError('');
        } catch (error) {
            setOtpError(error.response?.data.message);
        }
    };

    return (
        <>
            <PopupEnterEmail
                visible={enterEmailModel}
                onClose={closeEmailModel}
                onConfirm={handleSendOtp}
                email={email}
                errorMessage={otpEmailError}
            />

            <PopupOtp
                visible={otpModal}
                onClose={closeOtpModel}
                onConfirm={handleConfirmOtp}
                errorMessage={otpError}
            />
            <PopupUpdatePassword
                visible={showPopupUpdatePassword}
                onClose={closePopupUpdatePassword}
                onConfirm={handleUpdatePassword}
                errorMessage={otpError}
            />
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/icon.png')}
                style={styles.icon}
            />
            <Text style={styles.title}>Vụt nào</Text>
            <Text style={styles.subtitle}>
                Giao lưu và kết nối các lông thủ
            </Text>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.tab, styles.tabActive]}>
                    <Text style={styles.tabTextActive}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab} onPress={() => router.push('/signup')}>
                    <Text style={styles.tabText}>Đăng ký</Text>
                </TouchableOpacity>
            </View>

            {/* Email Input */}
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Email hoặc tên đăng nhập"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            {/* Password Input */}
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
                        style={{marginRight: 10}}
                    />
                </TouchableOpacity>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}

            {/* Remember + Forgot */}
            <View style={styles.row}>
                <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => setRemember(!remember)}
                >
                    {/*<View style={styles.checkbox}>*/}
                    {/*    {remember && <View style={styles.checkboxInner}/>}*/}
                    {/*</View>*/}
                    {/*<Text style={styles.rememberText}> Ghi nhớ mật khẩu</Text>*/}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setEnterEmailModal(true); setOtpEmailError("")}}>
                    <Text style={styles.forgotText}>Quên mật khẩu ?</Text>
                </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>

            {/* Or login with */}
            <Text style={styles.orText}>Hoặc đăng nhập với</Text>
            <View style={styles.socialRow}>
                {socialIcons.map((icon, index) => {
                    const IconLib = icon.lib;
                    return (
                        <TouchableOpacity key={index} style={styles.socialBtn} onPress={() => {
                            if (icon.name === "google") promptAsync();
                        }}>
                            <IconLib name={icon.name as any} size={22} color={icon.color}/>
                        </TouchableOpacity>
                    );
                })}
            </View>
            {isLoading && <Loading/>}
        </View>
            </>
    );
}

const styles = StyleSheet.create({
    container: {padding: 24, paddingTop: 60},
    icon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginBottom: 12,
        alignSelf: 'center',
        resizeMode: "contain",
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginBottom: 20,
        tintColor: '#4169e1',
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        alignItems: 'center',
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
    rememberText: {marginLeft: 8, color: '#555'},
    forgotText: {color: '#4169e1', fontWeight: '500'},
    loginButton: {
        backgroundColor: '#4169e1',
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    orText: {
        textAlign: 'center',
        color: '#888',
        marginBottom: 16,
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    socialBtn: {
        padding: 12,
        backgroundColor: '#f3f3f3',
        borderRadius: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

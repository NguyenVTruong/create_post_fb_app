import React, {useRef} from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function FloatingButton({press}: any) {
    const widthAnim  = useRef(new Animated.Value(150)).current; // nhỏ hơn: 120 thay vì 160
    const padAnim    = useRef(new Animated.Value(12)).current;  // padding nhỏ hơn // padding 16 -> 0
    const labelOp = useRef(new Animated.Value(1)).current;   // label 1 -> 0
    const leftIconOp = useRef(new Animated.Value(1)).current;   // icon trái 1 -> 0
    const centerOp = useRef(new Animated.Value(0)).current;   // icon giữa 0 -> 1

    // 9s: crossfade — ẩn label + icon trái, hiện icon giữa (không overlap)
    setTimeout(() => {
        Animated.parallel([
            Animated.timing(labelOp, {toValue: 0, duration: 200, useNativeDriver: true}),
            Animated.timing(leftIconOp, {toValue: 0, duration: 200, useNativeDriver: true}),
            Animated.timing(centerOp, {toValue: 1, duration: 200, useNativeDriver: true}),
        ]).start();
    }, 9800);

    // 10s: thu nhỏ về nút tròn
    setTimeout(() => {
        Animated.parallel([
            Animated.timing(widthAnim, {toValue: 45, duration: 400, useNativeDriver: false}),
            Animated.timing(padAnim, {toValue: 0, duration: 400, useNativeDriver: false}),
        ]).start();
    }, 10000);

    return (
        <Pressable onPress={press} style={styles.container}>
            <Animated.View style={[styles.fab, {width: widthAnim, paddingHorizontal: padAnim}]}>
                {/* ICON TRÁI (đi cùng label) */}
                <Animated.View style={[styles.iconRow, {opacity: leftIconOp}]}>
                    <Ionicons name="add" size={25} style={styles.icon}/>
                </Animated.View>

                {/* LABEL */}
                <Animated.Text style={[styles.label, {opacity: labelOp}]}>
                    Đăng tuyển
                </Animated.Text>

                {/* ICON GIỮA (absolute, chỉ hiện sau 9s) */}
                <Animated.View style={[styles.centerSlot, {opacity: centerOp}]} pointerEvents="none">
                    <Ionicons name="add" size={30} style={styles.icon}/>
                </Animated.View>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {position: 'absolute', right: 16, bottom: 20},
    fab: {
        height: 45,
        borderRadius: 28,
        backgroundColor: '#FF3FA4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        // shadow
        shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 12, shadowOffset: {width: 0, height: 6}, elevation: 6,
    },
    iconRow: {position: 'absolute', left: 16}, // icon nằm bên trái, không chèn label
    centerSlot: {position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center'},
    icon: {color: '#fff', fontWeight: 'bold', marginLeft: 0},
    label: {color: '#fff', fontSize: 16, fontWeight: '700', textAlign: 'center', marginLeft: 30 },
});
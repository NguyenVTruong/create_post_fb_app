import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import TextTicker from "react-native-text-ticker";

type Props = {
    placeholder?: string;
    onPress: () => void;           // điều hướng sang màn hình search
    rightIcon?: 'sliders' | 'mic'; // icon bên phải (tuỳ chọn)
    style?: any;
};

const FIVE_MINUTES = 2 * 60 * 1000;

export default function SearchBarHero({
                                          placeholder = 'Tìm kiếm buổi chơi',
                                          onPress,
                                          rightIcon = 'sliders',
                                          style,
                                      }: Props) {
    const [run, setRun] = useState(false);

    useEffect(() => {
        // chạy ngay lần đầu (tuỳ chọn)
        setRun(true);

        const interval = setInterval(() => {
            setRun(true);
        }, FIVE_MINUTES);

        return () => clearInterval(interval);
    }, [placeholder]);
    return (
        <Pressable onPress={onPress} style={[styles.wrapper, style]}>
            <View style={styles.box}>
                <Icon name="search" size={18} color="#6B7280" style={{marginRight: 8}}/>
                    {
                        run ? (
                            <TextTicker
                                style={{width: 200, fontSize: 15, fontWeight: '600', color: '#6B7280'}}
                                duration={6000}        // chạy 1 vòng ~6s
                                loop={false}           // chạy 1 lần
                                bounce={false}
                                marqueeDelay={0}
                                numberOfLines={1}
                                onMarqueeComplete={() => {
                                    setRun(false);       // chạy xong thì tắt
                                }}
                            >
                               {placeholder}
                            </TextTicker>
                        ) : (
                            <Text numberOfLines={1} style={styles.placeholder}>
                                {placeholder}
                            </Text>
                        )}
                {/*<Text style={styles.placeholder} numberOfLines={1}></Text>*/}
                <View style={{flex: 1}}/>
                {rightIcon === 'sliders' ? (
                    <Icon name="sliders" size={18} color="#9CA3AF"/>
                ) : (
                    <Icon name="mic" size={18} color="#9CA3AF"/>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {paddingHorizontal: 16, paddingTop: 8, paddingBottom: 6},
    box: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        // shadow iOS
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: {width: 0, height: 6},
        // elevation Android
        elevation: 3,
    },
    placeholder: {color: '#6B7280', fontSize: 15, fontWeight: '600', width: '80%'},
});
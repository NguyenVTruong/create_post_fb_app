import React, { useRef } from 'react';
import {
    Animated,
    PanResponder,
    TouchableOpacity,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function DraggableBubble({
                                            totalRequests = 0,
                                            totalHandled = 0,
                                            onPress,
                                        }: {
    totalRequests?: number;
    totalHandled?: number;
    onPress?: () => void;
}) {
    const position = useRef(new Animated.ValueXY({ x: SCREEN_WIDTH - 90, y: SCREEN_HEIGHT - 200 })).current;

    const panResponder = useRef(
        PanResponder.create({
            // Bắt gesture cực nhạy
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                const { dx, dy } = gestureState;
                return Math.abs(dx) > 1 || Math.abs(dy) > 1; // nhạy chỉ cần di nhẹ
            },
            onStartShouldSetPanResponder: () => true,

            onPanResponderMove: (evt, gesture) => {
                let newX = gesture.moveX - 30;
                let newY = gesture.moveY - 30;

                // Giới hạn trong màn hình
                const minX = 0;
                const maxX = SCREEN_WIDTH - 60;
                const minY = 0;
                const maxY = SCREEN_HEIGHT - 120;

                newX = Math.max(minX, Math.min(newX, maxX));
                newY = Math.max(minY, Math.min(newY, maxY));

                position.setValue({ x: newX, y: newY });
            },

            onPanResponderRelease: () => {},
        })
    ).current;

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[styles.bubble, { transform: position.getTranslateTransform() }]}
        >
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                <MaterialIcons name="sports-tennis" size={28} color="#fff" />
                {totalRequests > 0 && (
                    <Animated.View style={styles.badge}>
                        <Text style={styles.badgeText}>{totalHandled}/{totalRequests}</Text>
                    </Animated.View>
                )}
            </TouchableOpacity>

            <Text style={styles.label}>Yêu cầu đã gửi</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    bubble: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        elevation: 20,
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 20,
        paddingHorizontal: 5,
        alignItems: 'center',
    },
    badgeText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    label: {
        marginTop: 4,
        fontSize: 8,
        color: '#fff',
        fontWeight: '500',
        textAlign: 'center',
    },
});

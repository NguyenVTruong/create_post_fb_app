import React from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from "moment";
import "moment/locale/vi";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {router} from "expo-router";

type Host = {
    avatarUrl: string;
    id: string;
    fullName: string;
}

type Request = {
    status: string;
    number_of_male_participants: number;
    number_of_female_participants: number;
}
export type FeedItem = {
    id: string;
    name: string;
    club: string;
    level: string;
    fee: number;
    court?: string;
    location: string;
    dateLabel: string;
    capacity: string;
    avatar: string;
    price: number;
    start_time: Date;
    end_time: Date;
    max_players: number,
    current_players: number,
    play_date: Date;
    yard?: string;
    price_male: number,
    price_female: number,
    host_name: string,
    level_male: string,
    level_female: string,
    host: Host,
    request: Request,
};

type Props = {
    item: FeedItem;
    onRequest: (item: FeedItem) => void;
};

const FeedMyRequestCard = ({item, onRequest}: Props) => {
    // const feeStr = item.fee.toLocaleString('vi-VN');
    const startTime = moment(item.start_time).format("HH:mm");
    const startDate = moment(item.start_time).format("DD/MM/YYYY");
    const endTime = moment(item.end_time).format("HH:mm");
    const playDate = moment(item.play_date).format("DD/MM");

    const showProfile = () => {
        router.push({
            pathname: '../profile/profile-show',
            params: { userId: item.host.id }
        });
    }

    const statusText = {
        accepted: "Được duyệt",
        pending: "Chờ duyệt",
        rejected: "Bị từ chối"
    };

    const getBadgeStyle = (status) => {
        switch (status) {
            case "accepted":
                return styles.badgeAccepted;  // màu xanh
            case "pending":
                return styles.badgePending;   // màu vàng
            case "rejected":
                return styles.badgeCancel;    // màu đỏ
            default:
                return styles.badgeMuted;
        }
    };

    return (
        <Pressable style={styles.card} onPress={onRequest}>
            <Pressable onPress={showProfile}>
                <Image source={{uri: item.host.avatarUrl}} style={styles.avatar} />
            </Pressable>

            <View style={styles.centerBox}>
                <Text style={styles.title} numberOfLines={1}>
                    Buổi chơi của {item?.host.fullName}
                </Text>

                {/*{item?.yard ? (*/}
                {/*    <View style={styles.row}>*/}
                {/*        <Text style={styles.sub}>{item?.yard}, {item?.location} </Text>*/}
                {/*    </View>*/}
                {/*) : null}*/}
                <View style={[styles.row, {flexWrap: 'wrap'}]}>
                    <Text style={{color: "black", fontSize: 12}}>
                        Bạn đã đăng ký
                    </Text>
                    {item.request.number_of_male_participants > 0 && (
                        <Text style={{color: "black", fontSize: 12, marginLeft: 2}}>
                            {item.request.number_of_male_participants} nam
                        </Text>
                    )}
                    {item.request.number_of_female_participants > 0 && (
                        <Text style={{color: "black", fontSize: 12, marginLeft: 2}}>
                            {item.request.number_of_female_participants} nữ
                        </Text>
                    )}
                </View>
            </View>

            <View style={styles.rightBox}>
                <View style={styles.badges}>
                    <Text style={[styles.badge, styles.badgePrimary]} numberOfLines={1}>
                        {startTime}, {playDate}
                    </Text>

                    <View style={styles.badgeContainer}>
                        {/* Badge chờ duyệt */}
                        <Text
                            style={[styles.badge, getBadgeStyle(item.request.status)]}
                            numberOfLines={1}
                        >
                            {statusText[item.request.status] || ""}
                        </Text>

                        {/* Nút chỉnh sửa */}


                    </View>

                </View>
            </View>
        </Pressable>
    );
};

export default React.memo(FeedMyRequestCard);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 12,
        borderRadius: 16,
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 10,
        // shadow iOS
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: {width: 0, height: 4},
        // elevation Android
        elevation: 3,
    },
    avatar: {width: 46, height: 46, borderRadius: 23},
    centerBox: {flex: 1, marginHorizontal: 10},
    title: {paddingTop: 2,fontSize: 13, fontWeight: '600', color: '#111827', flexWrap: "wrap"},
    row: {flexDirection: 'row', alignItems: 'center', marginTop: 3},
    sub: {fontSize: 12, color: '#6B7280'},

    rightBox: {alignItems: 'flex-end', justifyContent: 'space-between'},
    badges: {alignItems: 'flex-end'},
    badge: {
        fontSize: 11,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        overflow: 'hidden',
        marginBottom: 6,
        fontWeight: '600',
        color: 'white'
    },
    badgePrimary: {backgroundColor: '#EEF2FF', color: '#4338CA'}, // indigo-50/700
    badgeMutedEdit: {backgroundColor: "yellow", color: '#ffe900'},   // gray-100/700
    // badgeMuted: {backgroundColor: '#F3F4F6', color: '#374151'},   // gray-100/700
    badgeNotFull: {backgroundColor: '#10B981', color: '#e1fdec'},   // gray-100/700
    badgeFull: {backgroundColor: 'rgb(172,252,255)', color: '#004c50'},   // gray-100/700
    cta: {
        backgroundColor: '#F59E0B', // amber-500
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
    },
    ctaText: {color: '#fff', fontWeight: '700', fontSize: 12},

    cancelBtn: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: "#fee2e2", // red-100
        marginRight: 10,
    },

    cancelText: {
        color: "#dc2626", // red-600
        fontWeight: "500",
        fontSize: 14,
    },

    editBtn: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: "#e0f2fe", // sky-100
    },

    editText: {
        color: "#0284c7", // sky-600
        fontWeight: "500",
        fontSize: 14,
    },

    badgeContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,  // RN 0.71+ hỗ trợ
    },

    // badge: {
    //     paddingHorizontal: 10,
    //     paddingVertical: 4,
    //     borderRadius: 6,
    //     fontSize: 12,
    // },

    badgeMuted: {
        backgroundColor: "#E5E7EB",
        color: "#374151",
    },

    iconButton: {
        padding: 4,
        backgroundColor: "#FCE7F3",
        borderRadius: 6,
        marginBottom: 6
    },

    iconButtonDelete: {
        padding: 4,
        backgroundColor: "#FEE2E2",
        borderRadius: 6,
        marginBottom: 6
    },

    // Đồng ý – xanh
    badgeAccepted: {
        backgroundColor: "#4ade80", // xanh lá nhạt
    },

    // Chờ duyệt – vàng
    badgePending: {
        backgroundColor: "#facc15", // vàng
    },

    // Từ chối – đỏ
    badgeCancel: {
        backgroundColor: "#f87171", // đỏ nhạt
    },

});

import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import moment from "moment";
import "moment/locale/vi";
import {router} from "expo-router";

type Host = {
    id: string;
    avatarUrl: string;
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
    price_male: number
    price_female: number,
    host_name: string
    level_male: string
    level_female: string
    host: Host
};

type Props = {
    item: FeedItem;
    onRequest: (item: FeedItem) => void;
};

const FeedItemCard = ({item, onRequest}: Props) => {
    // const feeStr = item.fee.toLocaleString('vi-VN');
    const startTime = moment(item.start_time).format("HH:mm");
    const startDate = moment(item.start_time).format("DD/MM/YYYY");
    const endTime = moment(item.end_time).format("HH:mm");
    const playDate = moment(item.play_date).format("DD/MM/YYYY");
    const showProfile = () => {
        router.push({
            pathname: '../profile/profile-show',
            params: { userId: item.host.id }
        });
    }

    return (
        <Pressable style={styles.card}  onPress={onRequest}>
            <Pressable onPress={showProfile}>
            <Image source={{uri: item.host.avatarUrl}} style={styles.avatar} />
            </Pressable>
            <View style={styles.centerBox}>
                <Text style={styles.title} numberOfLines={1}>
                    {item.host_name}
                </Text>
                {item.level_male ? (
                    <View style={styles.row}>
                        <Text style={{color: "#6B7280", fontSize: 12}} numberOfLines={1}>
                            {/*<FontAwesome5 name="mars"*/}
                            {/*              size={12}*/}
                            {/*              color="#3366FF"/> */}
                            Nam: {item.level_male.replaceAll(',', ', ')}
                        </Text>
                    </View>) : null}
                {item.level_female ? (
                    <View style={styles.row}>
                        <Text style={[{color: "#6B7280", fontSize: 12}]} numberOfLines={1}>
                            {/*<FontAwesome5 name="venus"*/}
                            {/*              size={12}*/}
                            {/*              color="#FF66CC"/>*/}
                            Nữ: {item.level_female.replaceAll(',', ', ')}
                        </Text>
                    </View>) : null}

                <View style={styles.row}>
                    {/*<Icon name="dollar-sign" size={12} color="#6B7280"/>*/}
                    <Text style={styles.sub}>Chi phí:
                        {/*<FontAwesome5 name="mars" size={12} color="#3366FF"/>*/}

                         nam {item.price_male}, nữ {item.price_female}
                        {/*<FontAwesome5 name="venus" size={12} color="#FF66CC"/>*/}

                    </Text>
                </View>

                {item.yard ? (
                    <View style={styles.row}>
                        {/*<Icon name="map-marker-alt" size={11} color="#6B7280"/>*/}
                        <Text style={styles.sub}>{item.yard}, {item.location} </Text>
                    </View>
                ) : null}


            </View>

            <View style={styles.rightBox}>
                <View style={styles.badges}>
                    <Text style={[styles.badge, styles.badgePrimary]} numberOfLines={1}>
                        {playDate}
                    </Text>
                    <Text style={[styles.badge, styles.badgePrimary]} numberOfLines={1}>
                        {startTime} - {endTime}
                    </Text>
                    {item.max_players == item.current_players ?
                        (<Text style={[styles.badge, styles.badgeMuted]} numberOfLines={1}>
                            {item.current_players}/{item.max_players} - {item.max_players == item.current_players ? "Đã đủ" : "Đang tuyển"}
                        </Text>) : (<Text style={[styles.badge, styles.badgeNotFull]} numberOfLines={1}>
                            {item.current_players}/{item.max_players} - {item.max_players == item.current_players ? "Đã đủ" : "Đang tuyển"}
                        </Text>)}
                </View>

                {/*<Pressable*/}
                {/*    onPress={() => onRequest(item)}*/}
                {/*    style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}*/}
                {/*>*/}
                {/*    <Text style={styles.ctaText}>Đăng ký</Text>*/}
                {/*</Pressable>*/}
            </View>
        </Pressable>
    );
};

export default React.memo(FeedItemCard);

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
    avatar: {width: 52, height: 52, borderRadius: 26},
    centerBox: {flex: 1, marginHorizontal: 10},
    title: {fontSize: 15, fontWeight: '700', color: '#111827'},
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
    },
    badgePrimary: {backgroundColor: '#EEF2FF', color: '#4338CA'}, // indigo-50/700
    badgeMuted: {backgroundColor: '#F3F4F6', color: '#374151'},   // gray-100/700
    badgeNotFull: {backgroundColor: '#10B981', color: '#e1fdec'},   // gray-100/700
    badgeFull: {backgroundColor: 'rgb(172,252,255)', color: '#004c50'},   // gray-100/700
    cta: {
        backgroundColor: '#F59E0B', // amber-500
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
    },
    ctaText: {color: '#fff', fontWeight: '700', fontSize: 12},
});

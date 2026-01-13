import React, {useState} from 'react';
import {
    Dimensions,
    FlatList,
    Modal, Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {acceptJoinRequest, rejectJoinRequest} from "@/service/join-requests.service";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import moment from "moment/moment";

const W = Dimensions.get('window').width;
const CARD_W = 280;
const CARD_H = 150;
const GAP = 12;

export type RequestUser = { id: string; requester: {} };

export type MyPost = {
    id: string;
    title: string;
    location: string;
    play_date: string;
    current_players: number;
    max_players: number;
    coverUri: string;
    status?: 'open' | 'full' | 'draft' | 'need_update';
    requests?: RequestUser[];
    number_of_male_participants: number;
    number_of_female_participants: number;
};

type Props = {
    posts: MyPost[];
    onPress: (p: MyPost) => void;         // mở chi tiết/chỉnh sửa
    onUpdatePress?: (p: MyPost) => void;  // bấm "Cập nhật"
    loadMyPosts?: () => void;
    title?: string;
};

const statusMap = {
    pending: {label: 'Đang chờ', color: '#000000'},     // màu mặc định (đen)
    rejected: {label: 'Đã từ chối', color: '#fd0000'},
    accepted: {label: 'Đã đồng ý', color: '#00fd43'},
};

export default function MyPostsCarousel({
                                            posts,
                                            onPress,
                                            onUpdatePress,
                                            title = 'Bạn có 10 bài đang tuyển',
                                            loadMyPosts
                                        }: Props) {
    return (
        <View style={{marginTop: 6}}>
            {posts.length > 0 && (
                <>
                    {/*<View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 5, paddingRight:10}}>*/}
                    {/*    <Text style={styles.sectionTitle}>Bạn có {posts.length} bài đang tuyển</Text>*/}
                    {/*    <Text>Xem tất cả</Text>*/}
                    {/*</View>*/}
                    <FlatList
                        horizontal
                        data={posts}
                        keyExtractor={(it) => it.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 16}}
                        ItemSeparatorComponent={() => <View style={{width: GAP}}/>}
                        snapToInterval={CARD_W + GAP}
                        decelerationRate="fast"
                        renderItem={({item}) => (
                            <PostCard item={item} onPress={onPress} onUpdatePress={onUpdatePress}
                                      loadMyPosts={loadMyPosts}/>
                        )}
                    />
                </>
            )
            }
        </View>
    );
}

function PostCard({
                      item,
                      onPress,
                      onUpdatePress,
                      loadMyPosts
                  }: {
    item: MyPost;
    onPress: (p: MyPost) => void;
    onUpdatePress?: (p: MyPost) => void;
    loadMyPosts?: () => void;
}) {
    const [showRequests, setShowRequests] = useState(false);
    const isFull = item.current_players >= item.max_players;
    const needUpdate = item.status === 'need_update';
    const statusLabel = needUpdate ? 'Cập nhật' : isFull ? 'Đã đủ' : 'Đang tuyển';

    // slot còn lại
    const remaining = Math.max(0, item.max_players - item.current_players);

    // quản lý quantity cho từng request
    const [quantities, setQuantities] = React.useState<Record<string, number>>({});

    React.useEffect(() => {
        // default mỗi req = 1 (hoặc lấy từ req.requested_quantity nếu có)
        const init: Record<string, number> = {};
        item.requests?.forEach((r) => {
            // @ts-ignore
            const q = (r as any).requested_quantity ?? 1;
            init[r.id] = clamp(q, 1, Math.max(1, remaining));
        });
        setQuantities(init);
    }, [item.requests, remaining]);

    const setQ = (id: string, q: number) => {
        setQuantities((prev) => ({...prev, [id]: clamp(q, 1, Math.max(1, remaining))}));
    };

    const inc = (id: string) => setQ(id, (quantities[id] ?? 1) + 1);
    const dec = (id: string) => setQ(id, (quantities[id] ?? 1) - 1);

    const onApprove = async (req: any) => {
        await acceptJoinRequest(req.id, req.number_of_male_participants + req.number_of_female_participants);
        // @ts-ignore
        loadMyPosts();
    }

    const onReject = async (req: any) => {
        await rejectJoinRequest(req.id);
        // @ts-ignore
        loadMyPosts();
    }
    return (
        <>
            <Pressable onPress={() => setShowRequests(true)} style={({pressed}) => [styles.card, {
                flexDirection: "column",
                justifyContent: "space-between"
            }, pressed && {opacity: 0.9}]}>
                {/* badge trạng thái */}
                <View>
                    <View
                        style={[styles.badge, needUpdate ? styles.badgeDanger : isFull ? styles.badgeMuted : styles.badgePrimary]}>
                        <Text style={styles.badgeText}>{statusLabel}</Text>
                    </View>
                    <View style={styles.requestsBox}>
                        {item?.requests.length > 0 &&
                            (<Text>Danh sách yêu cầu tham gia: </Text>)
                        }
                        {item.requests && item.requests.length > 0 ? (
                            item.requests.slice(0, 3).map((req) => (
                                <React.Fragment key={req.id}>
                                    {req.status == 'pending' &&
                                        <Text key={req.id} style={styles.reqName} numberOfLines={1}>
                                            • {req.requester?.fullName} - Đang chờ phê duyệt
                                        </Text>
                                    }
                                    {req.status == 'rejected' &&
                                        <Text key={req.id} style={styles.reqName} numberOfLines={1}
                                              style={{color: '#fd0000'}}>
                                            • {req.requester?.fullName} - Đã từ chối
                                        </Text>
                                    }
                                    {req.status == 'accepted' &&
                                        <Text key={req.id} style={styles.reqName} numberOfLines={1}
                                              style={{color: '#00fd43'}}>
                                            • {req.requester?.fullName} - Đã đồng ý
                                        </Text>
                                    }
                                </React.Fragment>


                            ))
                        ) : (
                            <Text style={styles.reqEmpty}>Chưa có yêu cầu tham gia</Text>
                        )}

                        {item.requests && item.requests.length > 3 && (
                            <Text style={styles.reqMore}>+{item.requests.length - 3} người khác đã gửi yêu cầu tham
                                gia</Text>
                        )}
                    </View>
                </View>
                <View>

                    {/* khối thông tin */}
                    <View style={styles.infoBox}>
                        {/*<Text style={styles.title} numberOfLines={1}>{item.title}</Text>*/}

                        <View style={styles.row}>
                            {/* <I name="calendar-alt" /> */}
                            <Text style={styles.title}
                                  numberOfLines={1}> {moment(item.start_time).format('HH:mm')} - {moment(item.end_time).format('HH:mm')}, {formatDate(item.play_date)} </Text>
                        </View>

                        <View style={[styles.row, {marginTop: 3}]}>
                            {/* <I name="map-marker-alt" /> */}
                            <Text style={styles.sub} numberOfLines={1}> {item.yard} </Text>
                            <View style={{flex: 1}}/>
                            <Text style={styles.capacity}>{`${item.current_players}/${item.max_players}`}</Text>
                        </View>

                        {needUpdate && onUpdatePress ? (
                            <Pressable onPress={() => onUpdatePress(item)} style={styles.updateBtn}>
                                {/* <I name="edit" size={12} color="#fff" style={{ marginRight: 6 }} /> */}
                                <Text style={styles.updateTxt}>Cập nhật</Text>
                            </Pressable>
                        ) : null}
                    </View>
                </View>
            </Pressable>
            {/* Modal: danh sách + chọn số lượng */}
            <Modal visible={showRequests} animationType="fade" transparent={true} onDismiss={() => setShowRequests(false)} >
                <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                <SafeAreaView style={{
                    height:Platform.OS === "ios" ? Dimensions.get('window').height * 1 : Dimensions.get('window').height * 1,
                    width: '100%',
                    backgroundColor: 'white',
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    padding: 16
                }}>
                    <View style={{flex: 1, padding: 16, paddingTop: 0, backgroundColor: '#fff'}}>
                        <View style={styles.popupHeader}>
                            <View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={() => setShowRequests(false)}>
                                    <FontAwesome size={30} name='close'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 12}}>
                            Danh sách yêu cầu - Còn {remaining} chỗ
                        </Text>
                        <FlatList
                            data={item?.requests}
                            keyExtractor={(req, index) => req.id.toString() || index.toString()}
                            ListEmptyComponent={<Text>Chưa có yêu cầu</Text>}
                            renderItem={({item: req}) => {
                                const q = quantities[req.id] ?? 1;
                                const disabled = remaining <= 0;
                                return (
                                    <View style={styles.reqItemContainer}>
                                        <View style={styles.reqItem}>
                                            <Text style={{flex: 1, fontWeight: "bold", fontSize: 18}} numberOfLines={2}>
                                                {req.requester?.fullName || 'Người dùng'}
                                            </Text>

                                            {/* Stepper số lượng */}


                                            {/* Actions */}


                                        </View>
                                        <View style={styles.reqItem}>
                                            <Text style={{flex: 1, fontSize: 15}}>
                                                Đăng
                                                ký {req?.number_of_male_participants} nam, {req.number_of_female_participants} nữ</Text>

                                            {req.status == 'pending'
                                                ? (
                                                    <>
                                                        <Pressable
                                                            style={styles.rejectBtn}
                                                            onPress={() => (onReject ? onReject(req) : console.log('Reject', req.id))}
                                                        >
                                                            <Text style={{color: '#fff'}}>Từ chối</Text>
                                                        </Pressable>
                                                        <Pressable
                                                            style={[styles.approveBtn, disabled && {opacity: 0.5}]}
                                                            disabled={disabled}
                                                            onPress={() => {
                                                                onApprove ? onApprove(req) : console.log('Approve', req.id, q);
                                                            }}
                                                        >
                                                            <Text style={{color: '#fff'}}>Đồng ý</Text>
                                                        </Pressable>
                                                    </>)
                                                : null}
                                            {req.status == 'accepted'
                                                ? (
                                                    <>
                                                        <Text style={{color: '#00fd43'}}>Đã đồng ý</Text>
                                                    </>)
                                                : null}
                                            {req.status == 'rejected'
                                                ? (
                                                    <>
                                                        <Text style={{color: '#fd0000'}}>Đã từ chối</Text>
                                                    </>)
                                                : null}
                                        </View>
                                    </View>
                                );
                            }}
                        />

                    </View>
                </SafeAreaView>
                </View>
            </Modal>
        </>
    );
}

/** format dd/MM/yyyy HH:mm theo locale VN */
function formatDate(raw: string) {
    const d = new Date(raw);
    return d.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#111827',
        paddingHorizontal: 16,
        marginBottom: 8,
        marginTop: 8,
    },
    card: {
        width: CARD_W,
        height: CARD_H,
        borderRadius: 16,
        backgroundColor: '#fff',
        overflow: 'hidden',
        // shadow
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: {width: 0, height: 8},
        elevation: 4,
        // border top + bottom
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E5E7EB',
    },
    cover: {
        width: '100%',
        height: 10580,
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },
    badgeText: {color: '#fff', fontWeight: '700', fontSize: 11},
    badgePrimary: {backgroundColor: '#10B981'}, // xanh "đang mở"
    badgeMuted: {backgroundColor: '#9CA3AF'},   // xám "đủ chỗ"
    badgeDanger: {backgroundColor: '#EF4444'},  // đỏ "cập nhật"

    infoBox: {padding: 8},
    title: {fontSize: 15, fontWeight: '700', color: '#111827'},
    row: {flexDirection: 'row', alignItems: 'center', marginTop: 4},
    sub: {fontSize: 12, color: '#6B7280'},
    capacity: {
        fontSize: 12,
        fontWeight: '800',
        color: '#111827',
        backgroundColor: '#F3F4F6',
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 2,
        overflow: 'hidden',
    },
    updateBtn: {
        alignSelf: 'flex-start',
        marginTop: 8,
        backgroundColor: '#111827',
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    updateTxt: {color: '#fff', fontSize: 12, fontWeight: '700'},
    requestsBox: {
        minHeight: 50,
        paddingHorizontal: 8,
        paddingTop: 5,
    },
    reqName: {
        fontSize: 12,
        color: '#111827',
        marginVertical: 2,
    },
    reqEmpty: {
        fontSize: 12,
        color: '#9CA3AF',
        fontStyle: 'italic',
    },
    reqMore: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
        marginTop: 2,
    },
    // Model duyet yeu cau

    reqItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    reqItemContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',

        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
// Stepper
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        overflow: 'hidden',
    },
    stepBtn: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepBtnDisabled: {opacity: 0.5},
    stepTxt: {fontSize: 16, fontWeight: '700', color: '#111827'},
    stepInput: {
        width: 40,
        textAlign: 'center',
        paddingVertical: 4,
        fontSize: 14,
        color: '#111827',
    },
// Buttons
    approveBtn: {
        backgroundColor: '#10B981',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    rejectBtn: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    closeBtn: {
        marginTop: 16,
        alignSelf: 'center',
        backgroundColor: '#111827',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    popupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));


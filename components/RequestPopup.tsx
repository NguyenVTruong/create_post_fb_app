import * as React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Divider, HelperText, IconButton, Portal, Surface, Text, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {FontAwesome} from "@expo/vector-icons";

type Session = {
    id: string;
    host_name?: string;         // tên chủ buổi (Thúy An)
    yard: string;
    location: string;
    price_male: number;             // phí 1 người
    price_female: number;             // phí 1 người
    start_time: string | Date;
    play_date: string | Date;
    end_time: string | Date;
    max_players: number;
    current_players?: number;  // số đã tham gia
};

type Props = {
    visible: boolean,
    onDismiss: () => void,
    onConfirm: (quantityMale: number, quantityFemale: number) => void,
    session?: Session,
    targetName?: string
};

export default function RequestPopup({visible, onDismiss, onConfirm, session, targetName}: Props) {
    const theme = useTheme();

    const start = session ? moment(session.start_time) : null;
    const end = session ? moment(session.end_time) : null;
    const playDate = session ? moment(session.play_date) : null;

    // @ts-ignore
    const timeStr = start && end
        ? `${start.format('HH:mm')} - ${end.format('HH:mm')}, ${playDate.format('DD/MM/YYYY')}`
        : '--';

    const remaining = Math.max(
        0,
        (session?.max_players ?? 0) - (session?.current_players ?? 0)
    );

    const [qtyMale, setQtyMale] = React.useState(0);
    const [qtyFemale, setQtyFemale] = React.useState(0);
    React.useEffect(() => {
        if (visible) setQtyMale(0);
        if (visible) setQtyFemale(0);
    }, [visible]);

    const decMale = () => setQtyMale(q => Math.max(0, q - 1));
    const incMale = () => setQtyMale(q => q + 1);

    const decFemale = () => setQtyFemale(q => Math.max(0, q - 1));
    const incFemale = () => setQtyFemale(q => q + 1);

    const total = (session?.price_male ?? 0) * qtyMale + (session?.price_female ?? 0) * qtyFemale;

    return (
        <Portal>
            <Dialog
                visible={visible}
                onDismiss={onDismiss}
                dismissable={false}
                style={{
                    borderRadius: 16,
                    backgroundColor: theme.colors.surface, // có thể đổi màu nền tại đây
                }}
            >
                {/* Title */}
                <Dialog.Title style={{fontSize: 20, fontWeight: '700'}}>
                    Yêu cầu của bạn
                </Dialog.Title>

                <Dialog.Content>
                    {/* Sub heading */}
                    <Text style={{fontWeight: '600', marginBottom: 8}}>
                        Buổi đánh cầu của <Text style={{fontWeight: '800'}}>
                        {session?.host_name ?? session?.host_name}
                    </Text>
                    </Text>

                    {/* Info card nhẹ */}
                    <Surface
                        elevation={0}
                        style={{
                            borderRadius: 12,
                            padding: 12,
                            backgroundColor: theme.colors.elevation.level1,
                        }}
                    >
                        <InfoRow icon="calendar-month" label="Thời gian" value={timeStr} color={theme.colors.primary}/>
                        <InfoRow icon="map-marker" label="Địa điểm" value={`${session?.yard}, ${session?.location}`}
                                 color={theme.colors.primary}/>
                        <InfoRow icon="account-group" label="Người tham gia tối đa" value={session?.max_players ?? '--'}
                                 color={theme.colors.primary}/>
                        <InfoRow icon="cash" label="Phí 1 người"
                                 value={`Nam ${(session?.price_male ?? 0).toLocaleString('vi-VN')} - Nữ ${(session?.price_female ?? 0).toLocaleString('vi-VN')}`}
                                 color={theme.colors.primary}/>
                    </Surface>

                    {/* Quantity selector */}
                    <Text style={{marginTop: 14, marginBottom: 6, fontWeight: '600'}}>
                        Tôi muốn đăng ký:
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 12,
                                borderRadius: 999,
                                paddingHorizontal: 10,
                                width: '45%',
                                alignSelf: 'center', // đảm bảo nằm giữa dialog
                                backgroundColor: theme.colors.surfaceVariant,
                                elevation: 0, // bóng nhẹ
                            }}
                        >
                            <IconButton icon="minus" size={18} onPress={decMale} disabled={qtyMale <= 0}/>
                            <Text style={{width: 40, textAlign: 'center', fontSize: 18, fontWeight: '700'}}>
                                {qtyMale} <FontAwesome name="user" size={18} color="#3366FF" />
                            </Text>
                            <IconButton icon="plus" size={18} onPress={incMale}/>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 12,
                                borderRadius: 999,
                                paddingHorizontal: 10,
                                width: '45%',
                                alignSelf: 'center', // đảm bảo nằm giữa dialog
                                backgroundColor: theme.colors.surfaceVariant,
                                elevation: 0, // bóng nhẹ
                            }}
                        >
                            <IconButton icon="minus" size={18} onPress={decFemale} disabled={qtyFemale <= 0}/>
                            <Text style={{width: 40, textAlign: 'center', fontSize: 18, fontWeight: '700'}}>
                                {qtyFemale} <FontAwesome name="user" size={18} color="#FF3399" />
                            </Text>
                            <IconButton icon="plus" size={18} onPress={incFemale}/>
                        </View>
                    </View>

                    <HelperText type="info" visible style={{marginTop: 6}}>
                        {remaining > 0 ? `Còn ${remaining} chỗ` : 'Hiện đã đầy, bạn có thể gửi yêu cầu chờ'}
                    </HelperText>

                    <Divider style={{marginVertical: 8}}/>

                    {/* Total cost */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{color: theme.colors.onSurfaceVariant}}>Tổng phí</Text>
                        <Text style={{fontSize: 18, fontWeight: '800'}}>
                            {total.toLocaleString('vi-VN')} VND
                        </Text>
                    </View>
                </Dialog.Content>

                <Dialog.Actions>
                    <Button onPress={onDismiss}>Hủy</Button>
                    <Button
                        mode="contained"
                        onPress={() => onConfirm(qtyMale, qtyFemale)}
                        disabled={!session}
                    >
                        Gửi yêu cầu
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

/** Hàng thông tin có icon + label + value */
function InfoRow({
                     icon,
                     label,
                     value,
                     color,
                 }: {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    label: string;
    value: string | number;
    color: string;
}) {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
            <MaterialCommunityIcons name={icon} size={18} color={color}/>
            <Text style={{marginLeft: 8}}>
                <Text style={{opacity: 0.7}}>{label}: </Text>
                <Text style={{fontWeight: '600'}}>{String(value)}</Text>
            </Text>
        </View>
    );
}

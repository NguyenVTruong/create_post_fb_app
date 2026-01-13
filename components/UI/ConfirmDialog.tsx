import React from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, View,} from 'react-native';
import {Divider, Surface, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ConfirmModalProps {
    visible: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    sessionInfo: {
        date: string;
        fromTime?: string;
        toTime?: string;
        currentPlayers: number;
        maxPlayers: number;
        location?: string;
        dataGenderSession?: any;
    };
}

export default function ConfirmDialog({
                                          visible,
                                          title = 'Xác nhận tạo buổi chơi',
                                          message = 'Bạn có muốn tạo buổi chơi?',
                                          confirmText = 'Tạo buổi',
                                          cancelText = 'Hủy',
                                          onConfirm,
                                          onCancel,
                                          sessionInfo,
                                      }: ConfirmModalProps) {
    const theme = useTheme();
    const timeStr = `Từ ${sessionInfo.fromTime} đến ${sessionInfo.toTime}, ${sessionInfo.date}`;
    const [qtyMale, setQtyMale] = React.useState(0);
    const [qtyFemale, setQtyFemale] = React.useState(0);

    React.useEffect(() => {
        if (visible) {
            setQtyMale(0);
            setQtyFemale(0);
        }
    }, [visible]);

    const decMale = () => setQtyMale(q => Math.max(0, q - 1));
    const incMale = () => setQtyMale(q => q + 1);
    const decFemale = () => setQtyFemale(q => Math.max(0, q - 1));
    const incFemale = () => setQtyFemale(q => q + 1);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: '90%',
                        maxHeight: '85%',
                        backgroundColor: theme.colors.surface,
                        borderRadius: 16,
                        padding: 20,
                    }}
                >
                    <ScrollView>
                        {/* --- Tiêu đề --- */}
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '700',
                                marginBottom: 10,
                                textAlign: 'center',
                            }}
                        >
                            {title}
                        </Text>

                        {/* --- Nội dung chính --- */}
                        <Surface
                            elevation={0}
                            style={{
                                borderRadius: 12,
                                padding: 12,
                                backgroundColor: theme.colors.elevation.level1,
                            }}
                        >
                            <InfoRow
                                icon="calendar-month"
                                label="Thời gian"
                                value={timeStr}
                                color={theme.colors.primary}
                            />
                            <InfoRow
                                icon="map-marker"
                                label="Địa điểm"
                                value={sessionInfo?.location ?? '--'}
                                color={theme.colors.primary}
                            />
                            <InfoRow
                                icon="account"
                                label="Số lượng người hiện tại"
                                value={sessionInfo?.currentPlayers ?? '--'}
                                color={theme.colors.primary}
                            />
                            <InfoRow
                                icon="account-group"
                                label="Người tham gia tối đa"
                                value={sessionInfo?.maxPlayers ?? '--'}
                                color={theme.colors.primary}
                            />
                            <InfoRow
                                icon="cash"
                                label="Phí 1 người"
                                value={`Nam ${(sessionInfo?.dataGenderSession?.malePrice ?? 0)?.toLocaleString('vi-VN')} - Nữ ${(sessionInfo?.dataGenderSession?.femalePrice ?? 0)?.toLocaleString('vi-VN')}`}
                                color={theme.colors.primary}
                            />
                            <InfoRow
                                icon="podium-gold"
                                label="Trình độ"
                                value={`Nam: ${(sessionInfo?.dataGenderSession?.selectedMaleLevels?.toString())} - Nữ: ${(sessionInfo?.dataGenderSession?.selectedFemaleLevels?.toString())}`}
                                color={theme.colors.primary}
                            />
                        </Surface>

                        {/* --- Selector Nam / Nữ --- */}
                        {/*<Text style={{ marginTop: 14, marginBottom: 6, fontWeight: '600' }}>*/}
                        {/*    Số lượng người */}
                        {/*</Text>*/}
                        {/*<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>*/}
                        {/*    /!* Nam *!/*/}
                        {/*    <View*/}
                        {/*        style={{*/}
                        {/*            flexDirection: 'row',*/}
                        {/*            alignItems: 'center',*/}
                        {/*            justifyContent: 'center',*/}
                        {/*            marginTop: 12,*/}
                        {/*            borderRadius: 999,*/}
                        {/*            paddingHorizontal: 10,*/}
                        {/*            width: '45%',*/}
                        {/*            alignSelf: 'center',*/}
                        {/*            backgroundColor: theme.colors.surfaceVariant,*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <IconButton icon="minus" size={18} onPress={decMale} disabled={qtyMale <= 0} />*/}
                        {/*        <Text style={{ width: 40, textAlign: 'center', fontSize: 18, fontWeight: '700' }}>*/}
                        {/*            {qtyMale} <FontAwesome name="user" size={18} color="#3366FF" />*/}
                        {/*        </Text>*/}
                        {/*        <IconButton icon="plus" size={18} onPress={incMale} />*/}
                        {/*    </View>*/}

                        {/*    /!* Nữ *!/*/}
                        {/*    <View*/}
                        {/*        style={{*/}
                        {/*            flexDirection: 'row',*/}
                        {/*            alignItems: 'center',*/}
                        {/*            justifyContent: 'center',*/}
                        {/*            marginTop: 12,*/}
                        {/*            borderRadius: 999,*/}
                        {/*            paddingHorizontal: 10,*/}
                        {/*            width: '45%',*/}
                        {/*            alignSelf: 'center',*/}
                        {/*            backgroundColor: theme.colors.surfaceVariant,*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <IconButton icon="minus" size={18} onPress={decFemale} disabled={qtyFemale <= 0} />*/}
                        {/*        <Text style={{ width: 40, textAlign: 'center', fontSize: 18, fontWeight: '700' }}>*/}
                        {/*            {qtyFemale} <FontAwesome name="user" size={18} color="#FF3399" />*/}
                        {/*        </Text>*/}
                        {/*        <IconButton icon="plus" size={18} onPress={incFemale} />*/}
                        {/*    </View>*/}
                        {/*</View>*/}

                        <Divider style={{marginVertical: 10}}/>
                    </ScrollView>

                    {/* --- Hành động --- */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            gap: 10,
                            marginTop: 10,
                        }}
                    >
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={{
                                color: theme.colors.onSurfaceVariant,
                                fontWeight: '700',
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                            }}>
                                {cancelText}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onConfirm}
                            style={{
                                backgroundColor: theme.colors.primary,
                                borderRadius: 8,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                            }}
                        >
                            <Text style={{color: 'white', fontWeight: '700'}}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
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

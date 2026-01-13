import React, {useState} from 'react';
import {View, Image, StyleSheet, Alert, Pressable} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function AvatarPicker({
                                         value,
                                         onChange,
                                         size = 120,
                                     }: {
    value?: string | null;           // uri
    onChange: (uri: string | null) => void;
    size?: number;
}) {
    const [busy, setBusy] = useState(false);
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const pickImage = async () => {
        try {
            setBusy(true);
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,      // cho crop
                aspect: [1, 1],           // vuông cho avatar
                quality: 0.8,
            });
            if (!res.canceled) {
                onChange(res.assets[0].uri);
            }
        } catch (e: any) {
            Alert.alert('Không chọn được ảnh', e?.message ?? 'Đã có lỗi xảy ra');
        } finally {
            setBusy(false);
        }
    };

    return (
        <View style={styles.center}>
            <View style={{position:'relative'}}>
                <Pressable onPress={pickImage} disabled={busy}>
                    {value ? (
                        <Image source={{ uri: value }} style={{width:size, height:size, borderRadius:size/2}} />
                    ) : (
                        <View style={[styles.placeholder, {width:size, height:size, borderRadius:size/2}]}>
                            <Text>Đổi ảnh</Text>
                        </View>
                    )}
                </Pressable>
                <IconButton
                    icon="image-multiple"
                    size={20}
                    mode="contained"
                    style={[styles.fab, {right:-6, bottom:-6}]}
                    onPress={pickImage}
                    disabled={busy}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    center: {alignItems:'center', marginTop:0, marginBottom:10},
    placeholder: {backgroundColor:'#EDEDED', alignItems:'center', justifyContent:'center'},
    fab: {position:'absolute', borderRadius:18},
});

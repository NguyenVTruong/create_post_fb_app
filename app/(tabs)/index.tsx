import React from 'react';
import {Animated, Dimensions, Platform, StyleSheet, View} from 'react-native';
import 'dayjs/locale/en'; // đảm bảo dùng ngôn ngữ tiếng Anh
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import {Text} from "@/components/Themed"; // import ngôn ngữ tiếng Việt

dayjs.locale('vi');       // kích hoạt locale

export default function TabOneScreen() {

    return (
        <View style={styles.container}>
            <Text>Hello</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingTop: 50,
        position: 'relative', //  rất quan trọng
    },
    storyList: {
        paddingLeft: 16,
        marginBottom: 12,
    },
    storyAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    storyName: {
        fontSize: 14,
        marginTop: 4,
    },
    chatItem: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
    },

    userPostItem: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
    },
    chatAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    chatContent: {
        flex: 1,
        marginLeft: 12,
    },
    chatName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    chatMessage: {
        color: '#555',
        fontSize: 14,
    },
    chatTimeContainer: {
        alignItems: 'flex-end',
    },
    chatTime: {
        fontWeight: 500,
        fontSize: 12,
        color: '#000000',
    },
    unreadDot: {
        marginTop: 4,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'blue',
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        color: '#111827',
        paddingHorizontal: 16,
        marginBottom: 0,
        marginTop: 8,
    },

    // model
    containerModel: {
        display: 'flex',
        paddingTop: 50,
    },
    modal: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end', // Đẩy modal xuống dưới
        backgroundColor: 'transparent', // Nền mờ
    },

    popupContainer: {
        display: 'flex',
        width: Dimensions.get('window').width * 1,
        height: Platform.OS === "ios" ? Dimensions.get('window').height * 0.9 : Dimensions.get('window').height * 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20

    },

    popupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: '#007BFF', // màu xanh
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },

    dateContainer: {
        marginTop: 10,
    },

    dateItem: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 4,
    },

    selectedDateItem: {
        backgroundColor: '#007bff',
    },

    dayText: {
        fontSize: 12,
        color: '#888',
    },

    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },

    selectedText: {
        color: '#fff',
    },

    rowTime: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        marginHorizontal: 12,
        fontSize: 18,
        fontWeight: '600',
    },
    buttonTime: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 8,
    },
    buttonTimeEnd: {
        backgroundColor: '#ff5093',
        paddingVertical: 12,
        paddingHorizontal: 5,
        borderRadius: 8,
    },
    buttonTimeText: {
        color: 'white',
        fontSize: 16,
    },
    picker: {
        width: '100%',
        marginTop: 16,
    },

    // Trình độ
    levelContainer: {
        padding: 5,
    },
    leveItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#eef2ff', // màu nền nhạt
        marginHorizontal: 6,  //  tạo khoảng cách ngang
    },
    leveItemSelected: {
        backgroundColor: '#1d4ed8', // màu xanh khi được chọn
    },
    leveText: {
        color: '#1d4ed8',
        fontWeight: '600',
    },
    leveTextSelected: {
        color: 'white',
    },

    textArea: {
        height: 80,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },

    button: {
        alignItems: "center",
        backgroundColor: '#5d76f6', // Màu xanh lá nhẹ
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 24,
        marginTop: 10,
        width: '80%'
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },

    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '600',
    },
    optionRow: {
        marginTop: 5,
        flexDirection: 'row',
        gap: 24,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1d4ed8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedCircle: {
        borderColor: '#1d4ed8',
    },
    radioDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#1d4ed8',
    },
    optionText: {
        marginLeft: 8,
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111827',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.16,
        shadowRadius: 12,
        shadowOffset: {width: 0, height: 6},
    },

    // dc
    inputBoxAddress: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
    },
    modalOverlayAddress: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-end",
    },
    modalContainerAddress: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: "60%",
        padding: 20,
    },
    titleAddress: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
    },
    optionAddress: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    closeBtnAddress: {
        marginTop: 15,
        backgroundColor: "#5d76f6",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },

    rowQuantity: {flexDirection: "column", justifyContent: "space-between", alignItems: "center"},
    labelQuantity: {fontSize: 16, fontWeight: "600"},
    counterQuantity: {flexDirection: "row", alignItems: "center", gap: 12},
    btnQuantity: {
        width: 36, height: 36,
        borderRadius: 18,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
    },
    btnTextQuantity: {fontSize: 20, fontWeight: "bold", color: "#3366FF"},
    valueQuantity: {fontSize: 18, fontWeight: "600", minWidth: 24, textAlign: "center"},
    // Court
    searchCourtInput: {
        // borderWidth: 1,
        // borderColor: "#ccc",
        // borderRadius: 8,
        // padding: 10,
        // marginBottom: 12,
        fontSize: 16,
        color: "#000",
    },
    dropdownCourt: {
        position: "absolute",   // quan trọng
        top: 40,                // đặt ngay dưới ô input (tùy chỉnh theo UI)

        width: '100%',
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        zIndex: 1000,           // đảm bảo nó nổi lên trên
        maxHeight: 200,
    },

    dropdownBoxCourt: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    modalContainerCourt: {flex: 1, padding: 20},
    itemCourt: {
        flexDirection: "row",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        alignItems: "center",
    },
    itemNameCourt: {fontWeight: "bold", fontSize: 16},
    itemSubCourt: {color: "#666", fontSize: 13},
    // Tooltip khi có người tạo buổi chơi
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 120,
        backgroundColor: "rgba(250,152,54,0.85)",
        width: '40%',
        height: 25,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        elevation: 5,
        color: "#ffffff",
    },
    tooltipContainer: {
        position: "absolute",
        bottom: 90,
        right: 25,
        backgroundColor: "#064e3b",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        maxWidth: 250,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 2,
        elevation: 2,
    },
    tooltipText: {
        color: "#fff",
        fontSize: 13,
    },
});
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {View, StyleSheet, Text, Pressable, Modal} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import UserMenuCard from '../UserMenuCard/UserMenuCard';

const styles = StyleSheet.create({
    modalOverlay: {
        backgroundColor: '#0f003f',
        height: '100%'
    },
    modalHeader: {
        backgroundColor: '#696087',
        height: 200,
        zIndex: 2,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        marginBottom: 15
    },
    modalHeaderButtonContainer: {
        marginHorizontal: 15,
        marginTop: 15,
    },
    headerButtonContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    userProfileIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userProfilePictureContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#ffffff',
        height: 80,
        width: 80,
        borderRadius: 50,
        overflow: 'hidden'
    },
    userProfileCameraContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#00A28E',
        backgroundColor: '#00A28E',
        height: 20,
        width: 20,
        borderRadius: 50,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    userProfilebuttons: {
        height: 80,
        width: 80,
    },
    userNameContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    userNameText: {
        color: '#ffffff',
        fontSize: 25
    },
    signOutButton: {
        backgroundColor: "#ffffff",
        height: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0
    },
    categoryContainer: {
        margin: 15,
        backgroundColor: '#696087',
        zIndex: 2,
        borderRadius: 2
    },
    categoryMargin: {
        marginHorizontal: 15
    },
    categoryHeader: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        paddingVertical: 5
    }
});

function ProfileModal({setModalstate}) {

    function closeModal() {
        setModalstate(false);
    }

  return (
    <Modal>
        <View style={styles.modalOverlay}>
            <View style={styles.modalHeader}>
                <View style={styles.modalHeaderButtonContainer}>
                    <View style={styles.headerButtonContainer}>
                    <Pressable onPress={closeModal}>
                        <MaterialIcon
                            name="close-circle"
                            size={35}
                            color="#ffffff"
                        />
                        </Pressable>
                        <Button onPress={() => navigation.navigate('Login')} style={styles.signOutButton}>
                        Sign out
                        </Button>
                    </View> 
                    <View style={styles.userProfileIconContainer}>
                    <View style={styles.userProfilebuttons}>
                        <View style={styles.userProfilePictureContainer}>
                        <AwesomeIcon
                            name="user"
                            size={90}
                            color="#ffffff"
                        />
                        </View>
                        <Pressable style={styles.userProfileCameraContainer}>
                        <AwesomeIcon
                            name="camera"
                            size={10}
                            color="#ffffff"
                        />
                        </Pressable>
                    </View>
                    </View>
                    <View style={styles.userNameContainer}>
                    <Text style={styles.userNameText}>
                        John Smith
                    </Text>
                    </View>
                </View>
            </View>

            <View style={styles.categoryContainer}>
                <View style={styles.categoryMargin}>
                    <Text style={styles.categoryHeader}>Account</Text>
                    <UserMenuCard props={{icon: 'pencil', cardText: 'Edit User Details'}}></UserMenuCard>
                    <UserMenuCard props={{icon: 'lock', cardText: 'Change Password'}}></UserMenuCard>
                    <UserMenuCard props={{icon: 'notification-clear-all', cardText: 'Notifications'}}></UserMenuCard>
                </View>
            </View>
            <View style={styles.categoryContainer}>
                <View style={styles.categoryMargin}>
                    <Text style={styles.categoryHeader}>Payment</Text>
                    <UserMenuCard props={{icon: 'credit-card', cardText: 'Manage Cards'}}></UserMenuCard>
                    <UserMenuCard props={{icon: 'receipt', cardText: 'e-Receipt Preferences'}}></UserMenuCard>
                </View>
            </View>
            <View style={styles.categoryContainer}>
                <View style={styles.categoryMargin}>
                    <Text style={styles.categoryHeader}>More</Text>
                    <UserMenuCard props={{icon: 'thought-bubble-outline', cardText: 'FAQ'}}></UserMenuCard>
                    <UserMenuCard props={{icon: 'thumbs-up-down-outline', cardText: 'Send Feedback'}}></UserMenuCard>
                    <UserMenuCard props={{icon: 'chat-question-outline', cardText: 'Help and Support'}}></UserMenuCard>
                    <UserMenuCard props={{icon: 'book', cardText: 'Terms of Use'}}></UserMenuCard>
                </View>
            </View>
        </View>
    </Modal>
  );
}

export default ProfileModal;

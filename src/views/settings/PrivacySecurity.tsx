import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import List from '../../components/List';
import Popup from '../../components/Popup';
import Toggle from '../../components/Toggle';
import {options} from '../../data/privacySecurity';
import {setModalNotVisible, setModalVisible} from '../../redux/actions/modal';
import {setPassword, setPasswordUse} from '../../redux/actions/settings';
import {RootState} from '../../redux/types/store';
import privacySecurityListStyles from '../../styles/list/privacySecurity';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {gray, muted, primary, white} from '../../utils/colors';
import ReactNativeModal from 'react-native-modal';
import {ModalVisible} from '../../redux/types/modal';

export default function PrivacySecurity() {
  const dispatch = useDispatch();
  const {isUsingPassword, password} = useSelector(
    (state: RootState) => state.settings,
  );
  const {modalVisible} = useSelector((state: RootState) => state.modal);
  const [showPassword, setShowPassword] = useState(false);
  const data = useRef('');

  const hide = !password || !isUsingPassword ? ['update-password'] : [];

  function setData(content: string) {
    data.current = content;
  }

  function toggleSwitch() {
    dispatch(setPasswordUse(!isUsingPassword));
  }

  function onPress(item: any) {
    if (item.id !== 'update-password') return null;
    dispatch(setModalVisible(ModalVisible.ADD));
  }

  function ToggleButton({item}: {item?: any}) {
    if (item.id !== 'update-password')
      return <Toggle toggleSwitch={toggleSwitch} isEnabled={isUsingPassword} />;
    return null;
  }

  function ChangePasswordIcon({item}: {item?: any}) {
    if (item.id !== 'update-password') return null;
    return <FontAwesome5Icon name="chevron-right" size={16} color={primary} />;
  }

  function handlePasswordModalClose() {
    if (!password) dispatch(setPasswordUse(false));
    dispatch(setModalNotVisible());
    setData('');
  }

  function onEndEditing() {
    const newPassword = data.current || password;

    dispatch(setPassword(newPassword));
    dispatch(setModalNotVisible());
    setData('');
  }

  useEffect(() => {
    if (isUsingPassword) {
      if (!password) dispatch(setModalVisible(ModalVisible.PASSWORD));
    }
  }, [isUsingPassword]);

  return (
    <View style={styles.container}>
      <Header title="Privacy & Security" left={['back', 'title']} />
      <View style={{flex: 1}}>
        <Text style={styles.headingText}>Password</Text>
        <List
          data={options}
          exclude={['id']}
          hide={hide}
          onPress={onPress}
          styles={privacySecurityListStyles}>
          <ToggleButton />
          <ChangePasswordIcon />
        </List>
      </View>
      {/* <Popup animationType="slide" presentation="full" transparent={false}> */}
      <ReactNativeModal
        style={styles.modalContainer}
        isVisible={modalVisible === ModalVisible.PASSWORD}
        swipeDirection={['down']}
        onBackdropPress={handlePasswordModalClose}
        onSwipeComplete={handlePasswordModalClose}>
        <View style={styles.modalView}>
          <View style={styles.modalHeadingContainer}>
            <Text style={styles.modalHeadingText}>Password</Text>
            <Pressable onPress={handlePasswordModalClose}>
              <AntDesign name="close" size={18} />
            </Pressable>
          </View>
          <Text>Set your login password</Text>
          <Text>Note: This can always be changed in the future</Text>
          <View style={styles.modalInputContainer}>
            <TextInput
              style={styles.modalInput}
              autoFocus={true}
              secureTextEntry={!showPassword}
              placeholder="Password"
              keyboardType="numeric"
              defaultValue={password || data.current}
              onChangeText={(content: string) => setData(content)}
              onEndEditing={onEndEditing}
            />
            <Pressable
              style={styles.showPassword}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FontAwesome5Icon name="eye" size={18} />
              ) : (
                <FontAwesome5Icon name="eye-slash" size={18} />
              )}
            </Pressable>
          </View>
        </View>
      </ReactNativeModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    backgroundColor: white,
    padding: 30,
  },
  headingText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  modalHeadingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  modalHeadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalInputContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 50,
    width: '100%',
  },
  modalInput: {
    borderRadius: 0,
    width: '100%',
  },
  showPassword: {
    alignItems: 'center',
    display: 'flex',
    height: 64,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 50,
  },
});

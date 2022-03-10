import React, {useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import ReactNativeModal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {Header, List, Toggle} from '../../components';
import {options} from '../../data/privacySecurity';
import {actions} from '../../redux';
import privacySecurityListStyles from '../../styles/list/privacySecurity';
import {modalTypes, storeTypes} from '../../types';
import {colors} from '../../utils';

export default function PrivacySecurity() {
  const dispatch = useDispatch();
  const {isUsingPassword, password} = useSelector(
    (state: storeTypes.RootState) => state.settings,
  );
  const {modalVisible} = useSelector(
    (state: storeTypes.RootState) => state.modal,
  );
  const [showPassword, setShowPassword] = useState(false);
  const data = useRef('');

  const hide = !password || !isUsingPassword ? ['update-password'] : [];

  function setData(content: string) {
    data.current = content;
  }

  function toggleSwitch() {
    dispatch(actions.setting.setPasswordUse(!isUsingPassword));
  }

  function onPress(item: any) {
    if (item.id !== 'update-password') return null;
    dispatch(actions.modal.setVisible(modalTypes.ModalVisible.ADD));
  }

  function ToggleButton({item}: {item?: any}) {
    if (item.id !== 'update-password')
      return <Toggle toggleSwitch={toggleSwitch} isEnabled={isUsingPassword} />;
    return null;
  }

  function ChangePasswordIcon({item}: {item?: any}) {
    if (item.id !== 'update-password') return null;
    return (
      <FontAwesome5Icon name="chevron-right" size={16} color={colors.primary} />
    );
  }

  function handlePasswordModalClose() {
    if (!password) dispatch(actions.setting.setPasswordUse(false));
    dispatch(actions.modal.setNotVisible());
    setData('');
  }

  function onEndEditing() {
    const newPassword = data.current || password;

    dispatch(actions.setting.setPassword(newPassword));
    dispatch(actions.modal.setNotVisible());
    setData('');
  }

  useEffect(() => {
    if (isUsingPassword) {
      if (!password)
        dispatch(actions.modal.setVisible(modalTypes.ModalVisible.PASSWORD));
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
        isVisible={modalVisible === modalTypes.ModalVisible.PASSWORD}
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
    backgroundColor: colors.primary,
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

import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/types/store';
import fromBottomPopupStyles from '../styles/popup/fromBottom';
import fullScreenPopupStyles from '../styles/popup/fullScreen';
import popupStyles from '../styles/popup/main';

// TODO move to types, add gestures to popup, fill in any types
type AnimationType = 'none' | 'slide' | 'fade' | undefined;
type Presentation = 'center' | 'bottom' | 'top' | 'full';

export default function Popup({
  animationType = 'none',
  transparent = false,
  hasTab = false,
  onRequestClose,
  presentation = 'center',
  children,
  styles = popupStyles,
}: {
  animationType?: AnimationType;
  transparent?: boolean;
  hasTab?: boolean;
  onRequestClose?: () => void;
  presentation?: Presentation;
  children?: React.ReactNode;
  styles?: any;
}) {
  const {modalVisible} = useSelector((state: RootState) => state.modal);
  const presentationMap: {[index: string]: any} = {
    full: fullScreenPopupStyles,
    center: popupStyles,
    bottom: fromBottomPopupStyles,
  };
  const presentationStyle = presentationMap[presentation];

  return (
    <>
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.container}></View>
        <View style={[styles.underlay, presentationStyle.underlay]}>
          <View style={[styles.modal, presentationStyle.modal]}>
            {hasTab && (
              <View style={[styles.tabContainer]}>
                <View style={[styles.tab]}></View>
              </View>
            )}
            {children}
          </View>
        </View>
      </Modal>
    </>
  );
}

import React from 'react';
import {Modal, View} from 'react-native';
import {useSelector} from 'react-redux';
import {storeTypes} from '../types';
import {style} from '../styles';

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
  styles = style.popup.main,
}: {
  animationType?: AnimationType;
  transparent?: boolean;
  hasTab?: boolean;
  onRequestClose?: () => void;
  presentation?: Presentation;
  children?: React.ReactNode;
  styles?: any;
}) {
  const {modalVisible} = useSelector(
    (state: storeTypes.RootState) => state.modal,
  );
  const presentationMap: {[index: string]: any} = {
    full: style.popup.fullScreen,
    center: style.popup.main,
    bottom: style.popup.fromBottom,
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

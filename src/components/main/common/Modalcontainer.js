import React from 'react'
import {View} from 'react-native'
import Modal from 'react-native-modal'

export const openPopUp = isModalOpen => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Modal
        style={{
          backgroundColor: 'transparent',
        }}
        customBackdrop={() => {}}
        useNativeDriver={true}
        supportedOrientations={['landscape', 'portrait']}
        animationType='slide'
        transparent
        isVisible={isModalOpen}
        hasBackdrop={true}
        animationInTiming={1000}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            justifyContent: 'center',
            height: 200,
            borderRadius: 16,
          }}>
          <View style={{}}></View>
        </View>
      </Modal>
    </View>
  )
}

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ICONS} from '../assets';
interface HeaderInterface {
  title: string;
  onPressBack?: () => void;
  showbackbutton?: boolean;
}
const Header = (props: HeaderInterface) => {
  const {title, onPressBack, showbackbutton} = props;
  return (
    <View style={styles.container}>
      {showbackbutton ? (
        <TouchableOpacity
          onPress={onPressBack}
          style={styles.backIconContainer}>
          <Image source={ICONS.BACK} style={styles.backIcon} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <View>
        <Text>{title}</Text>
      </View>
      <View></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  backIconContainer: {width: 50, alignItems: 'center'},
  backIcon: {height: 18, width: 18},
});

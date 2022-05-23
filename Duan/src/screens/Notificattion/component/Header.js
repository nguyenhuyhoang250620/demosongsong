import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HeaderComponent = (props) => {
  return (
    <View style={[styles.headerView,{height:props.height}]}>
      <Text style={styles.titlePage}>Thông báo</Text>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  headerView: {
    paddingVertical: 10,
    paddingLeft: 4,
   
  },
  titlePage: {
    fontSize: 24,
    fontWeight: '700',
  },
});

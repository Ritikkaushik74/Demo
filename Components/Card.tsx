import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import moment from 'moment';
interface CardInterface {
  title: string;
  created: number;
  score: string | number;
  num_comments: string | number;
  author_fullname: string;
  onPress: ({url, title}: {url: string; title: string}) => void;
  thumbnail: string;
  url: string;
}
const Card = (props: CardInterface) => {
  const {
    title,
    created,
    thumbnail,
    score,
    num_comments,
    author_fullname,
    url,
    onPress,
  } = props;
  const createdDate = new Date(created * 1000);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress({url, title});
      }}>
      <View style={styles.thumbnailContainer}>
        <Image source={{uri: thumbnail}} style={{flex: 1}} resizeMode="cover" />
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.dateContainer}>
          <Text>{moment(createdDate, 'YYYYMMDD').fromNow()}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.authorContainer}>
          <Text>{author_fullname}</Text>
          <Text>score: {score}</Text>
          <Text>{num_comments} comments</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {width: '100%', flexDirection: 'row', minHeight: 90},
  thumbnailContainer: {width: 100, paddingHorizontal: 10, paddingVertical: 5},
  rightContainer: {flex: 1},
  dateContainer: {alignItems: 'flex-end'},
  titleContainer: {paddingBottom: 5},
  title: {fontSize: 16, fontWeight: '600'},
  authorContainer: {flexDirection: 'row', justifyContent: 'space-between'},
});

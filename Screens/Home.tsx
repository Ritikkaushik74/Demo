import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Card from '../Components/Card';
import axios from 'axios';
import Header from '../Components/Header';
const Home = ({navigation}) => {
  const [dataList, setDataList] = useState([]);
  const unSortedList2 = useRef([]);
  const [selectedTab, setSelectedTab] = useState('New');
  const [isRefreshing, setIsRefreshing] = useState(true);

  const getData = async () => {
    try {
      setIsRefreshing(true);
      const response = await axios.get(
        'https://api.reddit.com/r/pics/hot.json',
      );
      if (response.status === 200) {
        if (response.data?.data?.children) {
          if (selectedTab !== 'New') setSelectedTab('New');
          setDataList(() => [...response.data.data.children]);
          unSortedList2.current = [...response.data.data.children];
        }
      }
      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnPress = ({title, url}) => {
    navigation.navigate('WebViewScreen', {
      title,
      url,
    });
  };
  const renderItem = ({item}) => {
    return <Card {...item.data} onPress={handleOnPress} />;
  };
  const handleOnHeaderPress = by => {
    setSelectedTab(by);
    switch (by) {
      case 'New':
        setDataList(() => [...unSortedList2.current]);
        break;
      case 'Top':
        setDataList(prev => [
          ...prev.sort((a, b) => {
            return b.data.score - a.data.score;
          }),
        ]);
        break;
      case 'Popular':
        setDataList(prev => [
          ...prev.sort((a, b) => {
            return b.data.ups - a.data.ups;
          }),
        ]);
        break;
      case 'Hot':
        setDataList(prev => [
          ...prev.sort((a, b) => {
            return b.data.upvote_ratio - a.data.upvote_ratio;
          }),
        ]);
        break;
      default:
        break;
    }
  };
  const headerComponent = () => {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => handleOnHeaderPress('New')}
          style={[
            styles.tabItem,
            selectedTab === 'New' && {backgroundColor: 'skyblue'},
          ]}>
          <Text>New</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOnHeaderPress('Top')}
          style={[
            styles.tabItem,
            selectedTab === 'Top' && {backgroundColor: 'skyblue'},
          ]}>
          <Text>Top</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOnHeaderPress('Popular')}
          style={[
            styles.tabItem,
            selectedTab === 'Popular' && {backgroundColor: 'skyblue'},
          ]}>
          <Text>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleOnHeaderPress('Hot')}
          style={[
            styles.tabItem,
            selectedTab === 'Hot' && {backgroundColor: 'skyblue'},
          ]}>
          <Text>Hot</Text>
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Header title="reddit/r/programing" />
      <FlatList
        onRefresh={getData}
        refreshing={isRefreshing}
        ListHeaderComponent={headerComponent}
        data={dataList}
        keyExtractor={(item, i) => item?.data?.id ?? i}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    borderTopColor: '#eeeee',
    borderTopWidth: 0.8,
    borderBottomColor: '#eeeee',
    borderBottomWidth: 0.8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

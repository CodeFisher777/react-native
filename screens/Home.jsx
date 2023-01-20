import {
  View,
  Alert,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Post } from '../components/Post';
import axios from 'axios';
import React from 'react';
import { Loading } from '../components/Loading';

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState();

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('http://5c3755177820ff0014d92711.mockapi.io/articles')
      .then(({ data }) => setItems(data.slice(0, 5)))
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FullPost', {
                id: item.id,
                title: item.title,
              })
            }
          >
            <Post title={item.title} imageUrl={item.imageUrl} createdAt={item.createdAt} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Taskbar from "./components/taskbar";
import Icon from "react-native-vector-icons/FontAwesome5";
const FeedScreen = () => {
  const [statusUsers, setStatusUsers] = useState([
    {
      id: 1,
      name: "Alex Carter",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 2,
      name: "Noah Anderson",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar7.png",
    },
    {
      id: 3,
      name: "Daniel Brooks",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar3.png",
    },
    {
      id: 4,
      name: "Emily Harrison",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar8.png",
    },
    {
      id: 5,
      name: "Liam Bennett",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar5.png",
    },

    {
      id: 6,
      name: "Ava Thompson",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar6.png",
    },
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      userId: 1,
      username: "Liam Bennett",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar5.png",
      date: "Jan 18, 2025",
      description:
        "There's no place like New York City #ThatsAll #Pivot #GangsofNewYork",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/450px-New_york_times_square-terabass.jpg",
    },
    {
      id: 2,
      userId: 2,
      username: "Noah Anderson",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar7.png",
      date: "Feb 04, 2025",
      description:
        "Embracing diverse beauty in Japan, moving beyond traditional standards to celebrate individuality and self-love! #JapaneseBeauty #BodyPositivity #Diversity #SelfLove #BeautyBeyondStandards",
      imageUrl:
        "https://blog.japanwondertravel.com/wp-content/uploads/2020/11/alessio-ferretti-xya29UAmo8U-unsplash-1200x800.jpg",
    },
    {
      id: 3,
      userId: 3,
      username: "Emily Harrison",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar8.png",
      date: "Feb 17, 2025",
      description:
        "Mexico’s beauty is truly breathtaking! From stunning beaches and ancient ruins to vibrant culture and delicious food, every moment feels magical. Can’t wait to visit again! 🇲🇽✨ #MexicoMagic #TravelDiaries #UnforgettableViews",
      imageUrl: null,
    },
  ]);

  const UserListItem = ({ user }) => (
    <View style={styles.userItem}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      <Text
        style={styles.statusUserName}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {user.name}
      </Text>
    </View>
  );

  const PostCard = ({ post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.avatarUrl }} style={styles.postAvatar} />
        <Text style={styles.postUsername}>{post.username}</Text>
        <Text style={styles.postDate}>{post.date}</Text>
      </View>
      <Text style={styles.postDescription}>{post.description}</Text>
      {post.imageUrl && (
        <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
      )}
      <View style={styles.postFooter}>
        <TouchableOpacity style={styles.postButton}>
          <Icon name="thumbs-up" size={16} color="#808080" />
          <Text style={styles.postButtonText}> Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton}>
          <Icon name="comment" size={16} color="#808080" />
          <Text style={styles.postButtonText}> Comment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton}>
          <Icon name="share" size={16} color="#808080" />
          <Text style={styles.postButtonText}> Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ✅ Page Title */}
      <Text style={styles.pageTitle}>Socials</Text>

      {/* ✅ Horizontal User Stories */}
      <ScrollView horizontal>
        <View style={styles.userContainer}>
          {statusUsers.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </View>
      </ScrollView>

      {/* ✅ Posts List */}
      <FlatList
        data={posts}
        contentContainerStyle={styles.postListContainer}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
      />
      <Taskbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    backgroundColor: "#fff",
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: "#000",
  },
  userContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    height: 100,
  },
  userItem: {
    marginRight: 10,
    alignItems: "center",
  },
  statusUserName: {
    marginTop: 5,
    fontSize: 12,
    color: "#483D8B",
    width: 60,
    textAlign: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#7dd87d",
  },
  postListContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  postCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  postAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  postUsername: {
    flex: 1,
  },
  postDate: {
    fontSize: 12,
    color: "#A9A9A9",
  },
  postDescription: {
    fontSize: 16,
    color: "#00008B",
  },
  postImage: {
    marginTop: 10,
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  postFooter: {
    flexDirection: "row",
    marginTop: 10,
  },
  postButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  postButtonText: {
    color: "#808080",
    marginLeft: 5, // Space between icon and text
  },
});

export default FeedScreen;

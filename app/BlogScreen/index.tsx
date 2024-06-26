import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList, BlogModel } from "@/types/shared";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import ModalContent from "@/components/ModalContent";
import { Modal } from "react-native";
import { deleteBlog } from "@/actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/reducers/rootReducer";
import Button from "@/components/Button";
type BlogDetailRouteProp = RouteProp<RootStackParamList, "BlogScreen">;

const BlogScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute<BlogDetailRouteProp>();
  const blogId = route?.params?.blogId;
  const blogs = useSelector((state: RootState) => state.blogs);
  const blog = blogs.find((blog: BlogModel) => blog.id === blogId);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [blogInfo, setBlogInfo] = useState<BlogModel | undefined>(blog);
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleDeleteBlog = () => {
    if (!blog) return;
    dispatch(deleteBlog(blog.id));
    handleGoBack();
  };
  const handleEditBlog = () => {
    if (!blog) return;
    setIsModalVisible(true);
    setBlogInfo(blog);
  };
  return (
    <>
      <SafeAreaView edges={["top"]} />
      <View style={styles.container}>
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.goBack}>Go Back</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>{blog?.title} </Text>
          <Text>{blog?.content}</Text>
          <View style={styles.blogInfo}>
            {blog?.category.title && (
              <Text style={styles.blogInfoText}>
                Category: {blog?.category.title}
              </Text>
            )}
            <Text style={styles.blogInfoText}>Author: {blog?.author}</Text>
            <Text style={styles.blogInfoText}>Date:{blog?.date}</Text>
          </View>
        </View>
        <Button type="primary" onPress={handleEditBlog} text="Edit Blog" />

        <Button type="danger" onPress={handleDeleteBlog} text="Delete Blog" />
      </View>
      <Modal visible={isModalVisible} animationType="slide">
        <ModalContent
          onClose={() => setIsModalVisible(false)}
          blog={blogInfo}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  goBack: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    textAlign: "left",
    marginBottom: 20,
  },

  blogInfo: {
    marginTop: 50,
    alignItems: "flex-end",
  },
  blogInfoText: {
    fontStyle: "italic",
    marginBottom: 5,
    fontWeight: "bold",
  },
});

export default BlogScreen;

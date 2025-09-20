import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import styles from "../../assets/styles/productScreen.styles";
import { useRouter } from "expo-router";
import imageMap from "../../constants/imageMap";
import { API_URL } from "../../constants/constantVariables";
import FavoriteButton from "../../components/FavoriteButton";

const ProductScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();
  
  // Kategorileri çek
  useEffect(() => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Kategoriler alınamadı:", err));
  }, []);

  const fetchProducts = async (pageNumber = 1, term = "", categoryId = null) => {
    if (loading) return;

    setLoading(true);
    try {
      let url = `${API_URL}/products?search=${term}&page=${pageNumber}&limit=5`;
      if (categoryId) {
        url += `&categoryId=${categoryId}`;
      }

      const res = await axios.get(url);
      const newProducts = res.data.products;

      if (pageNumber === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => [...prev, ...newProducts]);
      }

      setHasMore(newProducts.length >= 5);
    } catch (error) {
      console.error("Ürünler alınamadı:", error);
    }
    setLoading(false);
  };

  // Arama debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchProducts(1, searchTerm, selectedCategory);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm, selectedCategory]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, searchTerm, selectedCategory);
    }
  };

  const renderItem = ({ item }) => {
    const imageFilename =
      item.image && item.image.length > 0 ? item.image[0] : null;
    const imageNumber = imageFilename
      ? parseInt(imageFilename.replace("product", "").replace(".png", ""))
      : null;
    const localImage = imageMap[imageNumber];

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/product/${item.id}`)}
      >
        {localImage ? (
          <Image source={localImage} style={styles.image} />
        ) : (
          <Text>Görsel yok</Text>
        )}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₺{item.price}</Text>
        <FavoriteButton productId={item.id} />
      </TouchableOpacity>
    );
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryBox,
        selectedCategory === item.id && styles.categoryBoxActive,
      ]}
      onPress={() =>
        setSelectedCategory(selectedCategory === item.id ? null : item.id)
      }
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search */}
      <TextInput
        placeholder="Search..."
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={(text) => {
          setSearchTerm(text);
        }}
      />

      {/* Category kutucukları */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginVertical: 10 }}
      />

      {/* Products */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={loading && <ActivityIndicator />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductScreen;
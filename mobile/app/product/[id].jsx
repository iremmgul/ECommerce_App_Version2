import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import styles from "../../assets/styles/productProfile.styles";
import { API_URL } from "../../constants/constantVariables";
import imageMap from "../../constants/imageMap";
import FavoriteButton from "../../components/FavoriteButton";
import CartButton from "../../components/CartButton";
import ReviewCard from "../../components/ReviewCard";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Ürün verisi alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await axios.get(`${API_URL}/products/${id}/reviews`);
      setReviews(response.data); // backend response'a göre ayarla
    } catch (error) {
      console.error("Yorumlar alınamadı:", error);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff6f00" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Ürün bulunamadı.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ReviewCard
          review={{
            id: item.id,
            userName: item.userName,
            rating: item.rating,
            comment: item.comment,
            createdAt: item.createdAt,
          }}
        />
      )}
      ListHeaderComponent={
        <View style={styles.productCard}>
          <Image source={imageMap[product.id]} style={styles.productImage} />

          <View style={styles.favoriteWrapper}>
            <FavoriteButton productId={product.id} />
          </View>

          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <Text style={styles.price}>
            {product.discountedPrice?.toFixed(2) || product.price} TL
          </Text>

          <Text style={styles.installment}>
            Peşin Fiyatına 3 Taksit ({(product.price / 3).toFixed(2)} x 3 TL)
          </Text>

          <Text style={styles.rating}>⭐ {product.rating} {product.rate}</Text>

          {reviewsLoading && (
            <ActivityIndicator size="small" color="#ff6f00" />
          )}
          {!reviewsLoading && reviews.length === 0 && (
            <Text style={styles.noReviews}>Henüz yorum bulunmuyor.</Text>
          )}

          <TouchableOpacity>
            <CartButton productId={id} />
          </TouchableOpacity>
          
        </View>
        
      }
      contentContainerStyle={styles.container}
    />
  );
}


/*
import React, { useEffect, useState } from "react";
import { View, Text,FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator, } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import styles from "../../assets/styles/productProfile.styles";
import { API_URL } from "../../constants/constantVariables";
import imageMap from "../../constants/imageMap";
import FavoriteButton from "../../components/FavoriteButton";
import CartButton from "../../components/CartButton";
import ReviewCard from "../../components/ReviewCard";


export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Ürün verisi alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);

      const response = await axios.get(`${API_URL}/products/${id}/reviews`);

      // Backend'inizin hangi formatta döndürdüğüne göre ayarlayın:
      console.log(response.data);
      setReviews(response.data); // veya response.data.reviews
    } catch (error) {
      console.error("Yorumlar alınamadı:", error);
      setReviews([]); // Hata durumunda boş array
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#ff6f00" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Ürün bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.productCard}>
        
        <Image source={imageMap[product.id]} style={styles.productImage} />
  
        
        <View style={styles.favoriteWrapper}>
          <FavoriteButton productId={product.id} />
        </View>
  
        <Text style={styles.productName}>{product.name}</Text>

        <Text style={styles.productDescription}>{product.description}</Text>
  
        <Text style={styles.price}>
          {product.discountedPrice?.toFixed(2) || product.price} TL
        </Text>
  
        <Text style={styles.installment}>
          Peşin Fiyatına 3 Taksit ({(product.price / 3).toFixed(2)} x 3 TL)
        </Text>
  
        <Text style={styles.rating}>
          ⭐ {product.rating} {product.rate}
        </Text>

       {reviewsLoading ? (
  <ActivityIndicator size="small" color="#ff6f00" />
) : reviews.length > 0 ? (
  <FlatList
    data={reviews}
    renderItem={({ item }) => (
      <ReviewCard
        review={{
          id: item.id,
          userName: item.userName,
          rating: item.rating,
          comment: item.comment,
          createdAt: item.createdAt,
        }}
      />
    )}
    keyExtractor={(item) => item.id.toString()}
    scrollEnabled={false}
    style={styles.reviewsList}
  />
) : (
  <Text style={styles.noReviews}>Henüz yorum bulunmuyor.</Text>
)}

  
        <TouchableOpacity>
          <CartButton productId={id}  />
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
  
}
  */

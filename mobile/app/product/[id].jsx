import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import styles from "../../assets/styles/productProfile.styles";
import { API_URL } from "../../constants/constantVariables";
import imageMap from "../../constants/imageMap";
import FavoriteButton from "../../components/FavoriteButton";
import CartButton from "../../components/CartButton";


export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProduct();
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
  
        
        <View style={styles.badgeContainer}>
          {product.freeShipping && (
            <Text style={[styles.badge, { backgroundColor: "#A9A9A9" }]}>Kargo Bedava</Text>
          )}
          {product.sameDayShipping && (
            <Text style={[styles.badge, { backgroundColor: "#32CD32" }]}>Bugün Kargoda</Text>
          )}
          {product.creditEligible && (
            <Text style={[styles.badge, { backgroundColor: "#FFD700", color: "#000" }]}>
              Krediye Uygun
            </Text>
          )}
        </View>
  
        <Text style={styles.productName}>{product.name}</Text>
  
        <Text style={styles.price}>
          {product.discountedPrice?.toFixed(2) || product.price} TL
        </Text>
  
        <Text style={styles.installment}>
          Peşin Fiyatına 3 Taksit ({(product.price / 3).toFixed(2)} x 3 TL)
        </Text>
  
        <Text style={styles.rating}>
          ⭐ {product.rating} {product.rate}
        </Text>
  
        <TouchableOpacity>
          <CartButton productId={id} style={styles.addToCartButton} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  
}

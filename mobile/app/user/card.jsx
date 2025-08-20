import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, } from "react-native";
import styles from "../../assets/styles/cart.styles"; 
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "../../constants/constantVariables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import imageMap from "../../constants/imageMap";
import useUserStore from "../../store/userStore";
import useCartStore from "../../store/cartStore";
import CartButton from "../../components/CartButton"; 

export default function Cart() {
  const router = useRouter();
  const user = useUserStore((state) => state.userId);
  const userId = user?.id;

  const { cartVersion } = useCartStore(); 
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchCartItems = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token"); 
        if (!token) {
          console.warn("Token bulunamadı!");
          return;
        }
    
        const res = await axios.get(`${API_URL}/cart/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
    
        setCartItems(res.data);
      } catch (err) {
        console.error("Sepet ürünleri alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };
    

    fetchCartItems();
  }, [userId, cartVersion]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}>
          Your cart is empty.
        </Text>
      ) : (
        cartItems.map((item) => {
          const product = item.product || item; 
          const imageFilename =
            product.image && product.image.length > 0 ? product.image[0] : null;
          const imageNumber = imageFilename
            ? parseInt(imageFilename.replace("product", "").replace(".png", ""))
            : null;
          const localImage = imageMap[imageNumber];

          return (
            <TouchableOpacity
              key={product.id}
              onPress={() => router.push(`/product/${product.id}`)}
            >
              <View style={styles.card}>
                {!product.stock && (
                  <View style={styles.soldOutBadge}>
                    <Text style={styles.soldOutText}>SOLD OUT</Text>
                  </View>
                )}

                {localImage ? (
                  <Image source={localImage} style={styles.image} />
                ) : (
                  <Text>Görsel yok</Text>
                )}

                <View style={styles.info}>
                  <Text style={styles.title} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.price}>{product.price} TL</Text>
                  <Text style={styles.rate}>
                    ⭐ {product.rate ? parseFloat(product.rate).toFixed(1) : "0.0"}
                  </Text>

                  <TouchableOpacity>
                    <CartButton productId={item.id}/>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );
}


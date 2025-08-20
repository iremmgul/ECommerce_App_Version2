import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "../../assets/styles/favorites.styles";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "../../constants/constantVariables";
import imageMap from "../../constants/imageMap";
import useUserStore from "../../store/userStore";
import useFavoriteStore from "../../store/favoriteStore";
import CartButton from "../../components/CartButton";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function Favorites() {
  const router = useRouter();
  const user = useUserStore((state) => state.userId);
  const userId = user?.id;

  // Store'dan sadece version'ı al, gerçek zamanlı güncelleme için
  const { version } = useFavoriteStore();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token"); 
        if (!token) {
          console.warn("Token bulunamadı.");
          setLoading(false);
          return;
        }

        console.log("Favoriler çekiliyor...");
        
        // Bu endpoint çalışıyor, bunu kullan
        const res = await axios.get(`${API_URL}/favorite/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setFavorites(res.data);
        console.log("✅ Favoriler başarıyla yüklendi:", res.data.length, "adet");
      } catch (err) {
        console.error("Favoriler alınamadı:", err);
        console.error("Status:", err.response?.status);
        console.error("Data:", err.response?.data);
        console.error("URL:", `${API_URL}/favorite/user/${userId}`);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId, version]); // version değiştiğinde yeniden fetch et

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Favoriler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}>
          Henüz favori ürününüz yok.
        </Text>
      ) : (
        favorites.map((item) => {
          const imageFilename = item.image && item.image.length > 0 ? item.image[0] : null;
          const imageNumber = imageFilename
            ? parseInt(imageFilename.replace("product", "").replace(".png", ""))
            : null;
          const localImage = imageMap[imageNumber];

          return (
            <TouchableOpacity key={item.id} onPress={() => router.push(`/product/${item.id}`)}>
              <View style={styles.card}>
                {!item.stock && (
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
                  <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.price}>{item.price} TL</Text>
                  <Text style={styles.rate}>
                    ⭐ {item.rate ? parseFloat(item.rate).toFixed(1) : "0.0"}
                  </Text>

                  <TouchableOpacity>
                    <CartButton productId={item.id} />
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


/*
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "../../assets/styles/favorites.styles";
import { useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "../../constants/constantVariables";
import imageMap from "../../constants/imageMap";
import useUserStore from "../../store/userStore";
import useFavoriteStore from "../../store/favoriteStore";
import CartButton from "../../components/CartButton";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function Favorites() {
  const router = useRouter();
  const user = useUserStore((state) => state.userId);
  const userId = user?.id;

  const { favoritesVersion } = useFavoriteStore();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token"); 
        if (!token) {
          console.warn("Token bulunamadı.");
          return;
        }

        const res = await axios.get(`${API_URL}/favorite/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setFavorites(res.data);
      } catch (err) {
        console.error("Favoriler alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId, favoritesVersion]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView style={styles.container}>

      {favorites.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}>
          Henüz favori ürününüz yok.
        </Text>
      ) : (
        favorites.map((item) => {
          const imageFilename = item.image && item.image.length > 0 ? item.image[0] : null;
          const imageNumber = imageFilename
            ? parseInt(imageFilename.replace("product", "").replace(".png", ""))
            : null;
          const localImage = imageMap[imageNumber];

          return (
            <TouchableOpacity key={item.id} onPress={() => router.push(`/product/${item.id}`)}>
              <View style={styles.card}>
                {!item.stock && (
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
                  <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                  <Text style={styles.price}>{item.price} TL</Text>
                  <Text style={styles.rate}>
                    ⭐ {item.rate ? parseFloat(item.rate).toFixed(1) : "0.0"}
                  </Text>

                  <TouchableOpacity>
                    <CartButton productId={item.id} />
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
*/
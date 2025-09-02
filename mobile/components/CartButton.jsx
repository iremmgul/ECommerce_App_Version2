import React, { useEffect, useState } from "react";
import { TouchableOpacity, ActivityIndicator, Text, StyleSheet } from "react-native";
import axios from "axios";
import { API_URL } from "../constants/constantVariables";
import useUserStore from "../store/userStore";
import useCartStore from "../store/cartStore";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const CartButton = ({ productId, style }) => {
  const user = useUserStore((state) => state.userId);
  const userId = user?.id;

  const [inCart, setInCart] = useState(false);
  const [loading, setLoading] = useState(true);

  const { cartVersion, incrementCartVersion } = useCartStore();

  useEffect(() => {
    const fetchCartStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (!token) return;

        const res = await axios.get(`${API_URL}/cart/check`, {
          params: { userId, productId },
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setInCart(res.data.inCart);
      } catch (err) {
        console.error("Sepet kontrolü hatası:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId && productId) {
      fetchCartStatus();
    }
  }, [userId, productId, cartVersion]);

  const toggleCart = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) return;

      if (inCart) {
        await axios.delete(`${API_URL}/cart`, {
          data: { userId, productId },
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
      } else {
        await axios.post(`${API_URL}/cart`, {
          userId,
          productId,
          quantity: 1,
        }, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
      }

      setInCart(!inCart);
      incrementCartVersion();
    } catch (err) {
      console.error("Sepet işlemi hatası:", err);
    }
  };

  if (loading) {
    return <ActivityIndicator size="small" color="gray" />;
  }

  return (
    <TouchableOpacity
      onPress={toggleCart}
      style={[styles.button, inCart ? styles.inCart : styles.notInCart, style]}
    >
      <Text style={styles.buttonText}>
        {inCart ? "Remove from Cart" : "Add to Cart"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    height: 35,
    width: 145,
    alignItems: "center",
    alignSelf: "flex-end",
  },
  inCart: {
    backgroundColor: "#cccccc",
  },
  notInCart: {
    backgroundColor: "#191970",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default CartButton;




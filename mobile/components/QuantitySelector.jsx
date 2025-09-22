import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { API_URL } from "../constants/constantVariables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCartStore from "../store/cartStore";
import styles from "../assets/styles/quantitySelector.styles";

const QuantitySelector = ({ userId, productId, initialQuantity }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { incrementCartVersion } = useCartStore();

  const updateQuantity = async (newQuantity) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) return;

      if (newQuantity <= 0) {
        // Ürünü tamamen sepetten kaldır
        await axios.delete(`${API_URL}/cart`, {
          data: { userId, productId },
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuantity(0);
      } else {
        // Quantity'yi doğrudan güncelle
        await axios.put(
          `${API_URL}/cart`,
          { userId, productId, quantity: newQuantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setQuantity(newQuantity);
      }

      incrementCartVersion(); // store'u tetikle
    } catch (err) {
      console.error("Quantity update error:", err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 0}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => updateQuantity(quantity + 1)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantitySelector;



/*
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { API_URL } from "../constants/constantVariables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCartStore from "../store/cartStore";
import styles from "../assets/styles/quantitySelector.styles";

const QuantitySelector = ({ userId, productId, initialQuantity }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { incrementCartVersion } = useCartStore();

  const updateQuantity = async (newQuantity) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) return;

      if (newQuantity <= 0) {
        // ürünü sepetten çıkar
        await axios.delete(`${API_URL}/cart`, {
          data: { userId, productId },
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuantity(0);
      } else {
        // quantity artır/azalt
        
        await axios.post(
          `${API_URL}/cart`,
          { userId, productId, quantity: newQuantity - quantity }, // farkı gönderiyoruz
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setQuantity(newQuantity);
      }

      incrementCartVersion();
    } catch (err) {
      console.error("Quantity update error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => updateQuantity(quantity - 1)}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.quantityText}>{quantity}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => updateQuantity(quantity + 1)}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantitySelector;
*/
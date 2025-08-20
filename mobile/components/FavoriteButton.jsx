import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import useUserStore from "../store/userStore";
import useFavoriteStore from "../store/favoriteStore";

const FavoriteButton = ({ productId }) => {
  const user = useUserStore((state) => state.userId);
  const userId = user?.id;
  
  const { 
    isFavorite, 
    toggleFavorite
  } = useFavoriteStore();

  const isProductFavorite = isFavorite(productId);

  const handleToggleFavorite = () => {
    if (userId && productId) {
      toggleFavorite(userId, productId);
    }
  };

  return (
    <TouchableOpacity onPress={handleToggleFavorite}>
      <Icon
        name={isProductFavorite ? "heart" : "heart-o"}
        size={24}
        color={isProductFavorite ? "red" : "gray"}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;

/*
import React, { useEffect, useState } from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { API_URL } from "../constants/constantVariables";
import useUserStore from "../store/userStore";
import useFavoriteStore from "../store/favoriteStore";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const FavoriteButton = ({ productId }) => {
  const user = useUserStore((state) => state.userId);
  const userId = user?.id;
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const { incrementVersion } = useFavoriteStore();

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token"); 
        if (!token) return;

        const res = await axios.get(`${API_URL}/favorite/check`, {
          params: { userId, productId },
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setIsFavorite(res.data.isFavorite);
      } catch (err) {
        console.error("Favori kontrolü hatası:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId && productId) {
      fetchFavoriteStatus();
    }
  }, [userId, productId]);

  // .NET için kullanılması gereken toggleFavorite fonksiyonu
  const toggleFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token"); 
      if (!token) return;
  
      if (isFavorite) {
        const response = await axios.delete(`${API_URL}/favorite`, {
          data: {
            userId: parseInt(userId),  
            productId: parseInt(productId)  
          },
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        setIsFavorite(false);
        
      } else {
        // POST request
        const response = await axios.post(`${API_URL}/favorite`, {
          userId: parseInt(userId),
          productId: parseInt(productId),
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        console.log("POST response:", response.status, response.data);
        setIsFavorite(true);
      }
    } catch (error) {
      console.log('Favori işlemi hatası:', error.response?.status);
    }
  };

  /*
  // Node.js için kullanılması gereken toggleFavorite fonksiyonu
  const toggleFavorite = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token"); 
      if (!token) return;

      if (isFavorite) {
        await axios.delete(`${API_URL}/favorite`, {
          data: { userId, productId },
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
      } else {
        await axios.post(`${API_URL}/favorite`, {
          userId,
          productId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
      }

      setIsFavorite(!isFavorite);
      incrementVersion();
    } catch (err) {
      console.error("Favori işlemi hatası:", err);
    }
  };

----------------------------------------------------------------------

  if (loading) {
    return <ActivityIndicator size="small" color="gray" />;
  }

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <Icon
        name={isFavorite ? "heart" : "heart-o"}
        size={24}
        color={isFavorite ? "red" : "gray"}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;
*/


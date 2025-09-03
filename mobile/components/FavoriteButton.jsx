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
        color={isProductFavorite ? "red" : "darkblue"}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;

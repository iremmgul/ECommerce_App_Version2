import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../constants/constantVariables';

const useFavoriteStore = create((set, get) => ({
  favorites: new Set(),
  version: 0,
  
  // Favorileri yükle
loadFavorites: async (userId) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (!token) return;

    const response = await axios.get(`${API_URL}/favorite/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const favoriteIds = new Set(response.data.map(item => item.id));
    
    set({ favorites: favoriteIds });
  } catch (error) {
    console.error('Favoriler yüklenirken hata:', error);
  }
},

  // Favori durumunu kontrol et
  isFavorite: (productId) => {
    return get().favorites.has(productId);
  },

toggleFavorite: async (userId, productId) => {
  const { favorites } = get();
  const isFavorite = favorites.has(productId);
  
  try {
    const token = await AsyncStorage.getItem("access_token");
    if (!token) return;

    if (isFavorite) {
      // REMOVE FAVORITE
      await axios.delete(`${API_URL}/favorite`, {
        data: {
          userId: userId.toString(),        // String olarak gönder
          productId: productId.toString()   // String olarak gönder
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      // Store'dan çıkar
      const newFavorites = new Set(favorites);
      newFavorites.delete(productId);
      set({ favorites: newFavorites, version: get().version + 1 });
      
    } else {
      // ADD FAVORITE  
      await axios.post(`${API_URL}/favorite`, {
        userId: userId.toString(),        
        productId: productId.toString()   
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      // Store'a ekle
      const newFavorites = new Set(favorites);
      newFavorites.add(productId);
      set({ favorites: newFavorites, version: get().version + 1 });
    }
  } catch (error) {
    console.error('Favori işlemi hatası:', error.response?.status, error.response?.data);
  }
},

  incrementVersion: () => set((state) => ({ version: state.version + 1 })),
}));

export default useFavoriteStore;
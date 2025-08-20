import { Text, TextInput, TouchableOpacity, ScrollView, View, Image, } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import styles from "../../assets/styles/userProfile.styles";
import COLORS from "../../constants/colors";
import { API_URL } from "../../constants/constantVariables";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState("");

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const username = await AsyncStorage.getItem("username");
      
      if (!token || !username) return;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
     
      const userRes = await axios.get(`${API_URL}/users/users/${username}`, config);
      
      setUser(userRes.data);
    } catch (error) {
      console.error("❌ Kullanıcı verisi alınamadı:",  error);
    }
  };

  const handleChangePassword = async () => {
    try {
      
      const token = await AsyncStorage.getItem("access_token");
      const username = await AsyncStorage.getItem("username");
      if (!token || !username) return;
      
      await axios.put(
        `${API_URL}/users/users/${username}/password`,
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert("Şifre başarıyla değiştirildi!");
      setNewPassword("");
    }  catch (error) {
      console.log("Hata detayları:", error);
      console.log("Hata mesajı:", error.message);
      alert("Şifre değiştirme işlemi başarısız: " + error.message);
  }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* PROFİL KARTI */}
      <View style={styles.profileHeader}>
        <Image
          source={require("../../assets/images/person.png")}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>

      <View
        style={styles.styleOne}
      >
        <TouchableOpacity
          style={styles.styleTwo}
          onPress={() => router.push("/user/card")}
        >
          <Ionicons name="cube-outline" size={24} color={COLORS.primary} />
          <Text
            style={{
              marginTop: 8,
              color: COLORS.textPrimary,
              fontWeight: "600",
            }}
          >
            My Card
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.styleTwo}
          onPress={() => router.push("/user/favorites")}
        >
          <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
          <Text
            style={{
              marginTop: 8,
              color: COLORS.textPrimary,
              fontWeight: "600",
            }}
          >
            My Favorites
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.buttonTitle}>🔒 Change Password</Text>
      <TextInput
        placeholder="New Password"
        placeholderTextColor="#888"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity
        onPress={handleChangePassword}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>Update Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
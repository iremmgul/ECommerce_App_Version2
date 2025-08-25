import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from 'react-native'
import styles from "../../assets/styles/login.styles";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons"
import COLORS from '../../constants/colors';
import { Link } from 'expo-router';
import axios from 'axios';
import { API_URL } from "../../constants/constantVariables";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import useUserStore from "../../store/userStore";
import useFavoriteStore from "../../store/favoriteStore"; 

export default function Login() {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUserId } = useUserStore();
  const { loadFavorites } = useFavoriteStore(); 

const handleLogin = async () => {
  
  if (!username || !password) {
    alert("Please enter your username and password.");
    return;
  }
  
  setIsLoading(true);

  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password
    });

    const { token, user } = response.data;

    // User store'u güncelle
    setUserId({ id: user.id, username: user.username });

    // Token'ı kaydet
    await AsyncStorage.setItem('access_token', token);
    await AsyncStorage.setItem('username', username);

    // 🎯 Login sonrasında favorileri yükle
    try {
      await loadFavorites(user.id);
    } catch (favoriteError) {
      console.error("⚠️ Favorites loading failed:", favoriteError);
      // Favori yükleme hatası login'i engellemez
    }

    // Ana sayfaya yönlendir
    router.replace('/tabs');
    console.log("Login successful");

  } catch (error) {
    console.error("💥 Error:", error);
    console.log('STATUS:', error.response?.status);
    console.log('DATA  :', error.response?.data);

    if (error.response) {
      alert(error.response.data.message || "Login failed.");
    } else {
      alert("Something went wrong.");
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.topIllustration}>
              <Text style={styles.title}>TRENDIVA</Text>
            </View>

            <View style={styles.card}>
              <View style={styles.formContainer}>
                {/* USERNAME */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Username</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your username"
                      placeholderTextColor={COLORS.placeholderText}
                      value={username}
                      onChangeText={setUsername}
                      keyboardType="default"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* PASSWORD */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={COLORS.primary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your password"
                      placeholderTextColor={COLORS.placeholderText}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={
                          showPassword ? "eye-outline" : "eye-off-outline"
                        }
                        size={20}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Login</Text>
                  )}
                </TouchableOpacity>

                {/* FOOTER */}
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Don't have an account?</Text>
                  <Link href="/register" asChild>
                    <TouchableOpacity>
                      <Text style={styles.link}>Sign Up</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
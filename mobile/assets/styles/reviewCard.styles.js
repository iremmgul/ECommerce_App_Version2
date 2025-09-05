import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors.js";

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: COLORS.reviewColor,
    borderRadius: 10,
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#e0e0e0", // avatar yoksa gri arka plan
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1, // username uzun olursa taşmasın
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  rating: {
    flexDirection: "row",
    marginBottom: 8,
    // yıldız componenti buraya gelecek
  },
  reviewText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  reviewImagesContainer: {
    flexDirection: "row",
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
});

export default styles;

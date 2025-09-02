import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  productCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  productImage: {
    width: "100%",
    height: 450,
    resizeMode: "contain",
    borderRadius: 12,
    marginTop: 25,
    marginBottom: 16,
  },
  productName: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.darkBlue,
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.lightBlue,
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.darkBlue,
    marginBottom: 4,
  },
  installment: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginBottom: 16,
  },
  favoriteWrapper: {
    position: "absolute",
    top: 15,
    right: 12,
    zIndex: 2,
  },
  reviewTitle: {
    fontSize: 20,
    color: COLORS.darkBlue,
  },  
  
});

export default styles;

  
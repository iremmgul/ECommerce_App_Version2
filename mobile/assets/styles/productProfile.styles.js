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
    height: 280,
    resizeMode: "contain",
    borderRadius: 12,
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 12,
    color: COLORS.white,
    fontWeight: "600",
    overflow: "hidden",
  },
  productName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  installment: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  addToCartButton: {
    height: 35,
    backgroundColor: COLORS.primary,
    marginBottom: 15,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  favoriteWrapper: {
    position: "absolute",
    top: 15,
    right: 12,
    zIndex: 2,
  },  
  
});

export default styles;

  
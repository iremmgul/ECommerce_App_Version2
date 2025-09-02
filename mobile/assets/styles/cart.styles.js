import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.darkBlue,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    resizeMode: "contain",
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.darkBlue,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.lightBlue,
    marginBottom: 2,
  },
  rate: {
    fontSize: 14,
    color: COLORS.lightBlue,
    marginBottom: 8,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 4,
  },
  disabledButton: {
    backgroundColor: COLORS.border,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "600",
  },
  soldOutBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#ff4d4f",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  soldOutText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: "500",
    marginTop: 4,
  },
});

export default styles;

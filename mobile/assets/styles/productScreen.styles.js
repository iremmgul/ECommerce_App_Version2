import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../constants/colors";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2 - 24; // 2 sütun arası boşluk payı

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
    marginHorizontal: 8,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 12,
    margin: 8,
    width: cardWidth,
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    resizeMode: "contain",
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.darkBlue,
    marginBottom: 4,
    textAlign: "center",
  },
  price: {
    fontSize: 13,
    color: COLORS.lightBlue,
    textAlign: "center",
  },
  imagePlaceholder: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    textAlign: "center",
  },
});

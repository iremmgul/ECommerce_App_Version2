import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    width: 115,
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.inputBackground,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.darkBlue,
    fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.darkBlue,
  },
});

export default styles;
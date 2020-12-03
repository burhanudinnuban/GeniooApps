import { StyleSheet } from "react-native";
import colors from "../config/colors";

export const styles = StyleSheet.create({
  headerBackButton: {
    marginLeft: 24,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  line: {
    width: "75%",
    height: 1,
    backgroundColor: colors.black,
  },
  checkoutSliderContainer: {
    paddingLeft: 24,
    marginVertical: 16,
  },
  productImage: {
    marginHorizontal: 5,
    marginVertical: 7,
    width: 115,
    height: 115,
    borderRadius: 5,
  },
  deleteIconContainer: {
    flex: 1,
    borderLeftColor: colors.primary,
    borderLeftWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: 5,
  },
  swipeContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 8,
    margin: 10,
  },
  ubahContainer: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 8,
    flexDirection: "row",
    margin: 7,
  },
  productContainer: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productContainerJasa: {
    margin: 7,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    elevation: 3,
  },
  inputContainerGlobal1: {
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  productContentJasa: {
    margin: 5,
    alignItems: "flex-start",
    justifyContent: "space-around",
    flexDirection: "column",
    flex: 1,
  },
  buttonUbah: {
    margin: 5,
    alignSelf: "flex-end",
    alignContent: "flex-end",
    justifyContent: "flex-end",
  },
  productContent: {
    alignItems: "flex-start",
    justifyContent: "space-around",
    flexDirection: "column",
    flex: 1,
  },
  priceRow: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productTitle: {
    fontFamily: "Roboto",
    color: "black",
    fontSize: 13,
    marginBottom: 3,
    fontWeight: "bold"
  },
  productTitleDesc: {
    fontFamily: "Roboto",
    color: "black",
    fontSize: 12,
    marginBottom: 3,
  },
  actualPrice: {
    fontFamily: "Roboto",
    fontSize: 12,
    // color: colors.red,
    textAlign: "right"
  },
  actualPriceTotal: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: colors.primary,
    marginRight: 8,
    fontWeight: "bold"
  },
  oldPrice: {
    fontFamily: "Roboto",
    fontSize: 12,
    textDecorationLine: "line-through",
  },
  productCountButtons: {
    paddingHorizontal: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 0,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.primary,
  },
  plusButton: {
    borderRadius: 0,
    backgroundColor: "transparent",
  },
  minusButton: {
    borderRadius: 0,
    backgroundColor: "transparent",
  },
  countValueContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.primary,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
  countValueText: {
    marginVertical: 8,
    textAlign: "center",
  },
  titleButtonStyle: {
    marginLeft: 10,
    fontFamily: "Roboto",
    fontSize: 12,
    textAlign: "center",
  },
  buttonIconContainer: {
    borderLeftWidth: 1,
    borderLeftColor: colors.white,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: 25,
  },
  saveButton: {
    justifyContent: "space-around",
    borderRadius: 5,
    height: 55,
    marginTop: 0,
    backgroundColor: colors.primary,
  },
  totalButtonText: {
    color: colors.white,
    fontFamily: "Roboto",
    fontSize: 12,
    marginRight: 8,
  },
  totalButtonValue: {
    color: colors.white,
    fontFamily: "Roboto",
    fontSize: 12,
    textAlign: "center",
  },
});

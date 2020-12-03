import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerBackButton: {
    marginLeft: 24,
  },
  container: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    alignItems: "center",
    borderRadius: 20,
  },
  contentContainer: {
    backgroundColor: "#00CED1",
  },
  logo: {
    height: 147,
    width: 319,
  },
  inputContainerGlobal: {
    flexDirection: "row",
    paddingHorizontal: 0,
    alignItems: "center",
    paddingVertical: 16,
    margin: 5,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },
  inputContainerEmail: {
    flexDirection: "row",
    paddingHorizontal: 0,
    alignItems: "center",
    paddingVertical: 16,
    paddingRight: 0,
    margin: 5,
    backgroundColor: "#ffffff",
    borderRadius: 6,
  },
  inputContainerEmailStyle: {
    flex: 76,
    borderBottomWidth: 0,
    borderLeftColor: "#000000",
    borderLeftWidth: 1,
    height: 21,
    paddingLeft: 10,
    paddingRight:0 ,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  buttonUbah: {
    flexDirection: "row",
    paddingHorizontal: 0,
    alignItems: "center",
    paddingVertical: 16,
    margin: 5,
    backgroundColor: "#ffffff",
    borderRadius: 5,
  },

  containerEmail: {
    flexDirection: "row",
  },
  inputLabelStyle: {
    flex: 24,
    fontFamily: "Roboto",
    fontSize: 12,
    color: "black",
    marginLeft: 15,
  },
  inputContainerStyle: {
    flex: 76,
    borderBottomWidth: 0,
    borderLeftColor: "#000000",
    borderLeftWidth: 1,
    height: 21,
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  addressButtonContainer: {
    flex: 76,
    borderRadius: 0,
    paddingLeft: 24,
    justifyContent: "center",
  },
  inputInsideStyle: {
    fontFamily: "Roboto",
    fontSize: 12,
  },
  inputsContainer: {
    backgroundColor: "#EEF2F7",
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop: 50,
    marginBottom: 50,
    borderRadius: 20,
  },
  checkBoxContainer: {
    borderWidth: 0,
    backgroundColor: "#EEF2F7",
    padding: 0,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 0,
    marginLeft: 0,
  },
  checkBoxIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    marginLeft: 5,
    backgroundColor: "#00CED1",
    borderColor: "#000000",
  },
  saveButton: {
    justifyContent: "space-around",
    borderRadius: 0,
    height: 45,
    marginBottom: 16,
    backgroundColor: "#00CED1",
    borderRadius: 10,
  },
  titleButtonStyle: {
    fontFamily: "Roboto",
    fontSize: 18,
    flex: 1,
    textTransform: "uppercase",
  },
  saveButtonSosmed: {
    borderColor: "#00CED1",
    justifyContent: "space-around",
    borderWidth: 1,
    borderRadius: 0,
    height: 45,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  titleButtonStyleSosmed: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: "#00CED1",
    textAlign:"center",
    flex: 1,
    textTransform: "uppercase",
  },
  linkContainer: {
    flexDirection: "row",
  },
  linkText: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#00CED1",
  },
  linkTextHeader: {
    fontFamily: "Roboto",
    fontSize: 15,
    paddingRight: 10,
    color: "#00CED1",
  },
  verticalLine: {
    borderLeftWidth: 1,
    borderRightColor: "#000",
    marginHorizontal: 16,
  },
  emptyBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "white",
    marginLeft: 5,
  },
});
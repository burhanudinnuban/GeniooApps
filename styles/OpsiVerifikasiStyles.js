import { StyleSheet } from "react-native";
import colors from "../config/colors";

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
           paddingHorizontal: 30,
           borderRadius: 10,
         },
         containerText: {
           flex: 1,
           height: "100%",
           flexDirection: "column",
           justifyContent: "center",
           backgroundColor: "#fff",
           paddingHorizontal: 20,
           borderRadius: 5,
         },
         contentContainer: {
           backgroundColor: "#00CED1",
         },
         logo: {
           height: 147,
           width: 319,
         },
         inputsContainer: {
           backgroundColor: "#EEF2F7",
           paddingHorizontal: 16,
           paddingVertical: 24,
           marginTop: 50,
           marginBottom: 50,
           borderRadius: 20,
         },
         saveButton: {
           justifyContent: "space-around",
           borderRadius: 0,
           height: 45,
           marginBottom: 16,
           marginTop: 20,
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
            justifyContent: "center",
            flexDirection: 'row',
            shadowRadius: 10,
            shadowOpacity: 0.8,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowRadius: 15,
            shadowOffset: { width: 1, height: 13 },
            elevation: 5,
            height: 70,
            marginBottom: 16,
            backgroundColor: "#ffffff",
            borderRadius: 5,
          },
          titleScreenStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: "center",
            marginLeft: 0,
            marginTop: 10,
          },
          descriptionScreenStyle: {
            
            fontSize: 13,
            textAlign: "center",
            marginLeft: 0,
            marginTop: 10,
            marginBottom: 30,
          },
          titleButtonStyleSosmed: {
            fontWeight: 'bold',
            fontSize: 13,
            color: "#00CED1",
            textAlign: "justify",
            marginLeft: 0,
            marginTop: 10,
          },
          
          textButtonStyleSosmed: {
            fontSize: 13,
            textAlign: "justify",
            marginLeft: 0,
            flex: 1,
            
          },
          iconContainerStyle: {
            marginTop: 15,
            marginLeft: 20,
          },
          
});

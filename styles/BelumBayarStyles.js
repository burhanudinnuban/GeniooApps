import { StyleSheet } from "react-native";
import colors from "../config/colors";

export const styles = StyleSheet.create({
         headerBackButton: {
           marginLeft: 24,
         },
         container: {
             justifyContent: 'flex-start',
             flexDirection: 'column',
             shadowRadius: 10,
             shadowOpacity: 0.8,
             shadowColor: 'rgba(0, 0, 0, 0.1)',
             shadowRadius: 15,
             shadowOffset: { width: 1, height: 13 },
             elevation: 5,
             height: 270,
             marginBottom: 16,
             marginTop: 16,
             marginLeft: 16,
             marginRight: 16,
             backgroundColor: "#ffffff",
             borderRadius: 5,
         },
         
         containerTotal: {
           flex: 1,
           width:'100%',
           flexDirection: 'column',
           backgroundColor: "#fff",
         },
         containerImage: {
           flexDirection: "row",
           backgroundColor: "#fff",
         },
         copyButton: {
            textAlign:'right',
            flex: 1,
          },
            contentContainer: {
                paddingBottom: 100,
            },
         ButtonStyle: {
           borderRadius: 0,
           alignSelf:'center',
           height: 40,
           width:'91.5%',
           marginTop: 18,
           backgroundColor: "#00CED1",
           borderRadius: 10,
         },
         titleButtonStyle: {
           fontFamily: "WorkSans-Bold",
           fontSize: 13,
           flex: 1,
         }, 
          
          descriptionScreenStyle: {
            fontSize: 13,
            textAlign: "center",
            marginLeft: 17,
            marginTop: 20,
          },
          descriptionStyle: {
            fontSize: 13,
            textAlign: "justify",
            marginLeft: 17,
            marginTop: 10,
          },
          descriptionScreenStyleBold: {
            fontWeight: 'bold',
            fontSize: 13,
            textAlign: "justify",
            marginLeft: 17,
          },
          ImageMerchantStyle: {
            padding: 10,
            margin: 5,
            alignItems:'flex-end',
            height: 15,
            width: 50,
            marginTop: 12,
            marginLeft: 10,
          },
          kodeStyleBold: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: "justify",
            marginLeft: 17,
          },
          priceStyle: {
            fontSize: 15,
            marginLeft: 17,
            textAlign: "left",
            color: "#ff4500",
            fontFamily: 'WorkSans-Bold',
          },
          titleMerchantStyle: {
            fontFamily: 'WorkSans-Bold',
            fontSize: 15,
            textAlign: "justify",
            marginLeft: 17,
            
          },
          
          
});

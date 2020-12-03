import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity 
} from 'react-native';
import themes from '../styles/theme.style';
import { withNavigation } from 'react-navigation';

class Product extends Component {
    addToCart = () => {
        this.props.addItemsToCart(this.props.item)
        this.props.navigation.navigate('Cart')
    }
    render() {
        const { product } = this.props;
            return (
        <View style={styles.container}>
            <Image source={{ uri: product.photomainpath}} style={{width:150,height:150}}/>
            <View style={styles.productDes}>
                <Text>{product.name}</Text>
                <Text>Rp{(product.sellprice).toFixed(2)}</Text>
                <Text style={styles.oldPrice}>Rp{(product.price)}</Text>
                <Text>{product.sellername}</Text>
                <TouchableOpacity navigation={this.props.navigation} onPress={this.addToCart} style={styles.addBtn}>
                    <Text style={styles.text}>Beli</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    productDes: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    addBtn: {
        borderRadius: 30,
        margin: 10,
        backgroundColor: themes.BUTTON_COLOR
    },
    text: {
        color: '#fff',
        fontSize: 16,
        padding: 10
    },
    oldPrice: {
        fontFamily: "work-sans-bold",
        fontSize: 14,
        color: "#646464",
        textDecorationLine: "line-through",
      },
});
//export default Product;
export default withNavigation(Product);
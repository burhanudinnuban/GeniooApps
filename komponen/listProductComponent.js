/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View, Alert, Navigation } from "react-native";
import "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import * as cartActions from "../redux/actions/cartActions";
import { styles, stylesButton } from "../styles/HomeScreenStyles";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from 'react-navigation-hooks'

const listProductHome = ({ item, onPress }) => {

  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const [showHide, setShowHide] = useState(true);
  const globalState = useSelector(state => state);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  console.log(globalState);
  function decrementCounter() {
    if (count <= 1) {
      dispatch(cartActions.removeItem(item));
      setCount(1), setShowHide(true), setShow(false);
    } else {
      setCount(count - 1), removeItemFromCart(1);
    }
  }

  function incrementCounter() {
    if (count > 99) {
      alert("Jumlah tidak boleh melebihi jumlah maksimum");
    } else {
      setCount(count + 1), updateItemToCart(1);
    }
  }

  async function showHideBeli() {
    const id_user = await AsyncStorage.getItem("id_konsumen");
    if (id_user == undefined || id_user == '') {
      Alert.alert('Silahkan Login Dulu')
      navigate('Login');
    }
    else {
      setShowHide(false), setShow(true), addItemToCart(count);
    }

  }

  function addItemToCart(Qty) {
    const itemDetail = item;
    const newItemDetail = { ...itemDetail, qtyy: Qty };
    dispatch(cartActions.addToCartData(newItemDetail));
  }

  function removeItemFromCart(Count) {
    const itemDetail = item;
    const newItemDetail = { ...itemDetail, qtyy: Count };
    dispatch(cartActions.removeItem(newItemDetail));
    console.log("test hapus", newItemDetail);
  }

  function updateItemToCart(Count) {
    const itemDetail = item;
    const newItemDetail = { ...itemDetail, qtyy: Count };
    dispatch(cartActions.updateItemToCart(newItemDetail));
    console.log("test update", newItemDetail);
  }

  return (
    <TouchableOpacity style={styles.productGridItem} onPress={onPress}>
      <View style={styles.container1}>
        <Image style={styles.imageProductGridItem} source={{ uri: item.photomainpath }} />
        <View style={styles.imageProductLabel}>
          <Text style={styles.textLabel}>{item.label}</Text>
        </View>
      </View>
      <View style={stylesButton.container}>
        <View>
          <Text style={styles.priceRow}>{item.name}</Text>
        </View>
        <View>
          <Text style={styles.titleProductGridItem}>{item.descriptionshort}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.actualPrice}>Rp.{item.sellprice}</Text>
          <Text style={styles.oldPrice}>Rp.{item.price}</Text>
        </View>
        <View>
          <Text style={styles.titleProductGridItem}>Stock : {item.stock}</Text>
        </View>
        <View>
          <Text style={styles.titleProductGridItem}>{item.city}</Text>
        </View>
        {show ? (
          <View style={styles.buttonWrapper}>
            <View style={styles.buttonPlusMinus}>
              <TouchableOpacity onPress={() => decrementCounter()}>
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "#00CED1",
                    width: 30,
                    height: 30,
                    textAlign: "center",
                    borderRadius: 20,
                    elevation: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlignVertical: "center",
                      height: 30,
                    }}
                  >
                    -
                  </Text>
                </View>
              </TouchableOpacity>

              <Text>{item.qty}</Text>

              <TouchableOpacity
                // onPress={() => dispatch(increment(globalState.counter.itemsQty + 1))}
                onPress={() => incrementCounter()}
              >
                <View
                  style={{
                    alignItems: "center",
                    backgroundColor: "#00CED1",
                    width: 30,
                    height: 30,
                    textAlign: "center",
                    borderRadius: 20,
                    elevation: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlignVertical: "center",
                      height: 30,
                    }}
                  >
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {item.qty ? null : (
          <TouchableOpacity onPress={() => showHideBeli()}>
            <View
              style={{
                alignItems: "center",
                alignContent: "space-between",
                backgroundColor: "#00CED1",
                flex: 1,
                height: 30,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlignVertical: "center",
                  height: 25,
                }}
              >
                BELI
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default listProductHome;

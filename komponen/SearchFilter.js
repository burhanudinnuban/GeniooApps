/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { Input } from "react-native-elements";
import "react-native-gesture-handler";
import { styles } from "../styles/HomeScreenStyles";

const searchFilter = ({ SearchFilter }) => {
  return (
    <Input
      type="Search"
      containerStyle={styles.Cari}
      inputStyle={styles.IsiCari}
      className="Input"
      placeholder="Cari Produk atau Penjual"
      onChangeText={SearchFilter}
    />
  );
};

export default searchFilter;

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, SafeAreaView } from "react-native";

import { ThemeProvider } from "react-native-elements";
import theme from "./theme";

import Title from "./components/blocks/Title";
import List from "./containers/List";

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SafeAreaView>
          <Title fontWeight="bold">Gists</Title>
          <List />
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

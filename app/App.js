import React, { Component } from "react";
import { SafeAreaView } from "react-native";

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

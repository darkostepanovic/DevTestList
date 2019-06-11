import React, { Component } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";

import { ListItem } from "react-native-elements";

import ApiService from "../../api";
import helpers from "../../helpers";

import RowImage from "../../components/blocks/RowImage";

class List extends Component {
  state = {
    loadingList: true,
    loadingItems: false,
    list: [],
    lastPage: 1,
    currentPage: 1,
    nextPage: 2,
    showImage: false,
    clickedImage: ""
  };

  async componentDidMount() {
    const { currentPage } = this.state;
    try {
      const res = await ApiService.getGists(30, currentPage);
      const list = helpers.gistsFilter(res.data);
      const lastPage = helpers.getLastPage(res.headers.link);
      this.setState({
        list,
        lastPage,
        nextPage: currentPage + 1,
        loadingList: false
      });
    } catch (e) {
      console.log("error: ", e.response);
      this.setState({ loadingList: false });
    }
  }

  shouldLoadMore = async ({
    layoutMeasurement,
    contentOffset,
    contentSize
  }) => {
    const { currentPage, nextPage, lastPage, loadingItems } = this.state;
    if (loadingItems) {
      return;
    }
    const bottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    if (bottom && !(currentPage > lastPage)) {
      try {
        this.setState({ loadingItems: true });
        const res = await ApiService.getGists(30, nextPage);
        const newPageList = helpers.gistsFilter(res.data);
        this.setState(state => ({
          ...state,
          list: [...state.list, ...newPageList],
          currentPage: state.currentPage + 1,
          nextPage: state.nextPage + 1,
          loadingItems: false
        }));
      } catch (e) {
        this.setState({ loadingItems: false });
        console.log("error: ", e);
      }
    }
  };

  renderItems = () => {
    const { list } = this.state;
    return list.map((item, i) => (
      <ListItem
        onPress={() => {
          this.handleItemPress(item);
        }}
        key={i}
        leftAvatar={{
          placeholderStyle: { backgroundColor: "#ffffff" },
          rounded: false,
          source: { uri: item.avatar_url }
        }}
        title={item.name}
      />
    ));
  };

  renderSpinner = () => <ActivityIndicator size="large" />;

  handleItemPress = item => {
    this.setState({ showImage: true, clickedImage: item.avatar_url });
    setTimeout(() => {
      this.setState({ showImage: false, clickedImage: "" });
    }, 3500);
  };

  renderImage = () => {
    const { clickedImage, showImage } = this.state;
    return (
      <RowImage
        visible={showImage}
        uri={clickedImage}
        style={{
          width: 200,
          height: 200
        }}
      />
    );
  };

  render() {
    const { loadingList, loadingItems, showImage } = this.state;
    return (
      <View style={{ marginBottom: 40 }}>
        <ScrollView
          onScroll={async ({ nativeEvent }) => {
            await this.shouldLoadMore(nativeEvent);
          }}
          scrollEventThrottle={8}
        >
          {loadingList ? this.renderSpinner() : this.renderItems()}
          {loadingItems && this.renderSpinner()}
        </ScrollView>
        {showImage && this.renderImage()}
      </View>
    );
  }
}

export default List;

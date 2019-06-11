export default data => {
  return data.map(item => ({
    name: Object.keys(item.files)[0],
    avatar_url: item.owner.avatar_url
  }));
};

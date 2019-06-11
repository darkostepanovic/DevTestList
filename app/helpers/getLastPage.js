export default link => {
  if (link.length === 0) {
    throw new Error("input must not be of zero length");
  }

  const parts = link.split(",");
  let lastPage = 0;
  // Parse each part into a named link
  for (let i = 0; i < parts.length; i++) {
    const section = parts[i].split(";");
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }

    const url = section[0].replace(/<(.)>/, "$1").trim();
    const name = section[1].replace(/rel="(.)"/, "$1").trim();
    if (name === 'rel="last"') {
      const lastPageSplit = url.split("=")[1];
      lastPage = Number(lastPageSplit.substring(0, lastPageSplit.length - 1));
    }
  }
  return lastPage;
};

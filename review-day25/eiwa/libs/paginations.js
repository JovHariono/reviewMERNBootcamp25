const { LibURLBuilder } = require("./urls");

const LibPaginationQuery = (url, params) => {
  const myURL = new URL(url);
  for (const [key, value] of Object.entries(params)) {
    myURL.searchParams.set(key, value);
  }

  return myURL.href;
};

const LibPaginationPrevious = (page, req, url) => {
  if (page - 1 <= 0) {
    return null;
  }

  return LibPaginationQuery(url, { ...req.query, page: page - 1 });
};

const LibPaginationNext = (page, req, url, totalPage) => {
  if (page + 1 > totalPage) {
    return null;
  }

  return LibPaginationQuery(url, { ...req.query, page: page + 1 });
};

const LibPaginationDots = (c, m, req, url) => {
  let current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push(null);
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots.map((page) => {
    if (page) {
      return { page, url: LibPaginationQuery(url, { page })};
    }

    return null;
  });
};

const LibPaginationResponse = async (req, res, model) => {
  const modelSetClone = model.clone();
  const modelSetPagin = model.clone();
  let page = 1;

  if (req.query.page) {
    page = parseInt(req.query.page) || page;
  }

  const pageLimit = 10;
  const firstPage = page > 1 ? page * pageLimit - pageLimit : 0;

  const count = await modelSetClone.countDocuments();
  const totalPage = Math.ceil(count / pageLimit);
  let url = LibURLBuilder(req);
  const results = await modelSetPagin.limit(pageLimit).skip(firstPage);

  const previous = results.length
    ? LibPaginationPrevious(page, req, url)
    : null;
  const next = results.length
    ? LibPaginationNext(page, req, url, totalPage)
    : null;
  const pages = LibPaginationDots(page, totalPage, req, url);

  return res
    .status(200)
    .json({ next, previous, totalPage, count, pages, results: await results });
};

module.exports = {
  LibPaginationResponse,
};

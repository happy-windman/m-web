module.exports = {
  get({
    pageNo=0,
    pageSize=10
  }) {
    return $.ajax({
      url: `/api/position/searcher?sort=-refresh_time&offset=${pageNo}&limit=${pageSize}`
    })
  }
}
module.exports = {
  get({
    pageNo=0,
    pageSize=10
  }) {
    return $.ajax({
      url: `/api/position/searcher?sort=-refresh_time&offset=${pageNo}&limit=${pageSize}`
    })
  },
  getSearch({
    keyword,
    pageNo=0,
    pageSize=10,
  }) {
      return $.ajax({
        url: `/api/position/searcher?keywords=${keyword}&work_place=&salary=0-100000&sort=-refresh_time&offset=${pageNo}&limit=${pageSize}`
      })
    },
    getKeyword(){
      return $.ajax({
        url: `/api/position/keyword`
      })
      
    }
}
module.exports = {
    get(
        id
    ) {
      return $.ajax({
        url: `/api/position/${id}/public`
      })
    },

    getList(
      similarDataId
  ) {
    return $.ajax({
      url: `/api/position/recommend?post_type=${similarDataId}`
    })
  },


  }
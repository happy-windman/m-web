module.exports = {
    get(
        id
    ) {
      return $.ajax({
        url: `/api/position/${id}/public`
      })
    }
  }
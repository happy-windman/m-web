
module.exports = {
getCityList(){
    return $.ajax({
      url: `/api/dict/region/`
    })
  }
}
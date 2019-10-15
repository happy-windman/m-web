const layoutView = require('../views/layout.art')


class Index {

  bindClick(){
    $(this).addClass('active').siblings().removeClass('active')
    location.hash=$(this).attr('data-page')
    
  }
  render() {
    const html = layoutView({
    })
    
    $('#root').html(html)
    $('footer li').on('click',this.bindClick)
    // positionController.render()
   
  }
}
export default new Index()
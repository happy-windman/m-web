const layoutView = require('../views/layout.art')

import positionController from './positions';
import searchController from './search';
import myController from './my';

class Index {
  constructor() {
    this.render()
  }

  bindClick(){
    $(this).addClass('active').siblings().removeClass('active')
    let currentPage=$(this).attr('data-page');
    
    let pageControllers={
      positionController,
      searchController,
      myController
    }
    pageControllers[currentPage+'Controller'].render()
  }

  render() {
    const html = layoutView({
    })
    
    $('#root').html(html)
    $('footer li').on('click',this.bindClick)
    positionController.render()
  }
}

export default new Index()
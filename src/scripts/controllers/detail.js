import detailView from '../views/detail.art';
const detailModel = require ('../models/detail')

class Detail{
    async render(){
        let html=detailView({});
        $('#root').html(html);

        let hash = location.hash
        let reg=new RegExp('(\\d+)$','g')
        let id=reg.exec(hash)
        console.log(id[0])

        let result=await detailModel.get(id[0]);
        console.log(result)
    }
}
export default new Detail;
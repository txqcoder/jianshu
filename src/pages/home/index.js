import React,{ PureComponent } from 'react'
import {connect} from 'react-redux'
import {actionCreators } from './store'
// 子组件
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
// focus
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// ui
import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
  BackTop
} from './style'
class Home extends PureComponent {
  handleScrollTop(){
    window.scrollTo(0,0)
  }
  render(){
    var settings = {
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <HomeWrapper>
        <HomeLeft>
          <Slider {...settings}>
            <img className="banner-img" alt="banner" src="https://upload.jianshu.io/admin_banners/web_images/4453/459c5959bc66eecbd16d62140c5dbf361fd3fd20.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"/>
            <img className="banner-img" alt="banner" src="https://upload.jianshu.io/admin_banners/web_images/4461/e90d4b0b608e009c4aab2e9af02e30c0e30433eb.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"/>
            <img className="banner-img" alt="banner" src="https://upload.jianshu.io/admin_banners/web_images/4454/61f0009026f130d54abc9583fde6eb3b4ff61a52.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"/>
            <img className="banner-img" alt="banner" src="https://upload.jianshu.io/admin_banners/web_images/4457/496b91e42ad17897c0c0ded08385c95911870459.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"/>
          </Slider>
          <Topic/>
          <List/>
        </HomeLeft>
        <HomeRight>
          <Recommend/>
          <Writer/>
        </HomeRight>
        {
          this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null
        }

      </HomeWrapper>
    )
  }
  componentDidMount(){
    this.props.getHomeData()
    this.bindEvents()
  }
  bindEvents(){
    window.addEventListener('scroll',this.props.changeScrollTopShow) // 组件移除的时候要把绑定在window上的事件移除
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.props.changeScrollTopShow)
  }
}
const mapState =(state)=>{
  return {
    showScroll:state.getIn(["home","showScroll"])
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    getHomeData(){
      dispatch(actionCreators.getHomeInfo())
    },
    changeScrollTopShow(){
      if(document.documentElement.scrollTop > 100){
        dispatch(actionCreators.toggleTopShow(true))
      }else{
        dispatch(actionCreators.toggleTopShow(false))
      }
    }
  }
}
export default connect(mapState,mapDispatchToProps)(Home)

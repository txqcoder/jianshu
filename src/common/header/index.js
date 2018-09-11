import React,{ Component } from 'react'
import {connect} from 'react-redux'
import { CSSTransition } from 'react-transition-group';
import  * as  actionCreators  from './store/actionCreators';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper,
  SearchInfo,
  SearchTitle,
  SearchInfoSwitch,
  SearchInfoItem
} from './style'
class Header extends Component{
  getListArea(){
    const {focused, list,page,totalPage,handleMouseEnter,handleMouseLeave,mouseIn,handleChangePage} = this.props
    const newList = list.toJS() // 将immutable对象转化为js对象
    const pageList =[]
    if(newList.length){
      for(let i = (page-1) * 10 ;i< page * 10;i++){
        console.log(newList[i])
        if(!newList[i]){
          break
        }
         pageList.push(
           <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
         )
      }
    }
    if(focused || mouseIn){
      return (
        <SearchInfo
          onMouseEnter = {handleMouseEnter}
          onMouseLeave = {handleMouseLeave}
        >
         <SearchTitle>
           热门搜索
           <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage)}>
             <i ref={()=>{}} className="iconfont spin">&#xe851;</i>换一批
           </SearchInfoSwitch>
         </SearchTitle>
         <div>
           {pageList}
         </div>
        </SearchInfo>
      )
    }else {
      return null
    }
  }
  render(){
    const {focused,handInputFocus,handleInputBlur} =this.props
    return (
      <HeaderWrapper>
        <Logo/>
        <Nav>
          <NavItem className ='left active'>首页</NavItem>
          <NavItem className ='left'>下载App</NavItem>
          <NavItem className ='right'>登录</NavItem>
          <NavItem className ='right'>
            <i className="iconfont">&#xe636;</i>
          </NavItem>
          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={500}
              classNames={"slide"}
            >
              <NavSearch
                className={focused ? 'focused' : ''}
                onFocus={handInputFocus}
                onBlur={handleInputBlur}>
              </NavSearch>
            </CSSTransition>
            <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe624;</i>
            {this.getListArea()}
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className='writting'><i className="iconfont">&#xe61f;</i>写文章</Button>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }
  componentDidMount(){
  }
}


const mapStateToProps = (state)=>{
  return {
    focused:state.getIn(['header','focused']),
    list:state.getIn(['header','list']),
    page: state.getIn(['header','page']),
    mouseIn: state.getIn(['header','mouseIn']),  // 搜索提示mousein的展示与隐藏
    totalPage:state.getIn(['header','totalPage'])
  }
}
const mapDispatchToProps =(dispatch)=>{
  return {
    handInputFocus(){
      dispatch(actionCreators.getList())
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur(){
      dispatch(actionCreators.searchBlur())
    },
    handleMouseEnter(){
      dispatch(actionCreators.mouseEnter())
    },
    handleMouseLeave(){
      dispatch(actionCreators.mouseLeave())
    },
    handleChangePage(page,totalPage){
      console.log(page,totalPage)
      if(page<totalPage){
        dispatch(actionCreators.changePage(page+1))
      }else {
        dispatch(actionCreators.changePage(1))
      }
      // dispatch(actionCreators.changePage())
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header)

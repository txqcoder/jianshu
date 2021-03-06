import React,{ PureComponent } from 'react'
import {connect} from 'react-redux'
import {
  TopicWrapper,
  TopicItem
}from '../style'
class Topic extends PureComponent {
  render(){
    return (
      <TopicWrapper>
        {
          this.props.topicList.map((item)=>{
            return  (
              <TopicItem key={item.get('id')}>
                 <img className="topic-pic" alt=""
                 src={item.get('imgUrl')}
                 />
                 {item.get('title')}
              </TopicItem>
            )
          })
        }
        <a className="moreTopic" href="./">更多热门专题  ></a>
      </TopicWrapper>
    )
  }
}
const mapStateToProps =  (state)=>{
  return {
    topicList: state.getIn(['home','topicList'])
  }
}

export default connect(mapStateToProps,null)(Topic)

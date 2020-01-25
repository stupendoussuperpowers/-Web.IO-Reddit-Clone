import React, {Component} from "react";
import {VoteCounter} from "../VoteCounter";
import '../../styles/styles.css'
import ReactHtmlParser from 'react-html-parser';

class Comment extends Component{
  constructor(props){
    super(props)
    this.state = {
      body: this.props.body,
      username: this.props.username,
      hours : this.props.hours,
      subcomment : this.props.subcomment,
      votes: this.props.votes
    }
  }

  commentWithData(){
    return (
      <div className="comment">
        <div className = "ltr">

        <div className = "margin-right">
        <VoteCounter votes = {this.state.votes}/>
        </div>

        <div className = "slightmargin">
        <small>{this.state.username} {this.state.hours} hours ago </small>
        <div className = "commentbody" dangerouslySetInnerHTML={{__html: ReactHtmlParser(this.state.body)}} />
        </div>
        </div>

        <div className = "redditline">
          {this.state.subcomment? 
            <div>{
                this.state.subcomment.map(
                  function(val, ind){
                    return <Comment key = {val.data.id} votes = {val.data.score>1000? `${(val.data.score/1000).toFixed(1)}k`: val.data.score} username = {val.data.author} hours = "x" body = {val.data.body_html} 
                      subcomment = {val.data.replies?val.data.replies.data.children:[]}
                    /> 
                  }
                )
            }
            </div>: <div></div>
        }
        </div>
        </div>
    );
  }
  
  render(){
    return(
      <div>
      {
        this.state.body?
          this.commentWithData():
          <div className = "comment">   Load More Comments...</div>
      }
      </div>
    ); 
  }

}

// export const Comment = (props) => {
//   //subcomment = this.props.subcomment;
//   var body = props.body;
//   var username = props.username;
//   var hours = props.hours;
//   var subcomment = props.subcomment;
//   return (
//     <div className="comment">
//       <div className = "ltr">
//         <div>
//       <VoteCounter />
//       <div className = "line">
        
//       </div>
//       </div>
//       <div>
//       <small>{username} {hours} hours ago </small>
//       <div className = "commentbody">{body}</div>
//       </div>
//       </div>
//       <div className = "redditline">
//         {subcomment? 
//           <div>{
//               props.subcomment.map(
//                 function(val, ind){
//                   return <Comment username = {val.username} hours = {val.hours} body = {val.body} 
//                     subcomment = {val.subcomment?val.subcomment:[]}
//                   /> 
//                 }
//               )
//           }
//           </div>: <div></div>
//         }
//       </div>
//       </div>
//   );
// };

export default Comment;
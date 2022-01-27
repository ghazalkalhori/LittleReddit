import "./Post.css";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Link } from "react-router-dom";

export default function Post({
  community,
  author,
  time ,
  title ,
  body,
  commentNum,
  likeNum,
  postID,
  communityID
}) {


  var likeNumIn = likeNum;
  const LikeCount = (act) => {
    if (act === "+") likeNumIn = likeNumIn + 1;
    else likeNumIn = likeNumIn - 1;
    // send to server
  };

  return (
    <div class="post">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <ul>
        <div className="header tab">
          <p className="tab">
            <i class="fa fa-reddit-alien"> </i> <Link className="hrefs" to={"/community/"+communityID}>{" " + community}</Link> 
          </p>
          <p className="tab">Posted by: {author}</p>
          <p className="tab">{time}</p>
        </div>

        <div className="content">
          <h4 className="tab"><Link className="hrefs" to={"/post/"+postID}>{title}</Link></h4>
          <p className="tab">{body}</p>
        </div>

        <div className="footer">
          <IconButton onClick={LikeCount("+")}>
            <ThumbUpOutlinedIcon />
          </IconButton>
          <a>{likeNumIn}</a>
          <IconButton onClick={LikeCount("-")}>
            <ThumbDownOutlinedIcon />
          </IconButton>
          <a className="tab">
            <i class="fa fa-comment-o" aria-hidden="true"></i>
            {" " + commentNum}
          </a>
        </div>
      </ul>
    </div>
  );
}

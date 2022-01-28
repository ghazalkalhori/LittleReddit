import "./Post.css";
import IconButton from "@material-ui/core/IconButton";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Moment from "moment";

export default function Post({
  community,
  author,
  time,
  title,
  body,
  commentNum,
  likeNum,
  postID,
  communityID,
  isViewerAdmin = false,
}) {
  var likeNumIn = likeNum;
  const LikeCount = (act) => {
    if (act === "+") likeNumIn = likeNumIn + 1;
    else likeNumIn = likeNumIn - 1;
    // send to server
  };

  async function fetchDeletePost() {
    const token = "token " + localStorage.getItem("token");
    const info = {
      method: "DELETE",
      headers: { Authorization: token },
    };
    var path = "http://localhost:8000/post/" + postID + "/";
    const response = await fetch(path, info);
    const state = response.status;
    const data = await response.json();

    if (state === 200) {
      alert("Post deleted.");
      window.location.reload(true);
    } else {
      alert(data.message);
    }
  }

  return (
    <div class="post">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <ul>
        <div className="header tab">
          <p className="tab">
            <i class="fa fa-reddit-alien"> </i>{" "}
            <Link className="hrefs" to={"/community/" + communityID}>
              {" " + community}
            </Link>
          </p>
          <p className="tab">Posted by: {author}</p>
          <p className="tab">{Moment(time).format("LLL")}</p>
        </div>

        <div className="content">
          <h4 className="tab">
            <Link className="hrefs" to={"/post/" + postID}>
              {title}
            </Link>
          </h4>
          <p className="tab">{body}</p>
        </div>

        <div className="footer">
          <IconButton onClick={() => LikeCount("+")}>
            <ThumbUpOutlinedIcon />
          </IconButton>
          {likeNumIn}
          <IconButton onClick={() => LikeCount("-")}>
            <ThumbDownOutlinedIcon />
          </IconButton>
          <i class="fa fa-comment-o sp" aria-hidden="true">
            {" " + commentNum}
          </i>

          {isViewerAdmin ? (
            <IconButton className="trash" onClick={() => fetchDeletePost()}>
              <DeleteIcon className="trash" />
            </IconButton>
          ) : null}
        </div>
      </ul>
    </div>
  );
}

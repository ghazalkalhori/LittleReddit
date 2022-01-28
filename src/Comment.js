import IconButton from "@material-ui/core/IconButton";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import "./Post.css";
import Moment from "moment";

export default function Comment({
  author = "-",
  time = "-",
  text = "-",
  likeNum = 0,
  comID,
}) {
  return (
    <ul className="com-box">
      <div className="header-com tab">
        <p className="tab">{author}</p>
        <p className="tab">{Moment(time).format("LLL")}</p>
      </div>

      <div className="content-com">
        <p className="tab">{text}</p>
      </div>

      <div className="content-com">
        <IconButton>
          <ThumbUpOutlinedIcon />
        </IconButton>
        {likeNum}
        <IconButton>
          <ThumbDownOutlinedIcon />
        </IconButton>
      </div>
    </ul>
  );
}

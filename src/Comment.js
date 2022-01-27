import IconButton from "@material-ui/core/IconButton";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import "./Post.css";


export default function Comment({
  author = "-",
  time = "-",
  text = "-",
  likeNum = 0,
}) {
  return(
    
      <ul className="com-box">
        <div className="header-com tab">
          <p className="tab">{author}</p>
          <p className="tab">{time}</p>
        </div>

        <div className="content-com">
          <p className="tab">{text}</p>
        </div>

        <div className="content-com">
          <IconButton>
            <ThumbUpOutlinedIcon />
          </IconButton>
          <a>{likeNum}</a>
          <IconButton>
            <ThumbDownOutlinedIcon />
          </IconButton>
        </div>
      </ul>
 
  );
}

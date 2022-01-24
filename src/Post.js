import "./Post.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function Post({
  community = "army",
  author = "ghazal",
  time = "2022.01.01",
  title = "BTS",
  body = "WE ARE BULLETPROOF!",
  commentNum = 10,
  likeNum = 5,
}) {
  return (
    <div class="post">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />

      <ul>
        <div className="header">
          <a>{community}</a>
          <a>posted by: {author}</a>
          <a>{time}</a>
        </div>

        <div className="content">
          <h5>{title}</h5>
          <p>{body}</p>
        </div>

        <div className="footer">
          <a>{commentNum}</a>
          <a>{likeNum}</a>
        </div>
      </ul>
    </div>
  );
}

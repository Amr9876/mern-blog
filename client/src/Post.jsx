import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";

export default function Post({
  _id,
  title,
  summary,
  content,
  cover,
  createdAt,
  author,
}) {
  const { userInfo } = useUser();

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost:4000/${cover}`} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
          <p className="info">
            <a href="" className="author">
              {userInfo?.username === author.username ? "You" : author.username}
            </a>
            <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
          </p>
          <p className="summary">{summary}</p>
        </Link>
      </div>
    </div>
  );
}

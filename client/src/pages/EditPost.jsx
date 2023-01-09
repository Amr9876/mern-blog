import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import Editor from "../Editor";

const inputStyles = { marginTop: "1rem" };

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  const { userInfo } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      const response = await fetch(`http://localhost:4000/post/${id}`);
      const post = await response.json();

      setPostInfo(post);
      setTitle(post.title);
      setContent(post.content);
      setSummary(post.summary);
    }

    getPost();
  }, []);

  if (userInfo && postInfo && userInfo?.id !== postInfo?.author._id)
    return (
      <h2 style={{ textAlign: "center" }}>
        You're not allowed to edit this post
      </h2>
    );

  async function updatePost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) data.set("file", files?.[0]);

    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      navigate(`/post/${id}`);
    }
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder="Title"
        style={inputStyles}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        style={inputStyles}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        style={inputStyles}
        onChange={(e) => setFiles(e.target.files)}
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "1.3rem" }}>Update Post</button>
    </form>
  );
}

'use client'
import { useState } from "react";
import CommentList from "./commentList";
import axios from "axios";

export default function CreateComment({ commentList, setCommentList }) {
  const [id, setId] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/comment', { id, comment });
    const data = res.data;
    if (data.ok) {
      setCommentList(prev => [...prev, data._doc]);
      setError(false);
    } else {
      setError(true);
    }
  }
  return (
    <>
      <fieldset>
        <legend>댓글 등록</legend>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="사용자 아이디" onChange={(e) => setId(e.target.value)} required />
          </div>
          <div>
            <input type="text" placeholder="댓글" onChange={(e) => setComment(e.target.value)} required />
          </div>
          <div>
            <button>등록</button>
          </div>
          <div>
            {error ? <span style={{ color: 'tomato' }}>찾을 수 없는 아이디입니다.</span> : null}
          </div>
        </form>
      </fieldset>
      <CommentList commentList={commentList} setCommentList={setCommentList} />
    </>
  );
}
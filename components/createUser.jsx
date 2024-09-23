'use client'
import axios from "axios";
import { useState } from "react";
import UserList from "./userList";
import CreateComment from "./createComment";

export default function CreateUser({ allUsers }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [married, setMarried] = useState(false);
  const [users, setUsers] = useState(allUsers);
  const [error, setError] = useState(false);
  const [commentList, setCommentList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/user', { name, age, married });
    const data = res.data;
    if (data.ok) {
      setUsers(prev => [...prev, data._doc]);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <>
      <fieldset>
        <legend>사용자 등록</legend>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="이름" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <input type="text" placeholder="나이" onChange={(e) => setAge(e.target.value)} required />
          </div>
          <div>
            <input type="checkbox" id="checkbox" onChange={(e) => setMarried(e.target.checked)} />
            <label htmlFor="checkbox">결혼 여부</label>
          </div>
          <div>
            <button>등록</button>
          </div>
          <div>
            {error ? <span style={{ color: 'tomato' }}>중복된 이름 혹은 잘못된 나이입력.</span> : null}
          </div>
        </form>
      </fieldset>
      <UserList users={users} setUsers={setUsers} setCommentList={setCommentList} />
      <CreateComment commentList={commentList} setCommentList={setCommentList} />
    </>

  );
}
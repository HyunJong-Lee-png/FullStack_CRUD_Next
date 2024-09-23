'use client'

import axios from 'axios';
import styles from '../css/list.module.css';

export default function UserList({ users, setCommentList }) {

  const handleClick = async (userId) => {
    const res = await axios.get('/api/user/' + userId + '/comment');
    const data = res.data;
    if (data.length) {
      setCommentList(data);
    }
  }

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <td >아이디</td>
          <td >이름</td>
          <td >나이</td>
          <td >결혼여부</td>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {users.map(user =>
          <tr key={user._id} className={styles.tr}>
            <td onClick={() => handleClick(user._id)} style={{ cursor: 'pointer' }}>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>{user.married ? '기혼' : '미혼'}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
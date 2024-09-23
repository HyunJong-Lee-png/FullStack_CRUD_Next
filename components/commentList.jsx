import axios from 'axios';
import styles from '../css/list.module.css';

export default function CommentList({ commentList, setCommentList }) {

  const handleModify = async (commentId) => {
    const newComment = window.prompt('수정할 메세지를 입력하세요.');
    if (newComment) {
      const res = await axios.patch('/api/comment/' + commentId, { comment: newComment });
      const data = res.data;
      if (data.ok) {
        setCommentList(prev => prev.map(comment => comment._id === data._doc._id ? data._doc : comment));
      }
    }
  };

  const handleDelete = async (commentId) => {
    const res = await axios.delete('/api/comment/' + commentId);
    const data = res.data;
    if (data.ok) {
      setCommentList(prev => prev.filter(comment => comment._id !== commentId));
    }
  }

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <td >아이디</td>
          <td >작성자</td>
          <td >댓글</td>
          <td >수정</td>
          <td >삭제</td>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {commentList.map((comment) =>
          <tr key={comment._id} className={styles.tr}>
            <td>{comment._id}</td>
            <td>{comment.author.name}</td>
            <td>{comment.comment}</td>
            <td><button onClick={() => handleModify(comment._id)}>수정</button></td>
            <td><button onClick={() => handleDelete(comment._id)}>삭제</button></td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
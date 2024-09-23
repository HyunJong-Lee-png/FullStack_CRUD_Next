import axios from "axios";
import CreateUser from "../components/createUser";

export const metadata = {
  title: 'Home'
}

export default async function Home() {

  const res1 = await axios.get('http://localhost:3000/api/user');
  const allUsers = res1.data;

  return (
    <div>
      <CreateUser allUsers={allUsers} />
    </div>
  );
}
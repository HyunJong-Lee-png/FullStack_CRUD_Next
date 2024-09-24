import User from "./user";

export const userController = {};

userController.getAll = async () => {
  const users = await User.find({});
  return users;
}

userController.createUser = async ({ name, age, married }) => {
  try {
    const newUser = await User.create(
      {
        name,
        age,
        married,
      });
    return newUser;
  } catch (e) {
    console.log(e.message);
  }
};
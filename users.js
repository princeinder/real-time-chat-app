users = [];

const addUser = ({ id, username, room }) => {
  if (!id || !username || !room) return { error: 404 };
  name = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const existingUser = users.find(
    (user) => user.room == room && user.username == username
  );
  //   console.log();
  if (existingUser) return { error: 401 };
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id == id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);
const getCurrentDate = () => {
  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  return date + " " + time;
};

module.exports = {
  addUser,
  getUsersInRoom,
  removeUser,
  getUser,
  getCurrentDate,
};

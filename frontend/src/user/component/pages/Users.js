import React from "react";
import UsersList from "../UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Marko S",
      image:
        "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
      products: 3,
    },
  ];
  return <UsersList items={USERS} />;
};
export default Users;

import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Ankit Sharma",
      image:
        "https://res.cloudinary.com/practicaldev/image/fetch/s--b7PKk4zJ--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/212362/4960dfa6-8124-4c98-947b-b69265df3def.jpeg",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;

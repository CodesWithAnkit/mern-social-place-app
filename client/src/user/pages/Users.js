import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import loadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users",
        );

        setLoadedUsers(responseData.users);
      } catch (error) {
      }
    };
    fetchUsers();
  }, [sendRequest]);

  // const USERS = [
  //   {
  //     id: 'u1',
  //     name: 'Ankit Sharma',
  //     image:
  //       'https://res.cloudinary.com/practicaldev/image/fetch/s--b7PKk4zJ--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/212362/4960dfa6-8124-4c98-947b-b69265df3def.jpeg',
  //     places: 3,
  //   },
  // ]

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <loadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
      {" "}
    </>
  );
};

export default Users;

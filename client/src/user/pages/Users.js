import React, { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import loadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Users = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [loadedUsers, setLoadedUsers] = useState()

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:5000/api/users')
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setLoadedUsers(responseData.users)
      } catch (error) {
        setIsLoading(false)
        setError(error.message)
      }
      setIsLoading(false)
    }
    sendRequest()
  }, [])

  const errorHandler = () => {
    setError(null)
  }

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
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <loadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}{' '}
    </>
  )
}

export default Users

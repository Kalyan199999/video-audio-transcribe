import { useUser } from "../api_context/UserContext"

function UserProfile() {

    const { user,isLoggedIn } = useUser()
  return (
    <>
        <div className={`flex flex-col`}>
            {
                isLoggedIn &&
                <>
                <h1>{user.email}</h1>
                <h1>{user.email}</h1>
                <h1>{user.email}</h1>
                </>
            }
        </div>
    </>
  )
}

export default UserProfile

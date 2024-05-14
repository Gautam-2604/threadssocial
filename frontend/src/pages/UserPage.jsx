import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"


const UserPage = () => {
  return (
    <>
    <UserHeader />
    <UserPost likes={500} replies={303} postImg='/post1.png' postTitle='We are the Champions' />
    <UserPost likes={800} replies={202} postImg='/post2.png' postTitle='Hala Madrid' />
    <UserPost likes={1000} replies={101} postImg='/post3.png' postTitle='Visca el Barca' />
    <UserPost likes={2000} replies={505} postImg='/post2.png' postTitle='Cityzens' />
    </>
  )
}

export default UserPage
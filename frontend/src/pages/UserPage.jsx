import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import useShowToast from '../hooks/useShowToast.js'
import { Flex, Spinner } from "@chakra-ui/react"

const UserPage = () => {

  const [user, setUser] = useState(null)
  const {username} = useParams()
  const showToast = useShowToast()
  const [loading, setLoading]=useState(true)

  useEffect(() => {
    const getUser = async()=>{
      try {
        const res = await fetch(`api/users/profile/${username}`)
        const data = await res.json();
        
        setUser(data)
        console.log(data);
        if (data.error){
          showToast('Error',data.error,'error')
          console.log(data.error);
          return;
        };
      } catch (error) {
       showToast('Error',error,'error')
      }finally{
        setLoading(false)
      }
    };
    getUser()
  }
  , [username, showToast])
  
  if (!user && loading) {
		return (
			<Flex justifyContent={"center"}>
				<Spinner size={"xl"} />
			</Flex>
		);
	}

	if (!user && !loading) return <h1>User not found</h1>;
  return (
    <>
    <UserHeader user={user} />
    <UserPost likes={500} replies={303} postImg='/post1.png' postTitle='We are the Champions' />
    <UserPost likes={800} replies={202} postImg='/post2.png' postTitle='Hala Madrid' />
    <UserPost likes={1000} replies={101} postImg='/post3.png' postTitle='Visca el Barca' />
    <UserPost likes={2000} replies={505} postImg='/post2.png' postTitle='Cityzens' />
    </>
  )
}

export default UserPage
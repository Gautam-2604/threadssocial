import { Box, Flex, VStack, Text, Link} from "@chakra-ui/layout"
import { Button } from "@chakra-ui/react"
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Portal, useToast } from "@chakra-ui/react"
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import userAtom from '../atoms/userAtom.js'
import { useRecoilValue } from "recoil"
import { Link as RouterLink} from 'react-router-dom'
import { useState } from "react"
import useShowToast from '../hooks/useShowToast.js'



const UserHeader = ({user}) => {
    const toast = useToast()
    const currentUser = useRecoilValue(userAtom);//logged in current User
    const [following, setFollowing] = useState(user.followers.includes(currentUser?._id))
    const showToast = useShowToast()
    const [updating, setUpdating] = useState(false)
    const copyurl = ()=>{
        const currentURL = window.location.href;
        console.log(window);
        navigator.clipboard.writeText(currentURL).then(()=>{
            toast({description:'URL copied'})
        })
    }
    const handleFollow = async()=>{
        if(!currentUser){
            showToast('Error',"Please login to follow",'error')
            return;
        }
        try {
            const res = await fetch(`/api/users/follow/${user._id}`,{
                method: "POST",
                headers:{
                    "Content-type":"application/json",

                }


            })
            const data = await res.json()
            
            setFollowing(!following)
            if(following){
                showToast('Success', `Unfollowed ${user.name}`,'success')
                user.followers.pop()
            }else{
                showToast('Success', `Followed ${user.name}`,'success')
                user.followers.push(currentUser._id)
            }
            if(data.error){
                showToast('Error',data.error,'error');
                console.log(data.error)
                return;
            }
        } catch (error) {
            showToast('Error',error,'error')
        }finally{
            setUpdating(false)
        }
    }
  return (
    <VStack gap={4} alignItems={'start'}>
        <Flex justifyContent={'space-between'} w={'full'}>
            <Box>
              <Text fontSize={'2xl'} fontWeight={'bold'}>
                {user.name}
              </Text>
              <Flex gap={2} alignItems={'center'}>
                <Text fontSize={'sm'}>{user.username}</Text>
                <Text fontSize={'xs'} color={'gray.light'} bg={'gray.dark'} p={1} borderRadius={'full'}>threads.net</Text>
              </Flex>
            </Box>
            <Box>
            <Box>
					{user.profilePic && (
						<Avatar
							name={user.name}
							src={user.profilePic}
							size={{
								base: "md",
								md: "xl",
							}}
						/>
					)}
					{!user.profilePic && (
						<Avatar
							name={user.name}
							src='https://bit.ly/broken-link'
							size={{
								base: "md",
								md: "xl",
							}}
						/>
					)}
				</Box>
            </Box>
        </Flex>
        <Text>{user.bio}</Text>
        
        {currentUser?._id === user._id && (
            <Link as={RouterLink} to="/update">
             <Button size={'sm'}>Update Profile</Button>
            </Link>
        )}
        {currentUser?._id !== user._id && (
            
             <Button size={'sm'} onClick={handleFollow} isLoading={updating}>
                {following ? 'Unfollow' : 'Follow'}
             </Button>
            
        )}
       
			

        <Flex w={'full'} justifyContent={'space-between'}>
            <Flex gap={2} alignItems={'center'}>
                <Text color={'gray.light'}>{user.followers.length} Followers</Text>
                <Box w={1} h={1} bg={'gray.light'} borderRadius={'full'}></Box>
                <Link color={'gray.light'}>instagram.com</Link>
            </Flex>
            <Flex>
                <Box className="icon-container">
                    <BsInstagram size={24} cursor={'pointer'} />
                </Box>
                <Box className="icon-container">
                    <Menu>
                    <MenuButton>
                    <CgMoreO size={24} cursor={'pointer'} />
                    </MenuButton>
                    <Portal>
                        <MenuList bg={'gray.dark'}>
                            <MenuItem bg={'gray.dark'} onClick={copyurl}>Copy Link</MenuItem>
                        </MenuList>
                    </Portal>
                    </Menu>
                </Box>
            </Flex>
        </Flex>
        <Flex w={'full'}>
            <Flex flex={1} borderBottom={'1.5px solid white'} justifyContent={'center'} pb='3' cursor='pointer'>
                <Text fontWeight={'bold'}>Threads</Text>
            </Flex>
            <Flex flex={1} borderBottom={'1px solid gray'} color = 'gray.light' justifyContent={'center'} pb='3' cursor='pointer'>
                <Text fontWeight={'bold'}>Replies</Text>
            </Flex>
        </Flex>
    </VStack>
  )
}

export default UserHeader
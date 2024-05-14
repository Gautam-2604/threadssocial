import { Flex, Avatar, Text, Image, Box, Button, Divider } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../components/Actions"
import { useState } from "react"
import Comment from "../components/Comment"


const PostPage = () => {
  const [liked, setLiked] = useState(false)
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
        <Avatar src='/zuck-avatar.png' size={"md"} name='Mark Zuckerberg' />
					<Flex>
						<Text fontSize={"sm"} fontWeight={"bold"}>
							markzuckerberg
						</Text>
						<Image src='/verified.png' w='4' h={4} ml={4} />
					</Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          <Text fontSize={'sm'} color={'gray.light'}>1d</Text>
          <BsThreeDots />

        </Flex>
      </Flex>
      <Text my={3}>Lets talk</Text>
      <Box borderRadius={6} overflow={'hidden'} border='1px solid' borderColor='gray.light'>
        <Image src='/post1.png' width={'full'} />
       </Box>

       <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
       </Flex>

       <Flex alignItems={'center'} gap={2}>
        <Text color={'gray.light'} fontSize={'sm'}>{1000 + (liked ? 1 : 0)} likes</Text>
        <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
        <Text color={'gray.light'} fontSize={'sm'}>200 replies</Text>
       </Flex>

       <Divider my={4} />
        <Comment 
          comment='we win!!'
          src='https://bit.ly/dan-abramov'
          likes={100}
          createdAt='1d'
          username='danny'
        />
        <Comment 
          comment='Hala Ronaldo!!'
          src='https://bit.ly/prosper-baba'
          likes={200}
          createdAt='1d'
          username='johndoe'
        />
        <Comment 
          comment='City!!'
          src='https://bit.ly/sage-adebayo'
          likes={500}
          createdAt='1d'
          username='oollaallaa!!'
        />
       <Divider my={4} />
       

			<Flex justifyContent={"space-between"}>
				<Flex gap={2} alignItems={"center"}>
					<Text fontSize={"2xl"}>👋</Text>
					<Text color={"gray.light"}>Get the app to like, reply and post.</Text>
				</Flex>
				<Button>Get</Button>
			</Flex>
    </>
  )
}

export default PostPage

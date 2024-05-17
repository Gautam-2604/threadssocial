

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import { useState } from 'react';
import { useRef } from 'react';
import usePreviewImg from '../hooks/usePreviewImg';
  
  export default function UpdateProfilePage() {
    const [user, setUser] = useRecoilState(userAtom)
    const [inputs, setInputs] = useState({
        name:user.name,
        username:user.username,
        bio:user.bio,
        email:user.email
    })
	const fileRef = useRef(null)
	const {handleImageChange, imgUrl} = usePreviewImg 
    return (
      <Flex
        
        align={'center'}
        justify={'center'}
       >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.dark')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={imgUrl || user.profilePic} />
              </Center>
			  <Center w={'full'}>
				<Button w={'full'} onClick={()=> fileRef.current.click()}>Change Avatar</Button>
				<Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
			  </Center>
			  
              
            </Stack>
          </FormControl>
          <FormControl >
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.username}
              onChange={(e)=>setInputs({...inputs, username: e.target.value})}
            />
          </FormControl>
          <FormControl >
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.name}
              onChange={(e)=>setInputs({...inputs, name: e.target.value})}
            />
          </FormControl>
          <FormControl >
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Bio"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={inputs.bio}
              onChange={(e)=>setInputs({...inputs, bio: e.target.value})}
            />
          </FormControl>
          <FormControl >
            <FormLabel>email</FormLabel>
            <Input
              placeholder="email"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              value={inputs.email}
              onChange={(e)=>setInputs({...inputs, email: e.target.value})}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
			  type='submit'
			  >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }
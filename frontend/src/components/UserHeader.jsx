import { Box, Flex, VStack, Text, Link } from "@chakra-ui/layout"
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Portal, useToast } from "@chakra-ui/react"
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'


const UserHeader = () => {
    const toast = useToast()
    const copyurl = ()=>{
        const currentURL = window.location.href;
        console.log(window);
        navigator.clipboard.writeText(currentURL).then(()=>{
            toast({description:'URL copied'})
        })
    }
  return (
    <VStack gap={4} alignItems={'start'}>
        <Flex justifyContent={'space-between'} w={'full'}>
            <Box>
              <Text fontSize={'2xl'} fontWeight={'bold'}>
                Mark Zuckerberg
              </Text>
              <Flex gap={2} alignItems={'center'}>
                <Text fontSize={'sm'}>markzuckerberg</Text>
                <Text fontSize={'xs'} color={'gray.light'} bg={'gray.dark'} p={1} borderRadius={'full'}>threads.net</Text>
              </Flex>
            </Box>
            <Box>
             <Avatar 
                name="Mark Zuckerberg"
                src="/zuck-avatar.png"
                size={'xl'}

             />
            </Box>
        </Flex>
        <Text>Co-founder, Meta & Cambridge Analytica</Text>
        <Flex w={'full'} justifyContent={'space-between'}>
            <Flex gap={2} alignItems={'center'}>
                <Text color={'gray.light'}>3.2K Followers</Text>
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
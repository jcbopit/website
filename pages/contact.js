import { Container, Heading, Box, VStack, Button, Link } from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'

const Contact = () => {
  return (
    <>
      {/* Background image - match the index page */}
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={-1}
        bgImage="url('/images/back3.jpg')"
        bgRepeat="no-repeat"
        bgPosition="center"
        bgSize="cover"
        opacity={0.15}
        pointerEvents="none"
      />

      <Container maxW="container.md" pt={24}>
        <Heading as="h1" size="xl" mb={8} textAlign="center">
          Contact Me
        </Heading>

        <VStack spacing={4}>
          <Link href="mailto:jcoffutt@iu.edu" isExternal style={{ width: '100%' }}>
            <Button
              leftIcon={<EmailIcon />}
              width="100%"
              bg="ghibli.moss"
              color="ghibli.cream"
              _hover={{ bg: 'ghibli.fern' }}
              _active={{ bg: 'ghibli.ash' }}
            >
              jcoffutt@iu.edu
            </Button>
          </Link>

          <Link href="https://www.instagram.com/suzoomie/reels/" isExternal style={{ width: '100%' }}>
            <Button
              leftIcon={<FaInstagram />}
              width="100%"
              bg="ghibli.moss"
              color="ghibli.cream"
              _hover={{ bg: 'ghibli.fern' }}
              _active={{ bg: 'ghibli.ash' }}
            >
              Instagram
            </Button>
          </Link>

          <Link href="https://www.linkedin.com/in/justinoffutt" isExternal style={{ width: '100%' }}>
            <Button
              leftIcon={<FaLinkedin />}
              width="100%"
              bg="ghibli.moss"
              color="ghibli.cream"
              _hover={{ bg: 'ghibli.fern' }}
              _active={{ bg: 'ghibli.moss' }}
            >
              LinkedIn
            </Button>
          </Link>
        </VStack>
      </Container>
    </>
  )
}

export default Contact

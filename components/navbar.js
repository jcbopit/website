import { forwardRef } from 'react'
import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      p={2}
      bg={active ? 'grassTeal' : undefined}
      color={active ? '#202023' : inactiveColor}
      target={target}
      textDecoration="none"
      _hover={{ textDecoration: 'none', background: 'none', color: useColorModeValue('#6c7156', '#d4f2e7') }}
      _focus={{ outline: 'none', boxShadow: 'none' }}
      {...props}
    >
      {children}
    </Link>
  )
}

const MenuLink = forwardRef((props, ref) => (
  <Link
    ref={ref}
    as={NextLink}
    textDecoration="none"
    _hover={{ textDecoration: 'none', background: 'none' }}
    _focus={{ outline: 'none', boxShadow: 'none', background: 'none' }}
    {...props}
  />
))

const Navbar = props => {
  const { path } = props

  const bgLight = 'rgba(255, 255, 255, 0.5)'
  const bgDark = 'rgba(16, 15, 14, 0.5)'
  const bgColor = useColorModeValue(bgLight, bgDark)

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={bgColor}
      css={{ backdropFilter: 'blur(2px)' }}
      boxShadow="sm"
      zIndex={2}
      {...props}
    >
      <Container
  display="flex"
  p={2}
  maxW="container.md"
  align="center"
  justify="space-between"
>
        <Flex align="center" mr={100}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

            <Stack
              direction={{ base: 'column', md: 'row' }}
              display={{ base: 'none', md: 'flex' }}
              alignItems="center"
              spacing={8}
              mt={3}
            >
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/contact" path={path}>
            Contact
          </LinkItem>
        </Stack>

        <Box display={{ base: 'inline-block', md: 'none' }} ml="auto">
          <Menu isLazy id="navbar-menu">
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              aria-label="Options"
              _hover={{ background: 'none' }}
              _active={{ background: 'none' }}
              _focus={{ boxShadow: 'none', outline: 'none' }}
            />
            <MenuList
              bg={bgColor}
              border="none"
              _focus={{ boxShadow: 'none', outline: 'none' }}
            >
              <MenuItem
                as={MenuLink}
                href="/works"
                _hover={{ background: 'none' }}
                _focus={{ background: 'none', boxShadow: 'none', outline: 'none' }}
              >
                Works
              </MenuItem>
              <MenuItem
                as={MenuLink}
                href="/contact"
                _hover={{ background: 'none' }}
                _focus={{ background: 'none', boxShadow: 'none', outline: 'none' }}
              >
                Contact
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar

import { Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box mt={10} align="center" opacity={0.4} fontSize="sm">
      &copy; {new Date().getFullYear()} Justin Offutt. All Rights Reserved.
    </Box>
  )
}

export default Footer

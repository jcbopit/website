import {
  Container,
  Heading,
  Box,
  SimpleGrid,
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import workThumb1 from '../public/images/works/linkedintimeseries.png'
import workThumb2 from '../public/images/works/arxiv.png'

const Works = () => (
  <Layout title="Works">
    {/* Background image with low opacity */}
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex={-1}
      bgImage="url('/images/back4.jpg')"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="cover"
      opacity={0.15}
      pointerEvents="none"
    />

    <Container pt="100px">
      <Section delay={0.1}>
        <Heading as="h3" fontSize={24} mb={6}>
          Works
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          <GridItem
            title="My First Arxiv Paper"
            thumbnail={workThumb2}
            href="https://www.linkedin.com/feed/update/urn:li:activity:7323033455343058945/"
          >
            Automatic Bounds on Constant Term Sequences Modulo Primes. LEMMA 2025, Department of Mathematics at Indiana University.
          </GridItem>

          <GridItem
            title="Fintech Time Series Notes and Lecture"
            thumbnail={workThumb1}
            href="https://www.linkedin.com/feed/update/urn:li:activity:7320849213674635265"
          >
            Developed algorithms to identify counterexamples to a previously conjectured bound and proposed an alternate automaticity-based bound.
          </GridItem>
        </SimpleGrid>
      </Section>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'

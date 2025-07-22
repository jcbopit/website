import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'
import linkedintimeseries from '../public/images/works/linkedintimeseries.png'
import arxiv from '../public/images/works/arxiv.png'
import Image from 'next/image'

const Home = () => (
  <Layout>
    {/* Background image with low opacity */}
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      zIndex={-1}
      bgImage="url('/images/web-back.jpg')"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="cover"
      opacity={0.15}
      pointerEvents="none"
    />

    <Container pt="100px">{/* Increased top padding for header */}
      {/* Header Section */}
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title" mb={3}>
            J.C Offutt
          </Heading>

          <Box as="p" fontSize="xs">
            &quot;Metric-driven, theory-curious, and performance-obsessed. I strive to bring unique perspectives to complex problems in any team I contribute to.&quot;
          </Box>
        </Box>

        <Box flexShrink={0} mt={{ base: 4, md: 0 }} ml={{ md: 6 }} textAlign="center">
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={4}
            borderStyle="solid"
            w="145px"
            h="140px"
            display="inline-block"
            borderRadius="full"
            overflow="hidden"
          >
            <Image
              src="/images/headshotjustin.jpg"
              alt="Profile image"
              width={140}
              height={160}
              style={{
                objectFit: 'cover',
                position: 'relative',
                top: '-15px', // shift image UP inside container by 15px
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Work Section */}
      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <Paragraph>
          I&apos;m a current Junior at Indiana University pursuing dual B.S. degrees in Mathematics and Physics w/ a focus in Computational Physics and minor in Computer Science.
          I&apos;m passionate about abstract thinking and creatively applying quantitative methods and theory to solve tricky puzzles.
          Having grown up in Indonesia, Shanghai, Hong Kong, and now the U.S, I maintain a global perspective and a love for diverse culture, intellectual approach, and interdisciplinary collaboration.
        </Paragraph>
        <Box align="center" my={4}>
          <Button
            as={NextLink}
            href="/works"
            scroll={false}
            rightIcon={<ChevronRightIcon />}
            colorScheme="red"
          >
            My portfolio
          </Button>
        </Box>
      </Section>

      {/* Bio Section */}
      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          CV
        </Heading>

        <BioSection mb={4}>
          <BioYear>Education - (Exp. Grad. 2027)</BioYear>
          B.S. Math, B. S Physics, CS Minor + Computational Phys. @ Indiana University — GPA: 3.7/4.0
        </BioSection>

        <BioSection mb={4}>
          <BioYear>Dec 2024 – Present</BioYear>
          Research Assistant, Physics Dept., Indiana University — Ported legacy C++ code to be compatible with modern data formats for lorentz invariance analysis.
        </BioSection>

        <BioSection mb={4}>
          <BioYear>Jan 2025 – May</BioYear>
          Research Assistant, Mathematics Dept., Indiana University — Developed Python/SageMath algorithms to analyze constant term sequences. Algorithmically found counterexamples to open conjecture, leading to publication.
        </BioSection>

        <BioSection mb={4}>
          <BioYear>Dec 2024 – Present</BioYear>
          VP Quantitative Education, FinTech @ IU — Leading technical education; designing accessible mathematical intuition building for non-STEM members.
        </BioSection>

        <BioSection mb={4}>
          <BioYear>June 2025 – Present</BioYear>
          Sales Associate, Best Buy — Exceeded $750+/hr revenue benchmarks by matching customers with high-value tech solutions. Advocated for branded financing and membership offerings, balancing user needs with business KPIs. Learned to sell with empathy, timing, and numbers in mind.
        </BioSection>

        <BioSection>
          <BioYear>Skills</BioYear>
          Python, C++, LaTeX, Git, SageMath, Jupyter, ROOT, Linux
        </BioSection>
      </Section>

      {/* Interests Section */}
      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          Interests
        </Heading>
        <Paragraph>
          Pokémon markets:{' '}
          <Link href="https://app.getcollectr.com/showcase/profile/b3ce4d3e-9157-4961-8d2e-12bfa841572b" target="_blank" rel="noopener noreferrer">
            collection
          </Link>{' '}
          &amp;{' '}
          <Link href="https://www.ebay.com/usr/jccardscollectibles" target="_blank" rel="noopener noreferrer">
            shop
          </Link>
          , Guitar (JM Silver Sky), Fitness &amp; Personal Training (NASM CPT), Motorcycles (23&apos; ZX6R), and animated shows.
        </Paragraph>
      </Section>

      {/* Social Section */}
      <Section delay={0.3} pb={100}>
        <Box pb={10}>
          <Heading as="h3" variant="section-title">
            On the web
          </Heading>
          <List>
            <ListItem>
              <Link href="https://github.com/jcbopit" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" colorScheme="moss" leftIcon={<IoLogoGithub />}>
                  @jcbopit
                </Button>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="https://www.linkedin.com/in/justinoffutt" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" colorScheme="moss" leftIcon={<IoLogoLinkedin />}>
                  Justin Offutt
                </Button>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="https://instagram.com/suzoomie" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" colorScheme="moss" leftIcon={<IoLogoInstagram />}>
                  @suzoomie
                </Button>
              </Link>
            </ListItem>
          </List>
        </Box>

        <SimpleGrid columns={[1, 2, 2]} gap={6}>
          <GridItem
            href="https://www.linkedin.com/feed/update/urn:li:activity:7323033455343058945/"
            title="My First Arxiv Paper"
            thumbnail={arxiv}
          >
            Automatic Bounds on Constant Term Sequences Modulo Primes. LEMMA 2025, Department of Mathematics at Indiana University.
          </GridItem>

          <GridItem
            href="https://www.linkedin.com/feed/update/urn:li:activity:7320849213674635265"
            title="Fintech Time Series Notes and Lecture"
            thumbnail={linkedintimeseries}
          >
            Developed algorithms to identify counterexamples to a previously conjectured bound and proposed an alternate automaticity-based bound.
          </GridItem>
        </SimpleGrid>
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'

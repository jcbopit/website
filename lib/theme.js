import { extendTheme } from '@chakra-ui/react'

// Ghibli-inspired dark-only theme with flower pastel accents
const styles = {
  global: {
    body: {
      bg: '#1c1f1c',       // deep forest night (dark background)
      color: '#eae4d3',    // gentle cream text
    },
  },
}

const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#e0dab0', // golden mossy underline
        textDecorationThickness: 2,
        marginTop: 4,
        marginBottom: 6,
        fontWeight: 700,
        color: '#faf5d5', // gentle paper cream text
      },
    },
    baseStyle: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: '#faf5d5',
    },
  },
  Link: {
    baseStyle: {
      color: '#8cddb2',  // stronger soft green
      fontWeight: '600',
      textDecoration: 'underline',
      textUnderlineOffset: 3,
      textDecorationColor: '#5ba784',  // subtle underline green
      textDecorationThickness: 1.5,
      _hover: {
        color: '#deb0e7', // pastel purple pink on hover
        textDecorationThickness: 2,
        textDecorationColor: '#f4d9ff', // softer pastel underline on hover
      },
      _focus: {
        boxShadow: 'none',
        outline: '2px solid',
        outlineColor: '#8ff1a1',
      },
    },
  },
  Text: {
    baseStyle: {
      color: '#eae4d3',
    },
  },
  Button: {
    baseStyle: {
      _focus: { boxShadow: 'none' },
    },
    variants: {
      solid: {
        bg: '#4e695c', // twilight green
        color: '#f5f5f0',
        _hover: {
          bg: '#5b8371',
        },
      },
    },
  },
}

const fonts = {
  heading: "'M PLUS Rounded 1c', sans-serif",
  body: "'M PLUS Rounded 1c', sans-serif",
}

const colors = {
  ghibli: {
    leaf: '#a8d5ba',       // soft green leaf
    moss: '#6c7156',       // mossy brown-green
    bark: '#4e4e32',       // dark bark brown
    sky: '#cce3dc',        // pale mint blue sky
    sunset: '#f7dba7',     // warm pastel sunset yellow
    cream: '#fefae0',      // soft cream
    rose: '#e4b1ab',       // dusty rose pink
    mist: '#e8f5e9',       // pale minty mist
    night: '#1c1f1c',      // deep forest night
    moon: '#faf5d5',       // gentle moonlight cream
    spirit: '#d4f2e7',     // pale green spirit
    blossom: '#f2d5e6',    // pastel pink flower blossom
    lavender: '#cbb7dd',   // soft lavender purple
    peach: '#f7dac9',      // warm pastel peach
    skyBlush: '#e9e6f2',   // very pale lilac blush
    fern: '#8bac81',       // soft fern green
  },
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config, styles, components, fonts, colors })

export default theme

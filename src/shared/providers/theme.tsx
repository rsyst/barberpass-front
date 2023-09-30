import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac'
    },
    newBlue: {
      100: '#fbfdff',
      200: '#f5faff',
      300: '#edf6ff',
      400: '#e1f0ff',
      500: '#cee7fe',
      600: '#b7d9f8',
      700: '#96c7f2',
      800: '#5eb0ef',
      900: '#0091ff',
      1000: '#0081f1',
      1100: '#006adc',
      1200: '#00254d'
    },
    gray: {
      100: '#fcfcfc',
      200: '#f8f8f8',
      300: '#f3f3f3',
      400: '#ededed',
      500: '#e8e8e8',
      600: '#e2e2e2',
      700: '#dbdbdb',
      800: '#c7c7c7',
      900: '#8f8f8f',
      1000: '#858585',
      1100: '#6f6f6f',
      1200: '#171717'
    },
    newGreen: {
      100: '#fbfefc',
      200: '#f2fcf5',
      300: '#e9f9ee',
      400: '#ddf3e4',
      500: '#ccebd7',
      600: '#b4dfc4',
      700: '#92ceac',
      800: '#5bb98c',
      900: '#30a46c',
      1000: '#299764',
      1100: '#18794e',
      1200: '#153226'
    },
    newRed: {
      100: '#fffcfc',
      200: '#fff8f8',
      300: '#ffefef',
      400: '#ffe5e5',
      500: '#fdd8d8',
      600: '#f9c6c6',
      700: '#f3aeaf',
      800: '#eb9091',
      900: '#e5484d',
      1000: '#dc3d43',
      1100: '#cd2b31',
      1200: '#381316'
    },
    newYellow: {
      100: '#fdfdf9',
      200: '#fffce8',
      300: '#fffbd1',
      400: '#fff8bb',
      500: '#fef2a4',
      600: '#f9e68c',
      700: '#efd36c',
      800: '#ebbc00',
      900: '#f5d90a',
      1000: '#f7ce00',
      1100: '#946800',
      1200: '#35290f'
    }
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'newBlue' },
      sizes: { sm: { h: 10 }, md: { h: '54px' } },
      baseStyle: {
        textTransform: 'initial'
      }
    }
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`
  },
  breakpoints: {
    base: '0em',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1400px'
  },

  shadows: {
    green: ' 0 0 10px 0px #22c35e',
    gray: ' 0 0 10px 0px #718096'
  },
  styles: {
    global: {
      'html, body': {
        bg: 'gray.300',
        lineHeight: 'tall',
        color: 'gray.1200'
      },
      a: {
        color: 'teal.500'
      }
    }
  }
})

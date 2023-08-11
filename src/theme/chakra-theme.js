// theme/chakra-theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        brand: {
            100: '#FF00FF',
            500: '#00FF00',
            900: '#00FFFF',
        },
        // Customize other colors...
    },
    fonts: {
        heading: 'Orbitron, sans-serif',
        body: 'Roboto, sans-serif',
    },
    fontSizes: {
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
    },
    fontWeights: {
        normal: 400,
        medium: 500,
        bold: 700,
    },
    space: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
    },
    sizes: {
        button: {
            sm: '36px',
            md: '44px',
            lg: '52px',
        },
    },
    shadows: {
        // sm: '0 4px 6px rgba(255, 0, 255, 0.3)',
        // md: '0 8px 12px rgba(0, 255, 0, 0.3)',
    },
    radii: {
        sm: '8px',
        md: '12px',
    },
    breakpoints: {
        sm: '480px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
    },
    zIndices: {
        modal: 1000,
        popover: 1100,
        tooltip: 1200,
    },
    transitions: {
        base: 'all 0.3s ease-in-out',
    },
    // Customize Chakra UI component styles if needed...
});

export default theme;

import { ComponentSingleStyleConfig } from '@chakra-ui/react';

const input: ComponentSingleStyleConfig = {
  sizes: {
    lg: {
      field: {
        borderRadius: 'sm',
      },
    },
    md: {
      field: {
        borderRadius: 'sm',
      },
    },
  },
  variants: {
    presentational: {
      field: {
        bg: 'gray.50',
        border: 'gray.dark',
        color: 'gray.500',
        pointerEvents: 'none',
        borderRadius: 'sm',
      },
    },
  },
};

export default input;

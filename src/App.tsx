import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <audio controls>
            <script src=""></script>
            <source src="musics/Pandrezz-Mithril.mp3" type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)

import React from "react"

import { ThemeProvider } from "@chakra-ui/core"
import { theme } from "@chakra-ui/core"

import SectionToggle from "./SectionToggle"

export default { title: "Section Toggle" }

// If you don't want to use Chakra, simply uncomment the following story,
// and comment the one after.

// export const Basic = () => <MyComponent />;

export const Basic = () => (
    <ThemeProvider theme={theme}>
        <SectionToggle enabled={true} path="report.test">
            Test
        </SectionToggle>
    </ThemeProvider>
)

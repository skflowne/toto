import React from "react"

import { ThemeProvider, Checkbox, Input, theme } from "@chakra-ui/core"

import SectionToggle from "./SectionToggle"

export default { title: "Section Toggle" }

// If you don't want to use Chakra, simply uncomment the following story,
// and comment the one after.

// export const Basic = () => <MyComponent />;

export const Checked = () => (
    <ThemeProvider theme={theme}>
        <SectionToggle enabled={true} path="report.test">
            Test
        </SectionToggle>
    </ThemeProvider>
)

export const Unchecked = () => (
    <ThemeProvider theme={theme}>
        <SectionToggle enabled={false} path="report.test">
            Test
        </SectionToggle>
    </ThemeProvider>
)

export const Disabled = () => (
    <ThemeProvider theme={theme}>
        <SectionToggle enabled={false} disabled={true} path="report.test">
            Test
        </SectionToggle>
    </ThemeProvider>
)

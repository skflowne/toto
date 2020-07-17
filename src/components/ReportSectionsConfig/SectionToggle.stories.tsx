import React from "react"

import { ThemeProvider, theme } from "@chakra-ui/core"

import SectionToggle from "./SectionToggle"

export default { title: "Section Toggle" }

// If you don't want to use Chakra, simply uncomment the following story,
// and comment the one after.

// export const Basic = () => <MyComponent />;

const noop = () => {}

export const Checked = () => (
    <ThemeProvider theme={theme}>
        <SectionToggle enabled={true} path="report.test" onChange={noop}>
            Test
        </SectionToggle>
    </ThemeProvider>
)

export const Unchecked = () => (
    <ThemeProvider theme={theme}>
        <SectionToggle enabled={false} path="report.test" onChange={noop}>
            Test
        </SectionToggle>
    </ThemeProvider>
)

export const CustomColorUnchecked = () => {
    return (
        <ThemeProvider theme={theme}>
            <SectionToggle enabled={false} path="report.test" onChange={noop} variant="green">
                Test
            </SectionToggle>
        </ThemeProvider>
    )
}

export const CustomColorChecked = () => {
    return (
        <ThemeProvider theme={theme}>
            <SectionToggle enabled={true} path="report.test" onChange={noop} variant="green">
                Test
            </SectionToggle>
        </ThemeProvider>
    )
}

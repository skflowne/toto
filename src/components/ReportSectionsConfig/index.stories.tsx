import React from "react"

import { ThemeProvider, Button, Flex } from "@chakra-ui/core"
import { theme } from "@chakra-ui/core"

import ReportSectionsConfig from "./index"

export default { title: "Report sections config" }

// If you don't want to use Chakra, simply uncomment the following story,
// and comment the one after.

// export const Basic = () => <MyComponent />;

const baseReportConfig = {
    "enabled": true,
    "children": {
        "coverPage": { "enabled": true },
        "summary": { "enabled": true },
        "anomalyDefinitions": { "enabled": true },
        "missionReport": {
            "enabled": true,
            "children": {
                "missionDescription": { "enabled": true },
                "missionCustomerInfo": { "enabled": true },
            },
        },
    },
}

const longReportConfig = {
    "enabled": true,
    "children": {
        "coverPage": { "enabled": true },
        "summary": { "enabled": true },
        "anomalyDefinitions": { "enabled": true },
        "missionReport": {
            "enabled": true,
            "children": {
                "missionDescription": {
                    "enabled": true,
                    "children": {
                        "descriptionDetails": {
                            "enabled": true,
                            "children": {
                                "detailsMoreAndMoreAndMore": {
                                    "enabled": true,
                                    "children": {
                                        "detailsMoreAndMoreAndMore": { "enabled": true },
                                        "detailsOther": { "enabled": true },
                                    },
                                },
                                "detailsOther": { "enabled": true },
                            },
                        },
                        "descriptionOther": { "enabled": true },
                    },
                },
                "missionCustomerInfo": { "enabled": true },
            },
        },
    },
}

export const Basic = () => (
    <ThemeProvider theme={theme}>
        <ReportSectionsConfig reportConfig={baseReportConfig} />
    </ThemeProvider>
)

export const InToolbar = () => {
    return (
        <ThemeProvider theme={theme}>
            <Flex>
                <Button>Test</Button>
                <Button>Test</Button>
                <Button>Test</Button>
                <Button>Test</Button>
                <ReportSectionsConfig reportConfig={baseReportConfig} />
            </Flex>
        </ThemeProvider>
    )
}

export const MiddleInToolbar = () => {
    return (
        <ThemeProvider theme={theme}>
            <Flex>
                <Button>Test</Button>
                <Button>Test</Button>
                <ReportSectionsConfig reportConfig={baseReportConfig} />
                <Button>Test</Button>
                <Button>Test</Button>
            </Flex>
        </ThemeProvider>
    )
}

export const FirstInToolbar = () => {
    return (
        <ThemeProvider theme={theme}>
            <Flex>
                <ReportSectionsConfig reportConfig={baseReportConfig} />
                <Button>Test</Button>
                <Button>Test</Button>

                <Button>Test</Button>
                <Button>Test</Button>
            </Flex>
        </ThemeProvider>
    )
}

export const DeepConfig = () => {
    return (
        <ThemeProvider theme={theme}>
            <ReportSectionsConfig reportConfig={longReportConfig} />
        </ThemeProvider>
    )
}

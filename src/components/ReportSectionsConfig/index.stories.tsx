import React from "react"

import { ThemeProvider, Button, Flex } from "@chakra-ui/core"
import { theme } from "@chakra-ui/core"

import ReportSectionsConfig from "./index"

export default { title: "Report sections config" }

// If you don't want to use Chakra, simply uncomment the following story,
// and comment the one after.

// export const Basic = () => <MyComponent />;

export const Basic = () => (
    <ThemeProvider theme={theme}>
        <ReportSectionsConfig
            reportConfig={{
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
            }}
        />
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
                <ReportSectionsConfig
                    reportConfig={{
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
                    }}
                />
            </Flex>
        </ThemeProvider>
    )
}

import React, { useState, useRef } from "react"
import SectionConfig from "./SectionConfig"
import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/core"
import get from "lodash.get"
import set from "lodash.set"
import debounce from "lodash.debounce"

const ReportSectionsConfig = (props) => {
    const { reportConfig } = props

    const [config, setConfig] = useState(reportConfig)

    const renderReport = () => {
        console.log("render report", config)
    }

    const debouncedRender = useRef(debounce(renderReport, 1250))

    const handleChange = (path, enabled) => {
        const newSection = path ? { ...get(config, path), enabled } : { ...config, enabled }

        const newConfig = path ? { ...set(config, path, newSection) } : newSection

        setConfig(newConfig)
        debouncedRender.current()
    }

    const sectionKeyToLabel = (key) =>
        key.replace(/([A-Z])/g, " $1").replace(/^./, function (first) {
            return first.toUpperCase()
        })

    return (
        <Menu>
            <MenuButton as={Button} rightIcon="chevron-down">
                Sections
            </MenuButton>
            <MenuList p={2}>
                <SectionConfig
                    name="Report"
                    getSectionLabel={sectionKeyToLabel}
                    section={config}
                    path={null}
                    onChange={handleChange}
                />
            </MenuList>
        </Menu>
    )
}

export default ReportSectionsConfig

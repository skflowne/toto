import React, { useState, useRef } from "react"
import SectionConfig from "./SectionConfig"
import { Button, Menu, MenuButton, MenuList, theme, MenuItem } from "@chakra-ui/core"
import get from "lodash.get"
import set from "lodash.set"
import debounce from "lodash.debounce"

const ReportSectionsConfig = (props) => {
    const { reportConfig } = props

    const [config, setConfig] = useState(reportConfig)

    const debouncedRender = useRef(
        debounce((config) => {
            console.log("render report", config)
        }, 1000)
    )

    const setChildrenEnabled = (section, enabled) => {
        const children = section.children
        let newChildren = {}
        if (children) {
            newChildren = Object.keys(children).reduce((obj, key) => {
                const childSection = children[key]
                obj[key] = setChildrenEnabled(childSection, enabled)
                return obj
            }, {})
        }

        return { ...section, enabled, children: newChildren }
    }

    const handleChange = (path, enabled) => {
        let newSection = path ? { ...get(config, path), enabled } : { ...config, enabled }
        newSection = setChildrenEnabled(newSection, enabled)
        const newConfig = path ? { ...set(config, path, newSection) } : newSection

        setConfig(newConfig)
        debouncedRender.current(newConfig)
    }

    const sectionKeyToLabel = (key) =>
        key.replace(/([A-Z])/g, " $1").replace(/^./, function (first) {
            return first.toUpperCase()
        })

    return (
        <Menu closeOnSelect={false} closeOnBlur={true}>
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

import React, { useState, useRef } from "react"
import SectionConfig from "./SectionConfig"
import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/core"
import get from "lodash.get"
import set from "lodash.set"
import debounce from "lodash.debounce"
import { ReportConfig, ReportConfigChildren } from "../../types"

const ReportSectionsConfig: React.FC<{ reportConfig: ReportConfig }> = (props) => {
    const { reportConfig } = props

    const [config, setConfig] = useState(reportConfig)

    const debouncedRender = useRef(
        debounce((config: ReportConfig) => {
            console.log("render report", config)
        }, 1750)
    )

    const setChildrenEnabled = (section: ReportConfig, enabled: boolean): ReportConfig => {
        const children: ReportConfigChildren = section.children
        let newChildren: ReportConfigChildren = {}
        if (children) {
            newChildren = Object.keys(children).reduce((obj, key) => {
                const childSection: ReportConfig = children[key]
                obj[key] = setChildrenEnabled(childSection, enabled)
                return obj
            }, {})
        }

        return { ...section, enabled, children: newChildren }
    }

    const setParentsEnabled = (config: ReportConfig, path: string, enabled: boolean): ReportConfig => {
        if (!path) return config

        const parents: string[] = path.split(".children.")
        if (parents.length > 1) {
            const parentPath: string = path.replace(`.children.${parents[parents.length - 1]}`, "")
            const newParentSection: ReportConfig = { ...get(config, parentPath), enabled }

            return setParentsEnabled({ ...set(config, parentPath, newParentSection) }, parentPath, enabled)
        }

        return { ...config, enabled }
    }

    const handleChange = (path: string, enabled: boolean) => {
        let newSection: ReportConfig = path ? { ...get(config, path), enabled } : { ...config, enabled }
        newSection = setChildrenEnabled(newSection, enabled)

        let newConfig: ReportConfig = path ? { ...set(config, path, newSection) } : newSection
        if (enabled) {
            newConfig = setParentsEnabled(newConfig, path, enabled)
        }

        setConfig(newConfig)
        debouncedRender.current(newConfig)
    }

    const sectionKeyToLabel = (key: string) =>
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

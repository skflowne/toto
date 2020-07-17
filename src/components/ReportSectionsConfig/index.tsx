import React, { useState, useRef } from "react"
import get from "lodash.get"
import set from "lodash.set"
import debounce from "lodash.debounce"

import { FaBuffer, FaCheckCircle, FaWindowClose } from "react-icons/fa"

import { Button, Menu, MenuButton, MenuList, Box } from "@chakra-ui/core"

import SectionConfig from "./SectionConfig"

import { ReportConfig, ReportConfigChildren } from "../../types"

const ReportSectionsConfig: React.FC<{
    reportConfig: ReportConfig
    depthColoring?: boolean
    itemsVariant?: string
    checkboxVariant?: string
}> = (props) => {
    const { reportConfig, depthColoring, itemsVariant, checkboxVariant } = props

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
            <MenuButton as={Button} leftIcon={FaBuffer} rightIcon="chevron-down" variantColor="black" variant="outline">
                Sections{" "}
                {config.enabled ? (
                    <Box ml={2} as={FaCheckCircle} color="green.300" />
                ) : (
                    <Box ml={2} as={FaWindowClose} color="red.300" />
                )}
            </MenuButton>
            <MenuList p={4} maxH="80vh" overflowY="auto">
                <SectionConfig
                    name="Report"
                    getSectionLabel={sectionKeyToLabel}
                    section={config}
                    path={null}
                    depthColoring={depthColoring}
                    itemsVariant={itemsVariant}
                    checkboxVariant={checkboxVariant}
                    onChange={handleChange}
                />
            </MenuList>
        </Menu>
    )
}

export default ReportSectionsConfig

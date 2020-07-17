import React, { SyntheticEvent } from "react"
import SectionToggle from "./SectionToggle"
import { Stack, Flex, MenuItem, theme } from "@chakra-ui/core"
import { ReportConfig } from "../../types"

const SectionConfig: React.FC<{
    section: ReportConfig
    path: string
    name: string
    depthColoring?: boolean
    itemsVariant?: string
    checkboxVariant?: string
    onChange: (path: string, enabled: boolean) => void
    getSectionLabel: (name: string) => string
}> = (props) => {
    const { section, path, name, depthColoring, itemsVariant, checkboxVariant, onChange } = props

    let { getSectionLabel } = props
    if (!getSectionLabel) {
        getSectionLabel = (key) => key
    }

    const handleChange = (e: SyntheticEvent) => {
        onChange && onChange(path, !section.enabled)
    }

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleChange(e)
        }
    }

    const childSections: { name: string; section: ReportConfig }[] =
        section.children && Object.entries(section.children).map(([key, value]) => ({ name: key, section: value }))

    const depth: number = path ? path.split(".children.").length : 0
    const mainColorVariant: string = itemsVariant ? itemsVariant : "gray"
    const bgColorVariant: number = depthColoring ? Math.min(depth + 1, 9) * 100 : 100
    const textColorVariant: number = depthColoring ? (bgColorVariant < 500 ? 800 : 200) : 900
    const borderColorVariant: number = depthColoring ? Math.min(bgColorVariant + 100, 900) : 300

    const textColor: string = theme.colors[mainColorVariant][textColorVariant]
    const bgColor: string = theme.colors[mainColorVariant][bgColorVariant]
    const borderColor: string = theme.colors[mainColorVariant][borderColorVariant]

    return (
        <Flex flexDir="column">
            <MenuItem
                borderRadius="0.25rem"
                cursor="pointer"
                outline="none"
                border={`1px solid ${borderColor}`}
                bg={bgColor}
                color={textColor}
                _focus={
                    depthColoring
                        ? {
                              bg: textColor,
                              color: bgColor,
                          }
                        : { bg: "white", color: textColor }
                }
                p={2}
                onClick={handleChange}
                onKeyDown={handleKey}
            >
                <SectionToggle enabled={section.enabled} path={path} variant={checkboxVariant} onChange={onChange}>
                    {getSectionLabel(name)}
                </SectionToggle>
            </MenuItem>

            {childSections ? (
                <Stack pl={8} mt={0} spacing={2}>
                    {childSections.map((childSection) => {
                        const childPath: string = `${path ? path + "." : ""}children.${childSection.name}`
                        return (
                            <SectionConfig
                                key={childPath}
                                name={childSection.name}
                                section={childSection.section}
                                path={childPath}
                                depthColoring={depthColoring}
                                itemsVariant={itemsVariant}
                                checkboxVariant={checkboxVariant}
                                onChange={onChange}
                                getSectionLabel={getSectionLabel}
                            />
                        )
                    })}
                </Stack>
            ) : null}
        </Flex>
    )
}

export default SectionConfig

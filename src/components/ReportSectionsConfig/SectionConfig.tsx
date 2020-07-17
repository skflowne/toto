import React from "react"
import SectionToggle from "./SectionToggle"
import { Stack, Flex, MenuItem } from "@chakra-ui/core"

const SectionConfig = (props) => {
    const { section, path, name, onChange } = props
    let { getSectionLabel } = props
    if (!getSectionLabel) {
        getSectionLabel = (key) => key
    }

    const handleChange = (e) => {
        onChange && onChange(path, !section.enabled)
    }

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleChange(e)
        }
    }

    const childSections =
        section.children && Object.entries(section.children).map(([key, value]) => ({ name: key, section: value }))

    return (
        <Flex flexDir="column">
            <MenuItem onClick={handleChange} onKeyDown={handleKey}>
                <SectionToggle enabled={section.enabled} path={path} onChange={onChange}>
                    {getSectionLabel(name)}
                </SectionToggle>
            </MenuItem>

            {childSections ? (
                <Stack pl={8} mt={0} spacing={2}>
                    {childSections.map((childSection) => {
                        const childPath = `${path ? path + "." : ""}children.${childSection.name}`
                        return (
                            <SectionConfig
                                key={childPath}
                                name={childSection.name}
                                getSectionLabel={getSectionLabel}
                                section={childSection.section}
                                path={childPath}
                                onChange={onChange}
                            />
                        )
                    })}
                </Stack>
            ) : null}
        </Flex>
    )
}

export default SectionConfig

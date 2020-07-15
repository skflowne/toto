import React from "react"
import SectionToggle from "./SectionToggle"
import { Stack, Flex } from "@chakra-ui/core"

const SectionConfig = (props) => {
    const { section, path, name, onChange } = props
    let { getSectionLabel } = props
    if (!getSectionLabel) {
        getSectionLabel = (key) => key
    }

    const childSections =
        section.children && Object.entries(section.children).map(([key, value]) => ({ name: key, section: value }))

    return (
        <Flex flexDir="column">
            <SectionToggle enabled={section.enabled} path={path} onChange={onChange}>
                {getSectionLabel(name)}
            </SectionToggle>

            {childSections ? (
                <Stack pl={6} mt={1} spacing={1}>
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

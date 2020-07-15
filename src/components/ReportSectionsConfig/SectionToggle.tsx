import React from "react"
import { Checkbox } from "@chakra-ui/core"

const SectionToggle = (props) => {
    const { enabled, path, onChange, children } = props

    const handleChange = (e) => {
        onChange && onChange(path, !enabled)
    }

    return (
        <Checkbox isChecked={enabled} onChange={handleChange}>
            {children}
        </Checkbox>
    )
}

export default SectionToggle

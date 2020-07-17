import React from "react"
import { Checkbox, theme, MenuItemOption, MenuItem } from "@chakra-ui/core"
import styled from "@emotion/styled"

const StyledCheckbox = styled(Checkbox)`
    & > div[aria-hidden="true"] {
        color: ${theme.colors.gray[300]};
    }
`

const SectionToggle = (props) => {
    const { enabled, disabled, children, path, onChange } = props

    const handleChange = (e) => {
        e.stopPropagation()
        onChange && onChange(path, !enabled)
    }

    const stopClickPropagation = (e) => {
        e.stopPropagation()
    }

    return (
        <StyledCheckbox
            className="custom-checkbox"
            fontFamily={theme.fonts.body}
            isChecked={enabled}
            isDisabled={disabled}
            onClick={stopClickPropagation}
            onChange={handleChange}
        >
            {children}
        </StyledCheckbox>
    )
}

export default SectionToggle

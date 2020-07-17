import React from "react"
import { Checkbox, theme } from "@chakra-ui/core"
import styled from "@emotion/styled"

const StyledCheckbox = styled(Checkbox)`
    & > div[aria-hidden="true"] {
        color: ${(props) => theme.colors[props.variantColor][800]};
    }
`

const SectionToggle: React.FC<{
    enabled: boolean
    path: string
    variant?: string
    onChange: (path: string, enabled: boolean) => void
}> = (props) => {
    const { enabled, path, variant, onChange, children } = props

    const handleChange = (e: React.ChangeEvent) => {
        e.stopPropagation()
        onChange && onChange(path, !enabled)
    }

    const stopClickPropagation = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <StyledCheckbox
            className="custom-checkbox"
            fontFamily={theme.fonts.body}
            isChecked={enabled}
            onClick={stopClickPropagation}
            onChange={handleChange}
            variantColor={variant || "blue"}
        >
            {children}
        </StyledCheckbox>
    )
}

export default SectionToggle

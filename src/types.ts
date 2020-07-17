export interface ReportConfig {
    enabled: boolean
    children?: ReportConfigChildren
}

export interface ReportConfigChildren {
    [key: string]: ReportConfig
}

import {createTheme} from "@mui/material/styles"

export const Theme = createTheme(
    {
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none"
                    }
                }
            },
            MuiTab: {
                styleOverrides: {
                    root: {
                        textTransform: "none"
                    }
                }
            }
        },
        palette: {
            background: {
                default: "#fafafa",
                paper: "#ffffff"
            }
        },
        typography: {
            fontSize: 12
        },
        spacing: 4,
        shape: {
            borderRadius: 2
        }
    }
)

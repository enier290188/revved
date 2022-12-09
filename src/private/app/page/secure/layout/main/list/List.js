import {List as MuiList} from "@mui/material"
import React from "react"

export const List = React.memo(
    ({level, subheader, children}) => {
        let paddingTop = 0
        let paddingBottom = 0
        switch (level) {
            case 1:
                paddingTop = 2
                paddingBottom = 2
                break
            default:
                break
        }
        const SxList = {
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(paddingTop, 0, paddingBottom, 0)
        }

        return (
            <MuiList component={"div"} subheader={subheader} sx={SxList}>
                {children}
            </MuiList>
        )
    }
)

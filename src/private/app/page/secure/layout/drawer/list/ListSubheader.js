import {ListSubheader as MuiListSubheader, Typography as MuiTypography} from "@mui/material"
import React from "react"

export const ListSubheader = React.memo(
    ({level, text}) => {
        let paddingLeft = 4
        switch (level) {
            case 1:
                paddingLeft *= 1
                break
            case 2:
                paddingLeft *= 2
                break
            case 3:
                paddingLeft *= 3
                break
            default:
                break
        }
        const SxListSubheader = {
            position: "static",
            margin: theme => theme.spacing(0),
            padding: theme => theme.spacing(0, 4, 2, paddingLeft),
            color: theme => theme.palette.grey[900]
        }

        return (
            <MuiListSubheader component={"div"} sx={SxListSubheader}>
                <MuiTypography component={"p"} variant={"body1"} noWrap={true}>
                    {text}
                </MuiTypography>
            </MuiListSubheader>
        )
    }
)

import * as React from "react"
import Box from "@mui/material/Box"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import AddIcon from "@mui/icons-material/Add"

const actions = [{ icon: <AddIcon />, name: "메뉴 추가" }]

export default function BasicSpeedDial() {
  return (
    <Box
      sx={{
        height: "auto",
        transform: "translateZ(0px)",
        position: "fixed",
        bottom: 10,
        right: 10,
      }}
    >
      <SpeedDial ariaLabel="SpeedDial basic example" icon={<SpeedDialIcon />}>
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
        ))}
      </SpeedDial>
    </Box>
  )
}

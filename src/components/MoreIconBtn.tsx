// MoreIconButton.js
import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import MoreIcon from "@mui/icons-material/MoreVert"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

const MoreIconBtn = ({ onDelete, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false)

  const handleMoreIconClick = (e) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete()
    setShowMenu(false) // Close menu after clicking delete
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit()
    setShowMenu(false) // Close menu after clicking edit
  }

  return (
    <div style={{ position: "relative" }}>
      <IconButton size="small" aria-label="display more actions" color="inherit" onClick={handleMoreIconClick}>
        <MoreIcon />
      </IconButton>
      {showMenu && (
        <div style={{ position: "absolute", top: "100%", right: 0, zIndex: 1 }}>
          <IconButton size="small" aria-label="delete" color="inherit" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton size="small" aria-label="edit" color="inherit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default MoreIconBtn

// EditModal.js
import React, { useState } from "react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const EditModal = ({ open, close, isEditMode }) => {
  const [textFieldValue, setTextFieldValue] = useState("")

  const handleSubmit = () => {
    console.log(`${isEditMode ? "상품 변경" : "상품 생성"} - 텍스트 필드 값:`, textFieldValue)
    setTextFieldValue("") // 제출 후 텍스트 필드 초기화
    close()
  }

  return (
    <Modal open={open} onClose={close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#FFF",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isEditMode ? "상품 변경" : "상품 생성"}
        </Typography>
        <TextField
          label="텍스트 필드"
          variant="outlined"
          margin="normal"
          fullWidth
          value={textFieldValue}
          onChange={(e) => setTextFieldValue(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={close}>
            취소
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {isEditMode ? "변경" : "생성"}
          </Button>
        </div>
      </Box>
    </Modal>
  )
}

export default EditModal

import React, { useEffect } from "react"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import useInput from "../../../hooks/useInput"
import { StoreAuthT, UserAuthT } from "../../../model/userAuth"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "../../../store/slices/userInfo"

export default function StoreAuth() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    dispatch(setUserInfo({ ...userInfo, [name]: value }))
  }

  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userInfo)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        가게 정보 인증
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="storeName"
            name="storeName"
            value={userInfo.storeName}
            label="가게명"
            fullWidth
            variant="standard"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="ownerName"
            label="사업주명"
            name="ownerName"
            value={userInfo.ownerName}
            fullWidth
            variant="standard"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="call"
            name="call"
            label="휴대폰번호"
            value={userInfo.call}
            fullWidth
            variant="standard"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            label="가게주소"
            name="address"
            value={userInfo.address}
            fullWidth
            variant="standard"
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="crn"
            label="사업자등록번호"
            name="crn"
            value={userInfo.crn}
            fullWidth
            variant="standard"
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

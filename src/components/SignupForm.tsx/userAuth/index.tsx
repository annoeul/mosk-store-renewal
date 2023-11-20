import * as React from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"

export default function UserAuth() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        유저 정보 인증
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9.5}>
          <TextField
            required
            id="email"
            name="email"
            label="email"
            fullWidth
            variant="standard"
            placeholder="이메일 형식으로 작성해주세요."
          />
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <Button variant="outlined">중복확인</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField required id="password" name="password" label="password" fullWidth variant="standard" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="passwordCheck"
            name="passwordCheck"
            label="passwordCheck"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

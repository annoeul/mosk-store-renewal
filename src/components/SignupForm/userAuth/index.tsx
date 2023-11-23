import React, { useEffect, useState } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { Button } from "@mui/material"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import { Visibility } from "@mui/icons-material"
import { VisibilityOff } from "@mui/icons-material"
import useInput from "../../../hooks/useInput"
import signApi from "../../../apis/signApi"
import CheckIcon from "@mui/icons-material/Check"
import ClearIcon from "@mui/icons-material/Clear"
import { UserAuthT } from "../../../model/userAuth"
import { useDispatch, useSelector } from "react-redux"
import { setUserInfo } from "../../../store/slices/userInfo"

type EmailCheckResponse = {
  code: number
  status: string
  message: string
  data?: any
}

type UserAuthProps = {
  onUserAuthComplete: () => void
}

function UserAuth({ onUserAuthComplete }: UserAuthProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true)

  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userInfo)

  const [checkPassword, setCheckPassword] = useState<string>("")
  const { userInput, onChange } = useInput<UserAuthT>({
    email: "",
    password: "",
  })

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleEmailCheck = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    try {
      if (!emailRegex.test(userInput.email)) {
        alert("올바른 이메일 형식이 아닙니다.")
        return
      }
      const response: EmailCheckResponse = await signApi.get(`/public/stores/email-check/${userInput.email}`)
      if (response.status === 200) {
        const userResponse = window.confirm("이메일이 사용 가능합니다. 사용하시겠습니까?")
        if (userResponse) {
          dispatch(setUserInfo({ ...userInfo, email: userInput.email }))
          console.log(userInfo)
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("중복된 이메일입니다.")
        return
      }
      console.error(error.response ? error.response.status : error.message)
    }
  }

  const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value) {
      dispatch(setUserInfo({ ...userInfo, password: value }))
    }

    const isMatch = value === userInput.password
    setPasswordMatch(isMatch)
  }

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
            value={userInput.email}
            onChange={onChange}
            fullWidth
            variant="standard"
            placeholder="이메일 형식으로 작성해주세요."
          />
        </Grid>
        <Grid item xs={12} sm={2.5}>
          <Button variant="outlined" onClick={handleEmailCheck}>
            중복확인
          </Button>
        </Grid>

        {/* Password Input */}
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            label="password"
            value={userInput.password}
            onChange={onChange}
            fullWidth
            variant="standard"
            placeholder="특수문자 포함 8자 ~ 15자 입력해주세요."
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Password Check Input */}
        <Grid item xs={12}>
          <TextField
            required
            id="passwordCheck"
            name="passwordCheck"
            label="passwordCheck"
            value={checkPassword}
            onChange={(e) => {
              setCheckPassword(e.target.value)
              handlePasswordCheckChange(e)
            }}
            fullWidth
            variant="standard"
            placeholder="위와 동일한 비밀번호를 입력해주세요."
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {checkPassword.length > 0 && !passwordMatch ? (
                    <ClearIcon style={{ color: "red" }} />
                  ) : (
                    checkPassword.length > 0 && <CheckIcon style={{ color: "green" }} />
                  )}
                </InputAdornment>
              ),
            }}
            error={!passwordMatch}
            helperText={!passwordMatch ? "비밀번호가 일치하지 않습니다." : ""}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default UserAuth

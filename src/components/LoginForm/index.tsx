import React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { Link, useNavigate } from "react-router-dom"
import useInput from "../../hooks/useInput"
import { useCookies } from "react-cookie"
import signApi from "../../apis/signApi"
import axios from "axios"

export default function LoginForm() {
  const { userInput, onChange } = useInput({
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(["accessToken"])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const loginPromise = signApi.post("/public/auth", {
        email: userInput.email,
        password: userInput.password,
      })

      const loginResponse = await loginPromise

      if (loginResponse.status === 201) {
        const accessToken = loginResponse.data?.data?.accessToken
        setCookie("accessToken", accessToken, { path: "/" })

        const storePromise = signApi.get(`/stores`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const storeResponse = await storePromise
        const storeId = storeResponse.data?.data?.id

        if (storeId) {
          navigate("/dashHome", { state: { storeId } })
        } else {
          console.error("상점 정보를 가져오는 데 실패했습니다.")
        }
      } else if (loginResponse.status === 400) {
        alert("로그인 실패: 잘못된 요청입니다.")
      }
    } catch (error) {
      console.error("로그인 실패:", error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            onChange={onChange}
            required
            fullWidth
            label="Email Address"
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            onChange={onChange}
            fullWidth
            name="password"
            label="Password"
            type="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

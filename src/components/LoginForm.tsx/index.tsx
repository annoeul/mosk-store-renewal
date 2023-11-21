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
      const response = await signApi.post("/public/auth", {
        email: userInput.email,
        password: userInput.password,
      })

      if (response.status === 201) {
        const accessToken = response.data?.data?.accessToken
        setCookie("accessToken", accessToken, { path: "/" })
        navigate("/dashHome")
      } else if (response.status === 400) {
        alert("ss")
      }
    } catch (error) {
      console.error("Login failed:", error)
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
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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

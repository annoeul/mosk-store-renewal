import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import UserAuth from "./userAuth"
import StoreAuth from "./storeAuth"
import { useDispatch, useSelector } from "react-redux"
import signApi from "../../apis/signApi"
import { useNavigate } from "react-router-dom"

const steps = ["UserAuth", "StoreAuth", "Success"]

export default function SignupForm() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [userAuthCompleted, setUserAuthCompleted] = React.useState(false)
  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.userInfo)

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!userInfo.email) {
        alert("이메일을 확인해주세요")
        return
      } else if (!userInfo.password) {
        alert("비밀번호를 확인해주세요")
        return
      }
    }
    if (activeStep === 1) {
      if (!userInfo.storeName) {
        alert("상호명을 확인해주세요.")
        return
      } else if (!userInfo.ownerName) {
        alert("사업주명을 확인해주세요.")
        return
      } else if (!userInfo.call) {
        alert("휴대폰 번호를 확인해주세요.")
        return
      } else if (!userInfo.address) {
        alert("주소를 확인해주세요.")
        return
      } else if (!userInfo.crn) {
        alert("사업자등록번호를 확인해주세요.")
        return
      }
      try {
        const response = await signApi.post("/public/stores", {
          email: userInfo.email,
          password: userInfo.password,
          storeName: userInfo.storeName,
          ownerName: userInfo.ownerName,
          call: userInfo.call,
          address: userInfo.address,
          crn: userInfo.crn,
        })
        if (response.status === 201) {
          alert("회원가입에 성공하셨습니다!. 로그인 후 이용해주세요.")
          navigate("/") // 로그인 후 '/'로 이동
        } else if (response.status === 400) {
          return
        }
      } catch (error) {
        console.error("회원가입에 실패했습니다.", error.message)
      }
    }

    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleUserAuthComplete = () => {
    setUserAuthCompleted(true)
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            회원가입
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, { onUserAuthComplete: handleUserAuthComplete })}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                  {activeStep === 0 ? "Next" : activeStep === 1 ? "회원가입" : "로그인"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  )
}

function getStepContent(step: number, { onUserAuthComplete }: { onUserAuthComplete: () => void }) {
  switch (step) {
    case 0:
      return <UserAuth onUserAuthComplete={onUserAuthComplete} />
    case 1:
      return <StoreAuth />
    case 2:
      return <></>
    default:
      throw new Error("Unknown step")
  }
}

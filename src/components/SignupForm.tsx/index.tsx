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

const steps = ["UserAuth", "StoreAuth", "Success"]

export default function SignupForm() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [userAuthCompleted, setUserAuthCompleted] = React.useState(false)
  const [isEmailAvailable, setIsEmailAvailable] = React.useState<boolean | null>(null)
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userInfo)

  const handleNext = () => {
    // if (activeStep === 0 && (!userAuthCompleted || !isEmailAvailable)) {
    //   // Don't proceed to the next step if UserAuth is not completed or email is not available
    //   return
    // }

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
            <React.Fragment>{/* ... (same as your existing code) */}</React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, { onUserAuthComplete: handleUserAuthComplete })}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                  // disabled={activeStep === 0 && !userAuthCompleted}
                >
                  {/* {activeStep === steps.length - 1 ? "Place order" : "Next"} */}
                  Next
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
      return <>성공</>
    default:
      throw new Error("Unknown step")
  }
}

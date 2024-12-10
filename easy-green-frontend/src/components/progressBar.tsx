import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepLabel } from '@mui/material';

interface ProgressBarProps {
  steps: string[]; // Array of step labels
  activeStep?: number; // Optional active step controlled by parent
  onStepChange?: (step: number) => void; // Callback for when step changes
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, activeStep = 0, }) => {

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default ProgressBar;
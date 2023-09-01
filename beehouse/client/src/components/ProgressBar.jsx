import axios from "axios";
import React, { useState } from "react";

const ProgressBar = ({ id, status, setUpdatedStep, setButtonAvailability }) => {
  const steps = ["Pending", "Audition", "Approved", "Paid"];
  const [selectedStep, setSelectedStep] = useState(status);

  console.log(id);

  const handleStepChange = async (e) => {
    const newSelectedStep = e.target.value;
    // setSelectedStep(newSelectedStep);
    setSelectedStep(async (prevSelectedStep) => {
      if (prevSelectedStep !== newSelectedStep) {
        const data = {
          status: newSelectedStep,
        };

        try {
          const response = await axios.put(
            `http://localhost:4000/jobs/${id}/status`,
            data
          );

          if (response.status === 200) {
            setSelectedStep(response.data.data.status);

            if (response.data.data.status === "Approved") {
              setUpdatedStep(response.data.data.status);
              setButtonAvailability(id, true);
            } else {
              setButtonAvailability(id, false);
            }
          }

          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
      return newSelectedStep; // Update the state with the new value
    });
  };

  //   const canProgress = steps.indexOf(selectedStep) > 0;

  return (
    <div className="">
      <div className="mt-2 flex  justify-between  ">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex  items-center text-sm mx-1 space-x-2 ${
              index <= steps.indexOf(selectedStep)
                ? "text-green-500"
                : "text-gray-300"
            }`}
          >
            {index <= steps.indexOf(selectedStep) && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L9 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center my-1">
        <select
          value={selectedStep}
          onChange={handleStepChange}
          className="py-1 mt-1 bg-gray-200 text-gray-700 border border-black rounded focus:outline-none focus:border-blue-500"
        >
          {steps.map((step, index) => (
            <option
              key={step}
              value={step}
              disabled={
                index !== steps.indexOf(selectedStep) + 1 ||
                (selectedStep === "Pending" &&
                  (step === "Approved" || step === "Paid"))
              }
            >
              {step}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProgressBar;

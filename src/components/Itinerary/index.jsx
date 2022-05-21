import { useState, useEffect, useRef } from "react";
import Map from "../Map";
import { useParams } from "react-router-dom";
import "./styles.scss";
import getItineraryById from "../../helpers/getItineraryById";
import getItineraryPlaces from "../../helpers/getItineraryPlaces";
import WarningIcon from "@mui/icons-material/Warning";
import getPlaceById from "../../helpers/getPlaceById";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Brightness1OutlinedIcon from "@mui/icons-material/Brightness1Outlined";

export default function Itinerary() {
  const { id } = useParams();
  const [itineratyData, setItineratyData] = useState(null);
  const [itineratyPlaceData, setItineratyPlaceData] = useState(null);
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const clickPlace = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const getData = async () => {
    await getDataItinerary();
    await getDataItineraryPlace();
    setIsLoading(false);
  };
  const getDataItinerary = async () => {
    const data = await getItineraryById(id);
    console.log({ data })
    setItineratyData(data);
  };
  const getDataItineraryPlace = async () => {
    const data = await getItineraryPlaces(id);
    //format coords
    let tempArr = [];
    for (const element of data) {
      const dataPlace = await getPlaceById(element.id_place);
      console.log('aaaaaaa', element)
      const arrNumbers = dataPlace.location.split(",");
      tempArr.push({
        ...dataPlace,
        coordinates: [
          parseFloat(parseFloat(arrNumbers[0]).toFixed(2)),
          parseFloat(parseFloat(arrNumbers[1]).toFixed(2)),
        ],
      });
    }
    setItineratyPlaceData(data);
    setPlaces(tempArr);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleClickStepper = (i) => {
    setActiveStep(i);
    clickPlace.current(i);
  };

  if (!isLoading)
    return (
      <div className="itinerary-container">
        <div className="itinerary-header">{itineratyData.name}</div>
        <div className="itinerary-description">{itineratyData.description}</div>
        <div className="itinerary-map">
          <div className="itinerary-place-list">
            <Stepper activeStep={activeStep} orientation="vertical">
              {places.map((step, i) => (
                <Step key={step.name}>
                  <StepLabel
                    onClick={() => {
                      handleClickStepper(i);
                    }}
                  >
                    {step.name}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <div className="itinerary-map-container">
            <Map features={places} changePlace={clickPlace} search={false} />
          </div>
        </div>
      </div>
    );
}

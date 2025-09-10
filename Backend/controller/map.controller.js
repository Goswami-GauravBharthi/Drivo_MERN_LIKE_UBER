import {
  getAddressCoordinate,
  getAutoSuggestion,
  getDistanceAndTime,
} from "../services/maps.service.js";

export const getCoordinates = async (req, res) => {
  const { address } = req.query;
 
  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "coordinates not found" });
  }
};

export const getDistanceTime = async (req, res) => {

//     response 
//     {
//       "distance": 608.1,meter
//       "time": 57.1 second
//     }
  try {
    const { origin, destination } = req.query;

    const distanceData = await getDistanceAndTime(origin, destination);

    res.status(200).json(distanceData);
  } catch (error) {
    res.status(404).json({ message: "distance and time not found" });
  }
};

export const getSuggestion=async(req,res)=>{
    try {
        const {input}=req.query;

        const suggestion = await getAutoSuggestion(input);
        res.status(200).json({suggestion})
    } catch (error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

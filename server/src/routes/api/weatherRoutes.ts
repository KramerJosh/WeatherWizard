import { Router, type Request, type Response } from "express";
import HistoryService from '../../service/historyService.js';
import WeatherService from "../../service/weatherService.js";

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post("/", async (req: Request, res: Response) => {
  try {
    const { city } = req.body; // pull city name from the body of the request, and store in local variable
    if (!city) {
      return res.status(400).json({ error: "City name is required" });
    }
    // Get weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(city);
    if (!weatherData) {
      return res.status(404).json({ error: "Weather data not found" });
    }
    // TODO: save city to search history
    await HistoryService.addCity(city);
    // Return weather data as the response
    return res
      .status(200)
      .json({
        weatherData,
        message: "City weather retrieved and saved to history",
      });
  } catch (error) {
    console.error("Error in POST request:", error);
    return res.status(500).json({ error: "Internal Server Error in Post Request" });
  }
});

// TODO: GET search history
router.get("/history", async (_req: Request, res: Response) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json({ cities });
  } catch (error) {
    console.error("Error in GET /history:", error);
    return res.status(500).json({ error: "Failed to retrieve search history" });
  }
});

// * BONUS TODO: DELETE city from search history
// router.delete("/history/:id", async (req: Request, res: Response) => {
//   try {
//     if (!req.params.id) {
//       res.status(400).json({ msg: "State id is required" });
//     }
//     await HistoryService.removeCity(req.params.id);
//     res.json({ success: "State successfully removed from search history" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

export default router;

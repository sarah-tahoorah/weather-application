import WeatherIcon from "./WeatherIcon";
import { Droplets, Wind, Thermometer } from "lucide-react";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  aqi: number;
  condition: string;
  feelsLike: number;
  windSpeed: number;
}

interface WeatherCardProps {
  data: WeatherData;
}

const getAQILabel = (aqi: number): { label: string; color: string } => {
  if (aqi <= 50) return { label: "Good", color: "text-green-500" };
  if (aqi <= 100) return { label: "Moderate", color: "text-yellow-500" };
  if (aqi <= 150) return { label: "Unhealthy for Sensitive", color: "text-orange-500" };
  if (aqi <= 200) return { label: "Unhealthy", color: "text-red-500" };
  if (aqi <= 300) return { label: "Very Unhealthy", color: "text-purple-500" };
  return { label: "Hazardous", color: "text-rose-700" };
};

const getCardGradient = (condition: string): string => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("rain") || lowerCondition.includes("storm") || lowerCondition.includes("thunder")) {
    return "weather-card-night";
  }
  if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) {
    return "weather-card-sky";
  }
  if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
    return "weather-card-sunset";
  }
  return "weather-card-sky";
};

const WeatherCard = ({ data }: WeatherCardProps) => {
  const aqiInfo = getAQILabel(data.aqi);
  const cardGradient = getCardGradient(data.condition);

  return (
    <div className="animate-fade-in-up">
      {/* Main Weather Card */}
      <div className={`${cardGradient} rounded-3xl p-8 text-white shadow-lg mb-6`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold mb-1">
              {Math.round(data.temperature)}°C
            </h2>
            <p className="text-white/80 font-medium capitalize">{data.condition}</p>
          </div>
          <div className="animate-float">
            <WeatherIcon condition={data.condition} size={72} className="text-white" />
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-4">
          <p className="text-xl font-semibold">{data.city}</p>
          <p className="text-white/70">{data.country}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Temperature Card */}
        <div className="glass-card rounded-2xl p-4 text-center shadow-md">
          <div className="flex justify-center mb-2">
            <Thermometer className="h-6 w-6 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {Math.round(data.feelsLike)}°C
          </p>
          <p className="text-sm text-muted-foreground">Feels Like</p>
        </div>

        {/* Humidity Card */}
        <div className="glass-card rounded-2xl p-4 text-center shadow-md">
          <div className="flex justify-center mb-2">
            <Droplets className="h-6 w-6 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{data.humidity}%</p>
          <p className="text-sm text-muted-foreground">Humidity</p>
        </div>

        {/* Wind Card */}
        <div className="glass-card rounded-2xl p-4 text-center shadow-md">
          <div className="flex justify-center mb-2">
            <Wind className="h-6 w-6 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {Math.round(data.windSpeed)} m/s
          </p>
          <p className="text-sm text-muted-foreground">Wind</p>
        </div>
      </div>

      {/* AQI Card */}
      <div className="glass-card rounded-2xl p-5 mt-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg">🌫</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Air Quality Index</p>
              <p className="font-semibold text-foreground">AQI</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">{data.aqi}</p>
            <p className={`text-sm font-medium ${aqiInfo.color}`}>{aqiInfo.label}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

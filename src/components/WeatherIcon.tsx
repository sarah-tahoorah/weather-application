import { Cloud, CloudRain, CloudSnow, Sun, CloudSun, CloudLightning, CloudFog, Moon, CloudMoon } from "lucide-react";

interface WeatherIconProps {
  condition: string;
  size?: number;
  className?: string;
}

const WeatherIcon = ({ condition, size = 48, className = "" }: WeatherIconProps) => {
  const iconProps = { size, className: `${className} drop-shadow-lg` };
  
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
    return <CloudLightning {...iconProps} />;
  }
  if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle") || lowerCondition.includes("shower")) {
    return <CloudRain {...iconProps} />;
  }
  if (lowerCondition.includes("snow") || lowerCondition.includes("sleet")) {
    return <CloudSnow {...iconProps} />;
  }
  if (lowerCondition.includes("fog") || lowerCondition.includes("mist") || lowerCondition.includes("haze")) {
    return <CloudFog {...iconProps} />;
  }
  if (lowerCondition.includes("cloud") && lowerCondition.includes("night")) {
    return <CloudMoon {...iconProps} />;
  }
  if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) {
    return <Cloud {...iconProps} />;
  }
  if (lowerCondition.includes("partly") || lowerCondition.includes("scattered")) {
    return <CloudSun {...iconProps} />;
  }
  if (lowerCondition.includes("night") || lowerCondition.includes("clear night")) {
    return <Moon {...iconProps} />;
  }
  if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
    return <Sun {...iconProps} />;
  }
  
  return <CloudSun {...iconProps} />;
};

export default WeatherIcon;

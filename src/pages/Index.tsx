import { useState } from "react";
import { CloudSun, Sparkles } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import WeatherCard from "@/components/WeatherCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";

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

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "90b80535c68b6089f0a7e0744e05da90";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchWeather = async (city: string) => {
    setIsLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!weatherResponse.ok) {
        if (weatherResponse.status === 404) {
          throw new Error("City not found. Please enter a valid city name.");
        }
        if (weatherResponse.status === 401) {
          throw new Error("API key is invalid or missing. Please add a valid OpenWeatherMap API key.");
        }
        throw new Error("Failed to fetch weather data. Please try again.");
      }

      const weatherJson = await weatherResponse.json();

      // Fetch air quality data
      const { lat, lon } = weatherJson.coord;
      const aqiResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      let aqi = 0;
      if (aqiResponse.ok) {
        const aqiJson = await aqiResponse.json();
        // Convert OpenWeatherMap AQI (1-5) to standard AQI scale
        const aqiIndex = aqiJson.list[0]?.main?.aqi || 1;
        const aqiMapping: Record<number, number> = { 1: 25, 2: 75, 3: 125, 4: 175, 5: 250 };
        aqi = aqiMapping[aqiIndex] || 50;
      }

      const data: WeatherData = {
        city: weatherJson.name,
        country: weatherJson.sys.country,
        temperature: weatherJson.main.temp,
        humidity: weatherJson.main.humidity,
        aqi,
        condition: weatherJson.weather[0]?.description || "Unknown",
        feelsLike: weatherJson.main.feels_like,
        windSpeed: weatherJson.wind.speed,
      };

      setWeatherData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Aurora Background */}
      <div className="aurora-bg" />
      
      <div className="min-h-screen py-10 px-4 relative">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-6 animate-float shadow-glow">
              <CloudSun className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="text-gradient">Weather</span>
              <span className="text-foreground"> Dashboard</span>
            </h1>
            <p className="text-muted-foreground font-medium flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Real-time weather & air quality data
              <Sparkles className="h-4 w-4 text-accent" />
            </p>
          </div>

          {/* Search */}
          <div className="mb-10">
            <SearchBar onSearch={fetchWeather} isLoading={isLoading} />
          </div>

          {/* Content */}
          <div className="min-h-[300px]">
            {isLoading && <LoadingSpinner />}

            {error && !isLoading && (
              <div className="glass-card-elevated rounded-2xl p-8 text-center animate-scale-in">
                <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-destructive/10 flex items-center justify-center">
                  <span className="text-4xl">😕</span>
                </div>
                <p className="text-destructive font-semibold text-lg">{error}</p>
              </div>
            )}

            {weatherData && !isLoading && <WeatherCard data={weatherData} />}

            {!weatherData && !isLoading && !error && (
              <div className="glass-card-elevated rounded-3xl p-10 text-center animate-scale-in">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center animate-pulse-soft">
                  <CloudSun className="h-12 w-12 text-primary" />
                </div>
                <p className="text-muted-foreground font-medium text-lg">
                  Enter a city name to discover the weather
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  {['London', 'Tokyo', 'New York'].map((city) => (
                    <button
                      key={city}
                      onClick={() => fetchWeather(city)}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-14 text-center">
            <p className="text-xs text-muted-foreground font-medium">
              Powered by OpenWeatherMap ✨
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
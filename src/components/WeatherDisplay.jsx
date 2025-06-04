
import { Sun, Cloud, CloudRain, Snowflake, MapPin, Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import Card from './Card'; 
import { useWeather } from '../context/WeatherContext';

const getWeatherIcon = (weatherCode, size = 'lg') => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const iconProps = {
    className: `${sizeClasses[size]} drop-shadow-lg`
  };

  switch (weatherCode) {
    case 'Clear':
      return <Sun {...iconProps} className={`${iconProps.className} text-amber-400`} />;
    case 'Clouds':
      return <Cloud {...iconProps} className={`${iconProps.className} text-slate-400`} />;
    case 'Rain':
      return <CloudRain {...iconProps} className={`${iconProps.className} text-blue-400`} />;
    case 'Snow':
      return <Snowflake {...iconProps} className={`${iconProps.className} text-blue-200`} />;
    default:
      return <Cloud {...iconProps} className={`${iconProps.className} text-slate-400`} />;
  }
};

function WeatherDisplay({ weather }) {
  const { unit } = useWeather();

  if (!weather) {
    return (
      <Card variant="default" className="p-8">
        <div className="text-center text-slate-500">
          <Cloud className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Search for a city to see weather</p>
        </div>
      </Card>
    );
  }

  const { main, name, weather: weatherDetails, wind, visibility } = weather;
  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const weatherCode = weatherDetails[0].main;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 " >
      {/* Main Weather Card */}
      <Card variant="gradient" className="lg:col-span-2 p-8 z-10 ">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            {getWeatherIcon(weatherCode, 'xl')}
          </div>

          <div className="text-center sm:text-left flex-grow">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <MapPin className="w-5 h-5 text-slate-400" />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
                {name}
              </h2>
            </div>

            <div className="mb-3">
              <span className="text-5xl sm:text-6xl font-light text-slate-100">
                {temperature}°
              </span>
              <span className="text-2xl text-slate-400 ml-1">
                {unit === 'metric' ? 'C' : 'F'}
              </span>
            </div>

            <p className="text-lg capitalize text-slate-300 mb-2">
              {weatherDetails[0].description}
            </p>

            <p className="text-slate-400 flex items-center justify-center sm:justify-start gap-1">
              <Thermometer className="w-4 h-4" />
              Feels like {feelsLike}°{unit === 'metric' ? 'C' : 'F'}
            </p>
          </div>
        </div>
      </Card>

      {/* Weather Details Card */}
      <Card variant="glass" className="p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">
          Details
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span className="text-slate-300">Humidity</span>
            </div>
            <span className="font-semibold text-slate-200">
              {main.humidity}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-slate-500" />
              <span className="text-slate-300">Pressure</span>
            </div>
            <span className="font-semibold text-slate-200">
              {main.pressure} hPa
            </span>
          </div>

          {wind && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">Wind</span>
              </div>
              <span className="font-semibold text-slate-200">
                {Math.round(wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}
              </span>
            </div>
          )}

          {visibility && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">Visibility</span>
              </div>
              <span className="font-semibold text-slate-200">
                {Math.round(visibility / 1000)} km
              </span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default WeatherDisplay;
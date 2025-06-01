import { Sun, Cloud, CloudRain, Snowflake, Calendar } from 'lucide-react';
import Card from './Card';
const getWeatherIcon = (code, size = 'md') => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconProps = {
    className: `${sizeClasses[size]} drop-shadow-sm`
  };

  switch (code) {
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

const getDailyForecasts = (list) => {
  const daily = {};
  list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
    const hour = new Date(item.dt * 1000).getHours();
    if (!daily[date] || (hour >= 11 && hour <= 13)) {
      daily[date] = item;
    }
  });
  return Object.values(daily).slice(0, 5);
};

function ForecastDisplay({ forecast }) {

  if (!forecast?.list) return null;

  const dailyForecasts = getDailyForecasts(forecast.list);

  return (
    <Card variant="glass" className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-slate-200">
          5-Day Forecast
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {dailyForecasts.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const isToday = index === 0;

          return (
            <div
              key={index}
              className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-slate-700/70 transition-all duration-200 hover:scale-105"
            >
              <p className="text-sm font-medium text-slate-300 mb-2">
                {isToday ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })}
              </p>

              <div className="flex justify-center mb-3">
                {getWeatherIcon(item.weather[0].main, 'lg')}
              </div>

              <div className="mb-2">
                <p className="text-xl font-bold text-slate-100">
                  {Math.round(item.main.temp)}°
                </p>
                <p className="text-xs text-slate-400">
                  {Math.round(item.main.temp_min)}° / {Math.round(item.main.temp_max)}°
                </p>
              </div>

              <p className="text-xs capitalize text-slate-300 leading-tight">
                {item.weather[0].description}
              </p>

              {item.pop > 0.1 && (
                <p className="text-xs text-blue-400 mt-1">
                  {Math.round(item.pop * 100)}% rain
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default ForecastDisplay;
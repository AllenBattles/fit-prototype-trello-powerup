import { defaultUnitForLocale, celsiusToFahrenheit, kphToMph } from './modules/util';
import fetchWeatherData from './modules/api';
import getConditionKey from './modules/conditions-map';
import localizationSettings from './modules/localizationSettings';

const { Promise } = window.TrelloPowerUp;
const REFRESH_INTERVAL = 1800; // 30 minutes in seconds
var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

const showBadge = (command, type, prefs) => {
  if (command === 'card-badges') {
    return prefs[`${type}-front`] !== false;
  }
  if (command === 'card-detail-badges') {
    return prefs[`${type}-back`] !== false;
  }

  throw new Error('Unknown command', command);
};


window.TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Project Summary',
      callback: function(t){
  
          return t.popup({
            title: "Set Project Number Field",
            url: 'setfield.html'
          });
        
      }      
    }];
  },
  'card-back-section': function(t, options){
    return {
      title: 'Project Summary',
      icon: GRAY_ICON, // Must be a gray icon, colored icons not allowed.
      content: {
        type: 'iframe',
        url: t.signUrl('./projectsummary.html'),
        height: 230 // Max height is 500
      }
    };	
}
});




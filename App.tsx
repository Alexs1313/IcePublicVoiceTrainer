import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from 'react';

import {icVceTrainrrRecordAppVisit} from './IcVceTrainrr/IcVceTrainrrData/IcVceTrainrrStreakStore';
import IcVceTrainrrStackNav from './IcVceTrainrr/IcVceTrainrrRoutes/IcVceTrainrrStackNav.tsx';

const App = () => {
  useEffect(() => {
    icVceTrainrrRecordAppVisit();
  }, []);

  return (
    <NavigationContainer>
      <IcVceTrainrrStackNav />
    </NavigationContainer>
  );
};

export default App;

import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from 'react';

import {recordAppVisit} from './PblicVceTrainer/data/streakStore';
import StackNav from './PblicVceTrainer/routes/StackNav.tsx';

const App = () => {
  useEffect(() => {
    recordAppVisit();
  }, []);

  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};

export default App;

import './App.css';
import Autocomplete from '../Autocomplete/Autocomplete';
import { useCallback } from 'react';

function App() {
  const onSelect = useCallback(console.log, []);

  return (
    <div className="App">
      <Autocomplete onSelect={onSelect}/>
    </div>
  );
}

export default App;

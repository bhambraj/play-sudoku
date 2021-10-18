import './App.css';
import Grid from '../components/Grid/grid';
import {version} from '../../package.json';

function App() {
  return (
    <div className="App">
      <h1><b>Play Sudoku</b></h1>
      <p className="version-info">{`(${version})`}</p>
      <Grid />
    </div>
  );
}

export default App;

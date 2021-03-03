import './App.css';
import Logo from './Logo';
import AnotherComponent from './subfolder/subsubfolder/AnotherComponent';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <AnotherComponent />
      </header>
    </div>
  );
}

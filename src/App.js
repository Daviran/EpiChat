import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from './components/head.js';
import Foot from './components/foot.js';
import TheNav from './components/theNav'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Head/> 
      
      </header>

      <main>
      <TheNav/>
      </main>
      <footer className='App-footer'> 

      <Foot/>

      </footer>
    </div>
    
  );
}

export default App;

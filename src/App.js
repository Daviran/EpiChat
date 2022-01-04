import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from './components/head.js';
import Foot from './components/foot.js';
import TheNav from './components/theNav'
import Chat from './components/chat'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Head/> 
      <TheNav/>
      </header>

      <main>
      <Chat></Chat>
      </main>
      <footer className='App-footer'> 

      <Foot/>

      </footer>
    </div>
    
  );
}

export default App;

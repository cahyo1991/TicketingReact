import logo from './logo.svg';
import './App.css';
import RouterPages from './RouterPages';



function App({ hideLoader }) {
  global.Api = "http://localhost:5002/Api/";
  global.AppName = "IT SOLUTION"
  global.ApiImage = 'http://localhost:5002/ReturnImage/'

  return (
<RouterPages hideLoader={hideLoader}/>
  );
}



export default App;

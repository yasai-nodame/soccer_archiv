import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home'; // あなたの Home コンポーネントのパスに応じて変更してください

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                
            </Switch>
        </Router>
    );
}

export default App;

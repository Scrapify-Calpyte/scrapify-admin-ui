import logo from './logo.svg';
import './App.css';
import ScrollTop from './components/ScrollTop';
import ThemeRoutes from './routes/index';

function App() {
    return (
        <ScrollTop>
            <ThemeRoutes />
        </ScrollTop>
    );
}

export default App;

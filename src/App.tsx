import "./App.scss";
import { Container } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { Router } from "./navigation/router";
import { store } from "./stores/store";

function App() {
  return (
    <Container className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </Container>
  );
}

export default App;

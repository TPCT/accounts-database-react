import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'jquery/dist/jquery.js';
import './App.css';
import {createBrowserRouter,RouterProvider}from 'react-router-dom';
import { Home } from './components/Home';
import AccountDetailsPage from './components/AccountDetailsPage';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/accountDetails/:id",
      element: <AccountDetailsPage/>,
    }
  ]);

  return (<RouterProvider router={router}/>)
}

export default App;

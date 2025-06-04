import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';
import Navbar from './components/navbar';
import Home from './components/home';
import { Toaster } from 'react-hot-toast';

const router=createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
        <Navbar />
        <Paste />
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    },
  ]
);

function App() {

  return (
  <>
    <RouterProvider router={router}/>
    <Toaster/>
  </>)
}


export default App

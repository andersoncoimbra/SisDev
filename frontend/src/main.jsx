import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Nivel from './pages/niveis.jsx'
import Desenvolvedores from './pages/desenvolvedores.jsx'


const router = createBrowserRouter([
  { 
    path: '/',
    element: <Sidebar/>,
    children: [{
      path: '/',
      element: <Desenvolvedores/>,
    },
    {
      path: '/niveis',
      element: <Nivel/>,
    },
    
  ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ChakraProvider>
      <RouterProvider router={router} />      
    </ChakraProvider>
  </React.StrictMode>,
)

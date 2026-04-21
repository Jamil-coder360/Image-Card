import React from 'react'
import { toast } from 'react-toastify';
import MyCard from './component/MyCard';

const App = () => {

   const notify = () => toast("Wow so easy!");


    
   return (
<MyCard />
  )
}

export default App
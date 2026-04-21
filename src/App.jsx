import React from 'react'
import { toast } from 'react-toastify';

const App = () => {

   const notify = () => toast("Wow so easy!");


    
   return (
     <div className='bg-gray-200'>
     
     <button onClick={notify}>Notify!</button>
     </div>
  )
}

export default App
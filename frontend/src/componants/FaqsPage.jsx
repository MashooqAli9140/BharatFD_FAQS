import React, { useState } from 'react'
import './FaqsPage.css';

const FaqsPage = () => {
      const [ openans , setOpenAns ] = useState(false);


      
  return (
    <div>
       {/* //NAVBAR SECTION  */}
         <div id='Navbar'>
               <div id='navleft'> 
                    <h1 style={{ color:"#2C387A"}}> Bharat<span>FD</span>  </h1>
               </div>
               <div id='navright'>
                     <p>Compare FD rates </p>
                     <p>Contact us</p>
               </div>
         </div> {/* //NAVBAR SECTION  */}
      
     {/* //FAQS SECTION  */}
     <div id='faqs-heading'>
              <h2> Frequently Asked Questions </h2>
     </div>
     <div id='faqs-box-outer'>
            <div id='faqs-box-inner'>
                 <div id='language-btn-div'>
                 <button id='language-btn'> English </button>
                 <button id='language-btn'> Hindi </button>
                 <button id='language-btn'> Bengali </button>
                 <button id='language-btn'> Tamil </button>
                 </div>

                 <div id='q-a-div'>
                     <button id='question-open-btn' onClick={ () => setOpenAns( (prev) => !prev ) }>
                         <div id='ques-div'>
                           <p style={{ color: openans? '#2C387A' : "black" }}> What is your name? </p>
                           <p style={{ display:openans ? "none" : "block" }} > Show </p> 
                           <p style={{ display:openans ? "block" : "none" }} > Hide </p> 
                         </div>
                     </button>

                      <div id='ans-div' style={{ display: openans? "block" : "none" }}> <p> My name is BharatFD  </p> </div>
                 </div>
                 
            </div>
     </div>

    </div>
  )
}

export default FaqsPage

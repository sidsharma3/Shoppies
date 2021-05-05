import React from 'react'

function Landing({setShowLanding}) {
    return (
        <div className="landing">
           <h1>Welcome to the Shoppies!</h1>
           <p>Click the button below to get started in searching 
               for and nomianting five movies for the <span>Shoppies</span></p>
               
           <button onClick={() => setShowLanding(false)}>
               Click to get started</button> 
        </div>
    )
}

export default Landing

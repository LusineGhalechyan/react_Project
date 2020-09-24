import React from "react";
import Name from "../PersonalData/Name";
import Surname from "../PersonalData/Surname";

const greetings = `Im a student at Bitschool programming և business center. I just had only 
                  2 lessons of React.js course and already I'm able to share my feedback about
                  my Bitschool family, about my lecturer Masis Karapetyan․ You are great, you are warm, you are bright, you are kind !!!
                  Thank You that we have You !!!
                    
                  Wishing You more prosperity and all the best, kindest things ever !!!`;

const Greetings = () => {
  return (
    <div style={{ margin: "0 20px" }}>
      <h3>Admiration, feedback, greetings</h3>
      <p>{greetings}</p>
      Near You,
      <div style={{ display: "flex" }}>
        <Name name="Lusine" />
        <Surname surname="Ghalechyan" />
      </div>
    </div>
  );
};
export default Greetings;

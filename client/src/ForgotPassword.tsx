import React from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { app } from "./config/firebaseConfig";
import { useNavigate } from 'react-router-dom';

function ForgotPassword(){
    return(
        <div>
            <h1>Forgot Password</h1>
        </div>
    )
}

export default ForgotPassword;



// import React from 'react';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import { app } from "./config/firebaseConfig";
// import { useNavigate } from 'react-router-dom';

// function ForgotPassword(){
//     const history = useNavigate();

//     const handleSubmit = async(e)=>{
//         e.preventDefault()
//         const emalVal = e.target.email.value;
//         sendPasswordResetEmail(app, emalVal).then(data=>{
//             alert("Check your email")
//             history("/")
//         }).catch(err=>{
//             alert(err.code)
//         })
//     }
//     return(
//         <div className = "App">
//             <h1> Forgot Password</h1>
//             <form onSubmit= {(e)=> handleSubmit(e)}>
//                 <input name ="email" /> <br/><br/>
//                 <button> Reset</button>
//             </form>
//         </div>
//     )
// }

// export default ForgotPassword;

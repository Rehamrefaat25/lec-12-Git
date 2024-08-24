import { useState } from 'react'
import './App.css'
import * as yup from "yup"

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    consent: false,
});
const[errorsobject,seterrorsobject]=useState({})
const userSchema=yup.object().shape({
  firstName:yup.string().min(4,"lazm mn 3 hrof").required('this field is required'),
  lastName: yup.string().required('this field is required'),
  email: yup.string().email('please enter avalid email adress').required('this field is required'),
  queryType:yup.string().oneOf(['general','support']).required('please select aquery type'),
  message: yup.string().required('this field is required'),
  consent:yup.boolean().oneOf([true],'to submit this form,please consent to being contacted')
})
 async function testvalidation(){
  try{
   const response= await userSchema.validate(formData,{
    abortEarly:false,
   })
   console.log(response,"Is Valid Object");
   seterrorsobject({});
}catch(err){
  var errors={}
  err.inner.forEach((error)=>{
    console.log(`${error.path}:${error.message}`);
  errors[error.path]=error.message
  });
  seterrorsobject(errors);
    console.log(errors);
  
}}
   

    function handleChange (event) {
        const keyname= event.target.name;
        var keyvalue= event.target.value;
        const type= event.target.type;

        if (type=="checkbox"){
          keyvalue=event.target.checked;
        }
        setFormData({
          ...formData,
            [keyname]:keyvalue,
          });
        };
        
        const handleSubmit =async (event) => {
         await testvalidation();
          event.preventDefault();

    if (Object.keys(errorsobject).length === 0) {
      console.log('Submitting:', formData);}
      };
      
      return (<div className='contact'>

        <form onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        <div className="all-name">

            <div className='form-input'>
                <label htmlFor='firstName'>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
          
                />
            <div>
            {errorsobject.firstName? <span className='errors'>{errorsobject.firstName}</span> :null}
            </div>
            </div>
            <div className='form-input'>
                <label htmlFor='lastName'>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}

                />
            <div>
             {errorsobject.lastName? <span className='errors'>{errorsobject.lastName}</span> :null}
            </div>
            </div>
        </div>
            <div className='form-input'>
                <label htmlFor='email'>Email Address</label>
                <input
                id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  
                    />
                    <div>
                {errorsobject.email? <span className="errors">{errorsobject.email}</span> :null}
                    </div>
                    </div>
            <div className='form-input'>
                <label htmlFor='queryType'>Query Type</label>
                <div className='query-options'>
                    <label>
                        <input
                            type="radio"
                            name="queryType"
                            value="general"
                            checked={formData.queryType === 'general'}
                            onChange={handleChange}
                        />
                        General Enquiry
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="queryType"
                            value="support"
                            checked={formData.queryType === 'support'}
                            onChange={handleChange}
                        />
                        Support Request
                    </label>
                </div>
            <div>
            {errorsobject.queryType? <span className='errors'>{errorsobject.queryType}</span> :null}
            </div>
            </div>
            <div className='form-input'>
                <label htmlFor='message'>Message</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                
                />
            <div>
            {errorsobject.message? <span className='errors'>{errorsobject.message}</span> :null}
            </div>
            </div>
            <div className='form-input'>
                <label>
                    <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
            
                    />
                    I consent to being contacted by the team
                </label>
            <div>
            {errorsobject.consent? <span className='errors'>{errorsobject.consent}</span> :null}
            </div>
            </div>
            <button type="submit"
             disabled={!formData.consent}
             >submit</button>
</form>
      </div>

  )
}

export default App;

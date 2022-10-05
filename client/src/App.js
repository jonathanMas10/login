import React, {useState, useEffect} from 'react';
import './dev.css';
const Axios = require('axios');

function App() {

  const [inAccount,inAccountset] = useState({userid:"", password:"",designation:""});
  const [errors,seterrors] = useState({});
  const [isSubmit,setissubmit] = useState(false);
  const addaccount = (e) => {
    console.log(e.target.value);
    const {name,value} = e.target;
    inAccountset((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  };

  const validateinAccounts = (values) => {
    const errors = {};
  
    if(!values.userid){
      errors.userid = "User name is required"
    } 
    if(!values.password){
      errors.password = "Password is required"
    }
    if(values.designation==="--Select Role--"||!values.designation){
      errors.designation = "Designation is required"
    }
    return errors
  };

  const insertuser = (e) => {
    e.preventDefault();
    seterrors(validateinAccounts(inAccount));
    setissubmit(true);
    Axios.post("http://localhost:3001/insert", {insertidpassword: inAccount}).then((response) => {
      console.log(response);
      const errors = {};
      errors.server = (response.data);
      seterrors(errors);
    });
  };
  
  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
      console.log(inAccount);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const [userlist,setuserlist] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/retrieve").then((response) => {
      console.log(response);
      setuserlist(response.data);
    })
  }, [])
  
  return (
    <div className='container'>
      <div className='container1'>
        <form className='form'>
          <div className='title'>Add User</div>
          <div className='unit'>
            <div className='lable'>User ID:</div>
            <input id='usersuccess' className='box' type="text" name='userid' placeholder='Enter user ID' value={inAccount.userid} onChange={addaccount}/>
            <div id='userinid' className='error'>{errors.userid}</div>
          </div>
          <br/>  
          <div className='unit'>
            <div className='lable'>Password:</div>
            <input id='passwordsuccess' className='box' type="password" name='password' placeholder='Password' value={inAccount.password} onChange={addaccount}/>
            <div id='passwordinid' className='error'>{errors.password}</div>
          </div>
          <br/>
          <div className='unit'>
            <div className='lable'>Role</div>
            <select id='selectsuccess' className='box' name='designation' value={inAccount.designation} onChange={addaccount} >
              <option selected>--Select Role--</option>
              <option value="Option1">Option1</option>
              <option value="Option2">Option2</option>
              <option value="Option3">Option3</option>
            </select>
            <div id='selectinid' className='error'>{errors.designation}</div>
          </div>
          <br/>
          <button className='button' onClick={insertuser}>Add Account</button>
        </form>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className='container2'>
        <div className='tablehead'>
          <div className='tableheader'>
            <p>Users</p>
          </div>
          <div className='tablesection'>
            <table className='content-table'>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>User ID</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

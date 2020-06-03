import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import icon from './profile-icon.png'

const ProfileIcon = ({toggleModal,onNavigationStatusChange}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const deleteToken=(token)=>{
  	fetch('https://imagerecognitionapi.herokuapp.com/deletetoken',{
  		method: 'delete',
  		headers:{
  			'Content-Type':'application/json',
          	'Authorization':token
  		},
  		body: JSON.stringify({
  			token:token
  		})
  	})
  	.then(response=>response.json())
  	.then(resp=>{
  		if(resp === 'Deleted Successfully'){
  			window.localStorage.removeItem('token');
  		}
  	}).catch(err=>console.log('Unable to delete JWT token!!!'));
  }

  return (
  	<div className="pr2 pt2 tc">
	    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
	      <DropdownToggle
	        tag="span"
	        data-toggle="dropdown"
	        aria-expanded={dropdownOpen}
	      >
	        <img
		      src={icon}
		      className="br-100 ba h3 w3 dib pointer" alt="avatar" />
	      </DropdownToggle>
	      <DropdownMenu right className="bg-transparent shadow-5 mt3">
	        <DropdownItem onClick={toggleModal}><strong>Profile</strong></DropdownItem>
	        <DropdownItem divider />
	        <DropdownItem onClick={()=>{onNavigationStatusChange('login');deleteToken(window.localStorage.getItem('token'))}}><strong>Sign Out</strong></DropdownItem>
	      </DropdownMenu>
	    </Dropdown>
    </div>
  );
}

export default ProfileIcon;
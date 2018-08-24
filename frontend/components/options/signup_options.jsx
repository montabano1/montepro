import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const SignupOptions = ({ currentUser, logout, openModal }) => {
  const proStartOptions = () => (
    <section className="login-signup">
      <button onClick={() => openModal('ClubRegister')} className='button-signup'>Register your Club</button>
      &nbsp;&nbsp;
      <button onClick={() => openModal('ClubJoin')} className='button-signup'>Join a Club</button>
    </section>
  );
  const memberStartOptions = () => (
    <section className="login-signup">
      <button onClick={() => openModal('ClubJoin')} className='button-signup'>Join a Club</button>
    </section>
  );




  return (
    currentUser.pro_member === 'pro' ?
    (currentUser.club_id === 0 ?
    proStartOptions() : <Redirect to="/options/pro" />) :
    (currentUser.club_id === 0 ?
    memberStartOptions() : <Redirect to="/options/member" />)
  );
};

export default SignupOptions;

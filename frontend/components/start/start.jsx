import React from 'react';
import { Link } from 'react-router-dom';

const Start = ({ currentUser, logout, openModal }) => {
  const sessionLinks = () => (
    <section className="login-signup">
      <button onClick={() => openModal('login')} className='button-signup'>Sign in</button>
      &nbsp;&nbsp;
      <button onClick={() => openModal('signup')} className='button-signup'>Sign up</button>
    </section>
  );

  return (
    sessionLinks()
  );
};

export default Start;

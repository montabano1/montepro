import React from 'react';
import { Link } from 'react-router-dom';

const memberOptions = () => {
  return (
    <main className='pro-options'>
      <section className='options-heading'>
        Please click on one of the following:
      </section>
      <section className='pro-options-list'>
        <Link to={'/Court'}>
          <div className='button-options'>Book a Court</div>
        </Link>
        <Link to={'/Register'}>
          <div className='button-options'>Register for Clinic / Tournament</div>
        </Link>
        <Link to={'/Results'}>
          <div className='button-options'>Input Results</div>
        </Link>
        <Link to={'/Game'}>
          <div className='button-options'>Find a Game</div>
        </Link>
        <Link to={'/Lesson'}>
          <div className='button-options'>Book a Lesson</div>
        </Link>
        <Link to={'/Comment'}>
          <div className='button-options'>Leave a Comment for Your Pro</div>
        </Link>
        <Link to={'/Profile'}>
          <div className='button-options'>Update Profile</div>
        </Link>
        <Link to={'/Clubs'}>
          <div className='button-options'>Club Lookup</div>
        </Link>
      </section>
    </main>
  );
};


export default memberOptions;

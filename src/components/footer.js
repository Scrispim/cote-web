import React from 'react';

export default function Footer() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col footer">
          {'Copyright © '}
          <a href="#">
            Sander Crispim da Silva
          </a>{' '}
          {new Date().getFullYear()}
          {'.'}
        </div>
      </div>

    </div>
  );
}

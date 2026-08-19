"use client";
import { useState } from "react";
import AuthModal from "./AuthModal";





export default function Navbar() {

const [showModal, setShowModal] = useState(false);

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <img className="nav__img" src="/assets/logo.png" alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li className="nav__list nav__list--login" onClick={() => setShowModal(true)}>
            Login
          </li>

          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
       <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </nav>
  );
}

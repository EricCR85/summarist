"use client"; 
import { useState } from "react";
import Image from "next/image";
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookList from "../components/BookList";
import AuthModal from "../components/AuthModal"; 

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Navbar onLoginClick={openModal} />

      {isModalOpen && <AuthModal onClose={closeModal} />}

      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing_content">
              <div className="landing_content_title">
                Gain more knowledge <br className="remove--tablet" /> in less
                time
              </div>
              <div className="landing_content_subtitle">
                Great summaries for busy people,{" "}
                <br className="remove--tablet" />
                individuals who barely have time to read,{" "}
                <br className="remove--tablet" />
                and even people who don't like to read.
              </div>
              <button className="btn home_cta--btn" onClick={openModal}>
                Login
              </button>
            </div>
            <figure className="landing_image--mask">
              <img src="/assets/login.png" alt="landing" />
            </figure>
          </div>
        </div>
      </section>

      <section id="books">
        <div className="container">
          <div className="row">
            <BookList />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}



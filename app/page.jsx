import Image from "next/image";
import { AiFillAudio, AiFillBulb, AiFillFileText } from "react-icons/ai";
import { BiCrown } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookList from "../components/Booklist";

export default function Home() {
  return (
    <>
      <Navbar />

      <section id="landing">
        <div className="container">
          <div className="row">
            <div className="landing__wrapper">
              <div className="landing__content">
                <div className="landing__content__title">
                  Gain more knowledge <br className="remove--tablet" /> in less
                  time
                </div>
                <div className="landing__content__subtitle">
                  Great summaries for busy people,{" "}
                  <br className="remove--tablet" />
                  individuals who barely have time to read,{" "}
                  <br className="remove--tablet" />
                  and even people who don't like to read.
                </div>
                <button className="btn home__cta--btn">Login</button>
              </div>
              <figure className="landing__image--mask">
                <img src="/assets/login.png" alt="landing" />
              </figure>
            </div>
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

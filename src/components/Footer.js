import React from 'react';
import {AiOutlineGithub, AiOutlineLinkedin} from "react-icons/ai"

const Footer = () => {
  return (
    <footer className="w-full h-14 bg-black text-white flex justify-center">
      <div className="w-[75vw] flex justify-between items-center sm:w-[50vw]">
        <a href="https://github.com/brianpham97" target="_blank">
          <AiOutlineGithub className="text-white hover:text-[#c9aa71]" />
        </a>
        <p>
          Designed by {" "}
          <a
            href="https://brianpham97.github.io/portfolio/"
            target="_blank"
            className="hover:text-[#c9aa71]"
          >
            Brian Pham
          </a>
        </p>
        <a href="https://www.linkedin.com/" target="_blank">
          <AiOutlineLinkedin className="text-white hover:text-[#c9aa71]" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
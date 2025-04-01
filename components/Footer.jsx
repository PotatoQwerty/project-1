import React from "react";

const Footer = () => {
  return (
    <footer className="bg-accent  py-4 text-center">
      <p className="text-primary"> 2025 Yes. All rights reserved.</p>
      <p className="text-primary mt-2">
        Follow us on
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline mx-1"
        >
          Twitter
        </a>
        ,
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline mx-1"
        >
          Facebook
        </a>
        , and
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline mx-1"
        >
          Instagram
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;

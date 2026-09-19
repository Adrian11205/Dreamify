import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

function Footer() {
  const information = ["How it works", "About us", "Terms", "Privacy", "FAQ"];

  return (
    <footer className="relative flex min-h-40.75 flex-col items-center justify-center gap-6 bg-foreground px-6 py-8">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        {information.map((item, i) => (
          <span
            key={i}
            className="cursor-pointer font-bold hover:underline text-background"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="text-background text-center">
        © Dreamerz 2026, All rights reserved
      </div>

      <div className="flex flex-col items-center text-background sm:absolute sm:right-8 sm:top-1/2 sm:-translate-y-1/2">
        <span>Follow us:</span>

        <div className="mt-2 flex gap-3">
          <a href="#">
            <FaYoutube className="h-6 w-6" />
          </a>

          <a href="#">
            <FaFacebook className="h-6 w-6" />
          </a>

          <a href="#">
            <FaInstagram className="h-6 w-6" />
          </a>

          <a href="#" >
            <FaLinkedin className="h-6 w-6" />
          </a>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
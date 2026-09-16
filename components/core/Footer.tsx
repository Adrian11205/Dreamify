import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

function Footer() {
  const information = ["How it works", "About us", "Terms", "Privacy", "FAQ"];

  return (
    <footer className="bg-foreground h-[163.3px] flex flex-col items-center justify-center relative">
      
      <div className="flex gap-8">
        {information.map((item, i) => (
          <span
            key={i}
            className="cursor-pointer font-bold hover:underline text-background"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="text-background mt-8">
        © Dreamerz 2026, All rights reserved
      </div>

      <div className="absolute right-8 flex flex-col items-center text-background">
  <span>Follow us:</span>

  <div className="flex gap-3 mt-2">
    <a href="#">
      <FaYoutube className="h-6 w-6"/>
    </a>

    <a href="#">
      <FaFacebook className="h-6 w-6"/>
    </a>

    <a href="#">
      <FaInstagram className="h-6 w-6]"/>
    </a>

    <a href="#" >
      <FaLinkedin className="h-6 w-6"/>
    </a>
  </div>
</div>

    </footer>
  );
}

export default Footer;
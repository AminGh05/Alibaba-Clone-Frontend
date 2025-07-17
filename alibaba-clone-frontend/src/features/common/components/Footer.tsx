import { FaGithub, FaTelegramPlane, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-primary-foreground py-6 px-4 flex flex-col items-center justify-center shadow-lg mt-auto">
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
        <div className="text-sm font-semibold opacity-80">© {currentYear} Alibaba - clone. All Rights Reserved.</div>
        <div className="flex gap-4 text-xl">
          <a
            href="https://github.com/AminGh05"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-accent transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://t.me/AminGh05"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="hover:text-accent transition-colors"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="https://linkedin.com/in/amin-ghoorchian"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-accent transition-colors"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center w-full mt-4">
        <img src="/logo.png" alt="Logo" className="h-12 w-auto mx-auto drop-shadow-lg" />
      </div>
    </footer>
  );
};

export default Footer;

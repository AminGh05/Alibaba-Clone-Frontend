const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground p-4 text-center mt-auto">
      <p>© {currentYear} Alibaba - clone. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;

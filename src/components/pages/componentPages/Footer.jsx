const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Task Manager. All rights reserved.
        </p>
        <p className="text-sm">
          Developed by <a href="https://github.com" className="hover:underline">Shivam Sharma</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
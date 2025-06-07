import LoginModal from "../components/LoginModal";

const Login = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <LoginModal />
    </div>
  );
};

export default Login;

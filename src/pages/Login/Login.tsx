import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import LoginForm from "../../features/users/LoginForm/LoginForm";

const Login = () => {
  return (<>
    <Header />
    <main className="flex flex-col w-full min-h-[80vh]">
      <LoginForm />
    </main>
    <Footer />
  </>);
}

export default Login;
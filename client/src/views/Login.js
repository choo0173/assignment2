import Header from "../components/notinuse/Header";
import FormBox from "../components/FormBox";

function Login(props) {
  return (
    <>
      <Header />
      <FormBox setToken={props.setToken} />
    </>
  );
}
export default Login;

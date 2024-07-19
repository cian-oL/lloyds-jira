import { useAppContext } from "../contexts/AppContext";
import SignInTile from "../components/SignInTile";

const HomePage = () => {
  const { isLoggedIn } = useAppContext();

  return <>{isLoggedIn ? <div>Home Page</div> : <SignInTile />}</>;
};

export default HomePage;

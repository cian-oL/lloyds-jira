import { useAppContext } from "../contexts/AppContext";
import SignInTile from "../components/SignInTile";
import HomePageTile from "../components/HomePageTile";

const HomePage = () => {
  const { isLoggedIn } = useAppContext();

  return <>{isLoggedIn ? <HomePageTile /> : <SignInTile />}</>;
};

export default HomePage;

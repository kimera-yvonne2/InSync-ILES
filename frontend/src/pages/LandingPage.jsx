import Hero from "../Hero";
import Features from "../Features";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero goToDashboard={() => navigate("/login")} />
      <Features />
    </>
  );
};

export default LandingPage;

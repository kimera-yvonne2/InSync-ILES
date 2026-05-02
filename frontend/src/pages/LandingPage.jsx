import Hero from "../Hero";
import Features from "../Features";
import PortalAccess from "../components/PortalAccess";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Hero
        onPrimaryAction={() => navigate("/signup")}
        onSecondaryAction={() => navigate("/login")}
        onExploreFeatures={scrollToFeatures}
      />
      <Features />
      {/* RBAC portal access section — only visible when logged in */}
      <PortalAccess />
    </>
  );
};

export default LandingPage;

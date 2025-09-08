import Header from "@/components/LearningPlatform/Header";
import Hero from "@/components/LearningPlatform/Hero";

const Home = () => {
  const handleNavigate = (view: string) => {
    if (view === 'signin') {
      window.location.hash = '#/signin';
    } else if (view !== 'home') {
      // For other nav items, redirect to signin first
      window.location.hash = '#/signin';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={handleNavigate} currentView="home" />
      <Hero />
    </div>
  );
};

export default Home;
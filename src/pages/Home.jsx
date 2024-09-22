// import Categories from "../components/Section/Categories";
// import FlashSales from "../components/Section/FlashSales";
// import FrequentPurchased from "../components/Section/FrequentPurchased";
import CitiesFeatures from "../components/Section/CitiesFeatures";
import Cta from "../components/Section/CTA";
import Features from "../components/Section/Features";
import Hero from "../components/Section/Hero";
import TopSelling from "../components/Section/TopSelling";

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <TopSelling />
      <CitiesFeatures />
      <Cta />
      {/* <Categories /> */}
      {/* <FlashSales />
      <FrequentPurchased /> */}
    </>
  );
};

export default Home;

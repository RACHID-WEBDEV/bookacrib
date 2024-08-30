import Categories from "../components/Section/Categories";
import FlashSales from "../components/Section/FlashSales";
import FrequentPurchased from "../components/Section/FrequentPurchased";
import Hero from "../components/Section/Hero";
import TopSelling from "../components/Section/TopSelling";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <TopSelling />
      <FlashSales />
      <FrequentPurchased />
      <Footer />
      {/* <div className="p-20 flex flex-col items-center justify-center">
        <h1 className=" text-base lg:text-8xl font-bold text-blue-600">
          Mr DIY Project
        </h1>

        <p className=" text-lg">Seamless and convenient shopping experience</p>
      </div> */}
    </>
  );
};

export default Home;

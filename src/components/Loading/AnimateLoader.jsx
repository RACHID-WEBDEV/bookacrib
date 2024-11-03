const AnimateLoader = () => {
  return (
    <div className=" fixed inset-0 bg-black/80 z-50 bg-opacity-50 backdrop-blur">
      <div className=" w-full h-screen  transition-colors flex flex-col items-center justify-center">
        <span className="loaderspin">Load&nbsp;ng</span>
        <span className="loadercss">Load&nbsp;ng</span>
      </div>
    </div>
  );
};

export default AnimateLoader;

const FooterComponent = () => {
  return (
    <footer className=" w-full h-auto bg-gray-300 md:h-48 rounded-md mt-5 md:place-content-stretch  ">
      <div className=" w-full h-72 mt-2 md:h-40">
        <h3 className="text-xl font-semibold flex justify-center pt-2 underline">
          Contact Us:
        </h3>
        <div className=" w-full h-64 md:flex p-5 md:h-36">
          <div className=" w-full h-20 pl-3 pt-3">
            <h5 className="font-semibold">Address:</h5>
            <p className="font-medium text-sm">
              Plot.No 12, Shaitan gali, Khatra mahal, kabristan ke piche,
              <br />
              Nagpur - 440008, Maharashtra
            </p>
          </div>
          <div className=" w-full h-20 pl-3 pt-3">
            <h5 className="font-semibold">Contact Number:</h5>
            <p className="font-medium text-sm">1234567890</p>
          </div>
          <div className=" w-full h-16 pl-3 ">
            <h5 className="font-semibold">Email Address:</h5>
            <p className="font-medium text-sm">Sample@gmail.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;

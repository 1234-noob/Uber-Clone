const CaptainDetails = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="rounded-full h-10 w-10 object-cover "
            src="https://photos.lensculture.com/large/5dd2fa6e-fe8d-469f-959b-46299ced511d.jpg"
            alt=""
          />
          <h4 className="text-lg font-medium">Chinmay Vinarkar</h4>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h4 className="text-xl font-semibold">&#8377;2000</h4>
          <p className="text-sm font-medium text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex justify-center p-5 mt-6 bg-gray-100 rounded-xl gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl font-thin mb-2  ri-time-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl font-thin mb-2 ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl font-thin  mb-2 ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </>
  );
};

export default CaptainDetails;

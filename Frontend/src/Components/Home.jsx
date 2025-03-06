import { useState } from "react";

const DriveHome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles([...files, ...event.dataTransfer.files]);
  };

  return (
    <div className="moving-background h-screen w-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Upload Button */}
      <button
        className="upload-btn text-white font-bold py-3 px-6 rounded-lg text-lg mb-8 hover:scale-105 transition-transform"
        onClick={() => setShowPopup(true)}
      >
        <i className="ri-upload-cloud-2-line mr-2"></i>Upload File
      </button>

      {/* Popup for File Upload */}
      {showPopup && (
        <div className="pop fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
          <form className="floating-popup bg-gray-900 p-8 rounded-lg w-11/12 max-w-md">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="drop-zone flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
            <button className="upload-btn w-full text-white font-bold py-2 px-4 rounded-lg mt-4 hover:scale-105 transition-transform">
              <i className="ri-upload-cloud-2-line mr-2"></i>Upload File
            </button>
          </form>
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 text-xl transition-colors"
            onClick={() => setShowPopup(false)}
          >
            <i className="ri-close-line"></i>
          </button>
        </div>
      )}

      {/* File List */}
      <div className="files mt-8 w-full max-w-2xl">
        {files.map((file, index) => (
          <div key={index} className="file-item p-4 mb-3 rounded-lg flex justify-between items-center">
            <h1 className="text-gray-200">{file.name}</h1>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              <i className="ri-download-line"></i>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriveHome;

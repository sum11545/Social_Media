import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([null]); // Start with one image input field

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("url", url);
    images.forEach((image) => {
      formData.append("image", image);
    });

    try {
      const response = await fetch("https://social-media-n5ce.onrender.com/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Form submitted successfully!");
        setName("");
        setUrl("");
        setImages([null]); 
        
      } else if (response.status === 409) {
     
        toast.error("This URL already exists in the database. Please use a different one.");
       } else {
        toast.error("Error submitting the form.");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    }
  };

  const handleFileChange = (file, index) => {
    const newImages = [...images];
    newImages[index] = file[0];
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, null]); // Add a new image input slot
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Submit Your Information
          </h2>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Name
            </label>
            <input
              className="w-full px-4 py-2 bg-white text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Social Media Handle
            </label>
            <input
              className="w-full px-4 py-2 bg-white text-black border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Upload Images
            </label>
            {images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2 mb-4">
                <input
                  className="w-full px-4 py-2 bg-white text-black border border-gray-700 rounded-lg"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files, index)}
                />
                {index === images.length - 1 && (
                  <button
                    type="button"
                    onClick={addImageField}
                    className="text-white bg-gray-700 hover:bg-gray-800 px-2 py-1 rounded-full focus:outline-none"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {images
              .filter((image) => image)
              .map((image, index) => (
                <div key={index} className="w-20 h-20 relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;

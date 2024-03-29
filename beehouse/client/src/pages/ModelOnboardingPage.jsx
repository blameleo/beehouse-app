import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import SecNavbar from "../components/SecNavbar";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

function ModelOnboardingPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [displayPic, setDisplayPic] = useState(null);
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();
  const [image1, setImage1] = useState(null);

  const [image2, setImage2] = useState(null);

  const [image3, setImage3] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({
    displayPicUrl: null,
    imageUrl1: null,
    imageUrl2: null,
    imageUrl3: null,
  });

  const [formInfo, setFormInfo] = useState({
    _id: cookies.UserId,
    firstName: "",
    lastName: "",
    gender: "",
    countryCode: "",
    telephone: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    height: "",
    location: "",
    complexion: "",
    stature: "",
    displayPicUrl: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    telephone: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    height: "",
    location: "",
    complexion: "",
    stature: "",
    displayPicUrl: "",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
  });

  const handleCountryCodeChange = (event) => {
    const selectedCountryCode = event.target.value;
    setFormInfo((prevFormInfo) => ({
      ...prevFormInfo,
      countryCode: selectedCountryCode,
    }));
  };
  const handleSelectChange = (name, value) => {
    setFormInfo((prevFormInfo) => ({
      ...prevFormInfo,
      [name]: value,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 65 }, (_, i) => (2023 - i).toString());

  // const handleIdCardChange = (event) => {
  //   const selectedFile5 = event.target.files[0];
  //   setIdCardPic(selectedFile5);

  //   setFormInfo((prevData) => ({
  //     ...prevData,
  //     idCardUrl: selectedFile5,
  //   }));

  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     setImagePreviews((prevPreviews) => ({
  //       ...prevPreviews,
  //       idCardUrl: e.target.result,
  //     }));
  //   };
  //   reader.readAsDataURL(selectedFile5);
  // };

  const handleDisplayPicChange = (event) => {
    const selectedFile4 = event.target.files[0];
    setDisplayPic(selectedFile4);
    setFormInfo((prevData) => ({
      ...prevData,
      displayPicUrl: selectedFile4,
    }));
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreviews((prevPreviews) => ({
        ...prevPreviews,
        displayPicUrl: e.target.result,
      }));
    };
    reader.readAsDataURL(selectedFile4);
  };

  const handleImage1Change = (event) => {
    const selectedFile1 = event.target.files[0];
    setImage1(selectedFile1);
    setFormInfo((prevData) => ({
      ...prevData,
      imageUrl1: selectedFile1,
    }));

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreviews((prevPreviews) => ({
        ...prevPreviews,
        imageUrl1: e.target.result,
      }));
    };
    reader.readAsDataURL(selectedFile1);
  };

  const handleImage2Change = (event) => {
    const selectedFile2 = event.target.files[0];
    setImage2(selectedFile2);
    setFormInfo((prevData) => ({
      ...prevData,
      imageUrl2: selectedFile2,
    }));
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreviews((prevPreviews) => ({
        ...prevPreviews,
        imageUrl2: e.target.result,
      }));
    };
    reader.readAsDataURL(selectedFile2);
  };

  const handleImage3Change = (event) => {
    const selectedFile3 = event.target.files[0];
    setImage3(selectedFile3);
    setFormInfo((prevData) => ({
      ...prevData,
      imageUrl3: selectedFile3,
    }));
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreviews((prevPreviews) => ({
        ...prevPreviews,
        imageUrl3: e.target.result,
      }));
    };
    reader.readAsDataURL(selectedFile3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    for (const field in formInfo) {
      if (formInfo[field] === "") {
        newErrors[field] = "This field is required";
      } else {
        newErrors[field] = "";
      }
    }
    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) {
      return; // Exit if there are errors
    }

    const formData = new FormData();
    formData.append("displayPicUrl", displayPic);
    // formData.append("idCardUrl", idCardPic);
    formData.append("imageUrl1", image1);
    formData.append("imageUrl2", image2);
    formData.append("imageUrl3", image3);
    console.log(formInfo);
    try {
      const response = await axios.put(
        "https://beehouse-backend-api.onrender.com/profile/user",
        formInfo,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important: Set the correct Content-Type header
          },
        }
      );

      // console.log(response.data.message);
      // console.log(response.data.data);
      // setCookie("userdata", response.data.data.firstName);

      setInfo(response.data.message);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-black font-volkhorn ">
      {/* <div className=" px-5 py-5  flex">
        <FaForumbee className="text-yellow-500 mr-1 text-3xl" />
        <h1 className="text-yellow-500 text-3xl">BeeHouse</h1>
      </div> */}
      <SecNavbar />
      <div className="flex justify-center mt-10">
        <h1 className=" font-volkhorn text-4xl text-yellow-500 mt-12 text-bold">
          Create Account{" "}
        </h1>
      </div>
      <form
        action=""
        className=" px-5 text-white flex flex-col md:flex-row place-items-center md:place-items-start  justify-between "
        onSubmit={handleSubmit}
      >
        <div className="">
          
          <label htmlFor="" >
            First Name :
          </label>
          <br></br>

          <input
            className={`border px-3 border-yellow-500 outline-none bg-black mt-1 w-[300px] md:w-[300px] h-14 rounded rounded-lg ${
              errors.firstName ? "border-red-500" : ""
            }`}
            type="text"
            onChange={handleInputChange}
            value={formInfo.firstName}
            placeholder="First Name"
            name="firstName"
            id=""
          />
          {errors.firstName && (
            <div className="text-red-500 mt-2 text-xs">{errors.firstName}</div>
          )}
          

          <br></br>
          <br />
          <label htmlFor="">Last Name :</label>
          <br />
          <input
            className={`border px-3 border-yellow-500 outline-none bg-black  w-[300px] md:w-[300px] h-14 rounded rounded-lg ${
              errors.lastName ? "border-red-500" : ""
            }`}
            placeholder="Last Name"
            type="text"
            onChange={handleInputChange}
            name="lastName"
            value={formInfo.lastName}
            id=""
          />
          {errors.lastName && (
            <div className="text-red-500 text-xs mt-2">{errors.lastName}</div>
          )}

          <br></br>
          <br />

          <label className="" htmlFor="">
            Gender:
          </label>
          <br></br>

          <ul className="grid grid-cols-3 gap-x-5  mb-3 max-w-md ">
            <li className="relative">
              <input
                className="sr-only peer"
                type="radio"
                onChange={handleInputChange}
                value="male"
                name="gender"
                id="male"
              />
              <label
                className="flex p-5 bg-neutral-950 border border-gray-300 rounded-lg cursor-pointer focus:outline-none  peer-checked:ring-yellow-500 peer-checked:ring-4 peer-checked:border-transparent"
                htmlFor="male"
              >
                Male
              </label>
            </li>

            <li className="relative">
              <input
                className="sr-only peer"
                type="radio"
                onChange={handleInputChange}
                value="female"
                name="gender"
                id="female"
              />
              <label
                className="flex p-5 bg-neutral-950 border border-gray-300 rounded-lg cursor-pointer focus:outline-none  peer-checked:ring-yellow-500 peer-checked:ring-4 peer-checked:border-transparent"
                htmlFor="female"
              >
                Female
              </label>
            </li>
          </ul>

          {errors.gender && (
            <div className="text-red-500 text-xs mt-2">{errors.gender}</div>
          )}
          <br></br>

          <div className="mb-3">
            <label htmlFor="telephone" className="font-volkhorn">
              Telephone Number:
            </label>
            <br />
            <div className="flex">
              <div className="relative ">
                <select
                  className="border border-yellow-500 mr-3 outline-none pr-8 bg-black mt-1 h-14 rounded-l rounded-lg appearance-none"
                  id="countryCode"
                  name="countryCode"
                  value={formInfo.countryCode}
                  onChange={handleCountryCodeChange}
                >
                  
                  <option value="+233">+233(Gh)</option>{" "}
                  {/* You can add more country options here */}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <input
                className={`border outline-none px-3 border-yellow-500 bg-black mt-1 w-[220px] md:w-[200px] h-14 rounded-r rounded-lg ${
                  errors.telephone ? "border-red-500" : ""
                }`}
                type="tel"
                placeholder="Phone Number"
                name="telephone"
                value={formInfo.telephone}
                onChange={handleInputChange}
                id="telephone"
                pattern="[0-9]*"
                minLength="10"
                maxLength="15"
              />
            </div>
            {errors.telephone && (
              <div className="text-red-500 text-xs mt-2">{errors.telephone}</div>
            )}
          </div>

          <br></br>

          <label className="" htmlFor="">
            Date of Birth:
          </label>
          <br></br>
          <div className="flex mb-3">
            {errors.dob_day && <div className="text-red-500 text-xs">*</div>}
            <div className="mr-2">
              <select
                className="border outline-none px-3 border-yellow-500 bg-black  mt-1 w-20 h-14 rounded rounded-lg"
                type="date"
                placeholder="DD"
                name="dob_day"
                onChange={(e) => handleSelectChange("dob_day", e.target.value)}
              >
                <option className="h-40" value="">
                  DD
                </option>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>
            {errors.dob_month && <div className="text-red-500 text-xs">*</div>}
            <div className="mr-2">
              <select
                className="border outline-none px-3 border-yellow-500 bg-black  mt-1 w-20 h-14 rounded rounded-lg"
                type="date"
                placeholder="MM"
                name="dob_month"
                value={formInfo.dob_month}
                onChange={(e) =>
                  handleSelectChange("dob_month", e.target.value)
                }
              >
                <option value="">MM</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            {errors.dob_year && <div className="text-red-500 text-xs">*</div>}
            <div>
              <select
                className="border px-2 py-1 outline-none border-yellow-500 bg-black select-dropdown  mt-1 w-24 h-14 rounded rounded-lg"
                type="date"
                placeholder="YYYY"
                name="dob_year"
                value={formInfo.dob_year}
                onChange={(e) => handleSelectChange("dob_year", e.target.value)}
              >
                <option value="" className="h-14">
                  YYYY
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br></br>
          
          <div className="mb-2">
          <label htmlFor="" className="font-volkhorn">
            Height:
          </label>
          <br></br>
          <input
            className={`outline-none border px-3  border-yellow-500 bg-black mt-1 w-[300px] md:w-[300px] h-14 rounded rounded-lg ${
              errors.height ? "border-red-500" : ""
            }`}
            type="number"
            placeholder="Height (cm)"
            onChange={handleInputChange}
            name="height"
            value={formInfo.height}
            id=""
          />
          {errors.height && (
            <div className="text-red-500 text-xs mt-2">{errors.height}</div>
          )}
          </div>
          <br></br>
            <div className="mb-2">
          <label htmlFor="">Location:</label>
          <br></br>
          <input
            className={`outline-none border px-3 border-yellow-500 mb-3  bg-black mt-1 w-[300px] md:w-[300px] h-14 rounded rounded-lg ${
              errors.location ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Location"
            onChange={handleInputChange}
            value={formInfo.location}
            name="location"
            id=""
          />
          {errors.location && (
            <div className="text-red-500 text-xs">{errors.location}</div>
          )}
          </div>
          <br></br>

          <label htmlFor="">Complexion:</label>

          <br></br>
          <div className="mb-3">
          <ul className="grid grid-cols-3 gap-x-5 pb-3   max-w-md ">
            <li className="relative">
              <input
                className="sr-only peer"
                onChange={handleInputChange}
                type="radio"
                value="dark"
                name="complexion"
                id="dark"
              />
              <label
                className="flex p-5 bg-neutral-950 border border-gray-300 rounded-lg cursor-pointer focus:outline-none  peer-checked:ring-yellow-500 peer-checked:ring-4 peer-checked:border-transparent"
                htmlFor="dark"
              >
                Dark
              </label>
            </li>

            <li className="relative">
              <input
                className="sr-only peer"
                type="radio"
                value="fair"
                onChange={handleInputChange}
                name="complexion"
                id="fair"
              />
              <label
                className="flex p-5 bg-neutral-950 border border-gray-300 rounded-lg cursor-pointer focus:outline-none  peer-checked:ring-yellow-500 peer-checked:ring-4 peer-checked:border-transparent"
                htmlFor="fair"
              >
                Fair
              </label>
            </li>
          </ul>
          {errors.complexion && (
            <div className="text-red-500 text-xs pb-5">{errors.complexion}</div>
          )}
          </div>

          <label htmlFor="stature" className="font-volkhorn">
            Stature :
          </label>
          <ul className="grid grid-cols-3 gap-x-5   max-w-md ">
            <li className="relative">
              <input
                className="sr-only peer"
                onChange={handleInputChange}
                type="radio"
                value="slim"
                name="stature"
                id="slim"
              />
              <label
                className="flex p-5 bg-neutral-950 border border-gray-300 rounded-lg cursor-pointer focus:outline-none  peer-checked:ring-yellow-500 peer-checked:ring-4 peer-checked:border-transparent"
                htmlFor="slim"
              >
                Slim
              </label>
            </li>

            <li className="relative">
              <input
                className="sr-only peer"
                type="radio"
                value="Average"
                onChange={handleInputChange}
                name="stature"
                id="Average"
              />
              <label
                className="flex p-5 bg-neutral-950 border border-gray-300 rounded-lg cursor-pointer focus:outline-none  peer-checked:ring-yellow-500 peer-checked:ring-4 peer-checked:border-transparent"
                htmlFor="Average"
              >
                Average
              </label>
            </li>

            <li className="relative">
              <input
                className="sr-only peer"
                type="radio"
                value="chubby"
                onChange={handleInputChange}
                name="stature"
                id="chubby"
              />
              <label
                className="flex p-5 bg-neutral-950 border border-gray-300 rounded-lg cursor-pointer focus:outline-none  peer-checked:ring-yellow-500 peer-checked:ring-4 peer-checked:border-transparent"
                htmlFor="chubby"
              >
                Chubby
              </label>
            </li>
            
          </ul>
          {errors.stature && (
              <div className="text-red-500 mt-2 text-xs">{errors.stature}</div>
            )}
        </div>

        <br></br>
        <div className="flex flex-col ">
          {/* <label htmlFor="">Identification Card :</label>
          <br></br> */}
          {/* <div className="flex items-center">
            <label
              htmlFor="upload1"
              className="relative rounded-xl p-2 bg-neutral-550 border-dashed border-4  border-yellow-500 h-40 w-32 flex items-center justify-center cursor-pointer"
            >
              {imagePreviews.idCardUrl ? (
                <img
                  src={imagePreviews.idCardUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-3xl">+</span>
              )}{" "}
            </label>
            <input
              type="file"
              id="upload1"
              name="idCardUrl"
              className="hidden"
              onChange={handleIdCardChange}
            />
          </div> */}
          <br></br>
          <div className="">
          <label htmlFor="">Profile pic:</label>
          
          <div className="flex items-center">
            <label
              htmlFor="upload2"
              className={`relative rounded-xl  p-2 bg-neutral-950 border-dashed border-4 order border-yellow-500  h-32  sm:h-40 w-[100px] sm:w-32 flex items-center justify-center cursor-pointer ${
                errors.displayPicUrl ? "border-red-500" : ""
              }`}
            >
              {imagePreviews.displayPicUrl ? (
                <img
                  src={imagePreviews.displayPicUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-3xl">+</span>
              )}
            </label>
            <input
              type="file"
              id="upload2"
              className="hidden"
              onChange={handleDisplayPicChange}
              name="displayPicUrl"
            />
          </div>
          {errors.displayPicUrl && (
            <div className="text-red-500 mt-1 text-xs">{errors.displayPicUrl}</div>
          )}
          </div>

          <br />

          
          <label htmlFor="">Images Upload :</label>
          
          <div className="flex ">
            <div className="flex items-center mr-5">
              <label
                htmlFor="upload3"
                className={`relative rounded-xl p-2 h-32  sm:h-40 w-[100px] sm:w-32 bg-neutral-950 border-dashed border-4 ${
                  errors.imageUrl1 ? "border-red-500" : "border-yellow-500"
                }  w-32 flex items-center justify-center cursor-pointer`}
              >
                {imagePreviews.imageUrl1 ? (
                  <img
                    src={imagePreviews.imageUrl1}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-3xl">+</span>
                )}
              </label>
              <input
                type="file"
                id="upload3"
                onChange={handleImage1Change}
                className="hidden"
                name="imageUrl1"
              />
            </div>

            <div className="flex items-center mr-5">
              <label
                htmlFor="upload4"
                className={`relative rounded-xl p-2 bg-neutral-950 border-dashed border-4 border-yellow-500  h-32  sm:h-40 w-[100px] sm:w-32  flex items-center justify-center cursor-pointer ${
                  errors.imageUrl1 ? "border-red-500" : ""
                }`}
              >
                {imagePreviews.imageUrl2 ? (
                  <img
                    src={imagePreviews.imageUrl2}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-3xl">+</span>
                )}
              </label>
              <input
                type="file"
                id="upload4"
                className="hidden"
                onChange={handleImage2Change}
                name="imageUrl1"
              />
            </div>

            <div className="flex items-center">
              <label
                htmlFor="upload5"
                className={`relative rounded-xl p-2 bg-neutral-950 border-dashed border-4 border-yellow-500 h-32  sm:h-40 w-[100px] sm:w-32 flex items-center justify-center cursor-pointer ${
                  errors.imageUrl3 ? "border-red-500" : ""
                }`}
              >
                {imagePreviews.imageUrl3 ? (
                  <img
                    src={imagePreviews.imageUrl3}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-3xl">+</span>
                )}{" "}
              </label>
              <input
                type="file"
                id="upload5"
                className="hidden"
                onChange={handleImage3Change}
                name="imageUrl3"
              />
            </div>
          </div>
          <div className="flex mt-2 justify-around">
            {errors.imageUrl1 && (
              <div className="text-red-500 text-xs">required</div>
            )}
            {errors.imageUrl2 && (
              <div className="text-red-500 text-xs">required</div>
            )}
            {errors.imageUrl3 && (
              <div className="text-red-500 text-xs">required</div>
            )}
          </div>
        </div>
      </form>

      <div className="flex justify-center pb-10">
        <button
          onClick={handleSubmit}
          className="mr-5 mt-5 bg-yellow-500  border-2 border-black h-[50px] rounded-lg w-[150px]"
        >
          Continue
        </button>
      </div>

      <div className="flex text-white text-xl hover:text-blue-500 justify-center pb-5">
        <h1>{info}</h1>
      </div>
    </div>
  );
}

export default ModelOnboardingPage;

import { useContext, useEffect, useRef, useState } from "react";
import { BACKEND_URL, ThemeContext, UserContext } from "../../../constants/Constants";
import axios from "axios";
import Cookies from "js-cookie";
import { MdPublish } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import Login from "../../Login/Login";
import PropTypes from "prop-types";

const PortfolioItem = ({ mode, closeModalAndReloadData }) => {
  const theme = useContext(ThemeContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [mainImage, setMainImage] = useState(null);

  const [errors, setErrors] = useState({
    titleError: "",
    descriptionError: "",
    link: "",
  });
  
  const userContext = useContext(UserContext)

  const params = useParams();

  useEffect(() => {
    if (mode == "edit") {
      axios
        .get(`${BACKEND_URL}/api/v1/portfolio/items/${params.id}`)
        .then((res) => {
          if (res.status == 200) {
            setTitle(res.data.message.title);
            setDescription(res.data.message.description);
            setLink(res.data.message.link);
            setMainImageUrl(res.data.message.main_image_source);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const saveItem = () => {
    console.log(link, description, title, mainImage)
    let hasErrors = false;
    let formErrors = { titleError: "", descriptionError: "", linkError: "" };

    if (title.trim() == "") {
      hasErrors = true;
      formErrors = { ...formErrors, titleError: "title should not be null" };
    }

    if (description.trim() == "") {
      hasErrors = true;
      formErrors = {
        ...formErrors,
        descriptionError: "description should not be null",
      };
    }

    if (link.trim() == "") {
      hasErrors = true;
      formErrors = { ...formErrors, linkError: "link should not be null" };
    }

    if (hasErrors) {
      setErrors(formErrors);
    } else if (Cookies.get("token") == null) {
      userContext.setShowLoginForm(true);
    } else {
        console.log("sending")
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("link", link);
      formData.append("file", mainImage);

      if (mode == "new") {
        console.log("new")
        axios
          .post(`${BACKEND_URL}/api/v1/portfolio/items/new`, formData, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          })
          .then((res) => {
            console.log(res)
            if (res.status == 201) {
              console.log("success")

              closeModalAndReloadData()
              navigate("/portfolio/home");
            }
          })
          .catch((err) => {
            if (err.status == 401) {
              userContext.setShowLoginForm(true);
            }
          });
      } else {
        console.log("update")
        axios
          .put(
            `${BACKEND_URL}/api/v1/portfolio/items/update/${params.id}`,
            formData,
            { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
          )
          .then((res) => {
            if (res.status == 201) {
              navigate("/portfolio/home#portfolio");
            }
          })
          .catch((err) => {
            if (err.status == 401) {
              userContext.setShowLoginForm(true);
            }
          });
      }
    }
  };

  const navigate = useNavigate();

  const [mainImageUrl, setMainImageUrl] = useState("");

  const handleMainImageChange = () => {
    setMainImage(event.target.files[0]);
    setMainImageUrl(window.URL.createObjectURL(event.target.files[0]));
  };

  const mainImageRef = useRef();

  return (
    <div className="fixed z-50 top-[50%] bg-gray-900 left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-8 min-[1400px]:px-40 max-[1000px]:px-10 min-[1000px]:px-16 py-10">
      
      <Login closeLoginForm={() => userContext.setShowLoginForm(false)} navigateTo="" showLoginForm={userContext.showLoginForm} />

      <div className="flex flex-col gap-2">
        <label htmlFor="postTitle" className="text-lg">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={` 
            pl-2 bg-transparent outline-none w-full h-12 border-2 
            rounded-md text-lg ${
              theme.theme == "dark" ? "border-teal-500" : "border-indigo-500"
            }`}
          onChange={() => setTitle(event.target.value)}
          defaultValue={title}
        />
        <label className="text-sm text-red-500">{errors.titleError}</label>
      </div>

      <div className="flex items-center justify-center">
        <div
          className={`relative rounded-md bg-gray-400/10 min-h-48 min-w-[400px] max-h-[400px] max-w-[400px] p-2
              hover:bg-gray-400/20 cursor-pointer border-dashed border-2
              ${
                theme.theme == "dark" ? "border-teal-500" : "border-indigo-500"
              } flex items-center justify-center`}
          onClick={() => mainImageRef.current.click()}
        >
          {mainImageUrl != "" ? (
            <img
              src={mainImageUrl}
              className="rounded-md object-contain"
              alt="test"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-3">
              <div
                className={` border-2 ${
                  theme.theme == "dark"
                    ? "border-teal-500"
                    : "border-indigo-500"
                } p-4 rounded-full`}
              >
                <IoCloudUploadOutline className="text-4xl" />
              </div>

              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Project Snapshot</span>
              </p>
            </div>
          )}

          <input
            type="file"
            className="hidden"
            ref={mainImageRef}
            onChange={handleMainImageChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="text-lg">
           Description
        </label>
        <textarea
          id="description"
          name="description"
          className={` 
            pl-2 py-2 bg-transparent outline-none w-full h-12 border-2 
            rounded-md text-lg ${
              theme.theme == "dark" ? "border-teal-500" : "border-indigo-500"
            }`}
          onChange={() => setDescription(event.target.value)}
          defaultValue={description}
        />

        <label className="text-sm text-red-500">
          {errors.descriptionError}
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="link" className="text-lg">
           Link
        </label>
        <textarea
          id="link"
          name="link"
          className={` 
            pl-2 py-2 bg-transparent outline-none w-full h-12 border-2 
            rounded-md text-lg ${
              theme.theme == "dark" ? "border-teal-500" : "border-indigo-500"
            }`}
          onChange={() => setLink(event.target.value)}
          defaultValue={link}
        />

        <label className="text-sm text-red-500">
          {errors.linkError}
        </label>
      </div>

      <div className="">

      <div className="flex gap-2 justify-center items-center">
        <button
          className={`disabled:bg-gray-400 disabled:cursor-default w-[150px] h-[40px] btn flex justify-center items-center gap-1 ${
            theme.theme == "dark" ? "btn-dark-theme" : "btn-light-theme"
          }`}
          onClick={saveItem}
        >
      
           <span>SAVE</span>
           <MdPublish className="text-xl" />
          
          
        </button>

        <button 
className={` w-[150px] h-[40px] btn flex justify-center items-center gap-1 ${theme.theme == "dark" ? "btn-dark-theme" : "btn-light-theme"}`}
onClick={() => {closeModal()}}>
            CANCEL <span className="material-symbols-rounded">close</span>
          </button>         

      </div>


      </div>
    </div>
  );
};

export default PortfolioItem;

PortfolioItem.propTypes = {
  mode: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

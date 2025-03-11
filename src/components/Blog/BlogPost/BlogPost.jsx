import { useContext, useEffect, useRef, useState } from "react";
import { BACKEND_URL, ThemeContext, UserContext } from "../../../constants/Constants";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import axios from "axios";
import Cookies from "js-cookie";
import { MdPublish } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import Login from "../../Login/Login";
import PropTypes from "prop-types";

const BlogPost = ({ mode }) => {
  const theme = useContext(ThemeContext);

  const [isLoading, setLoading] = useState(mode == "edit" ? true : false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editorText, setEditorText] = useState("");
  const [errors, setErrors] = useState({
    titleError: "",
    descriptionError: "",
    editorError: "",
  });
  const [mainImage, setMainImage] = useState(null);

  const [isPublishing, setIsPublishing] = useState(false);

  const userContext = useContext(UserContext)

  const params = useParams();

  useEffect(() => {
    if (mode == "edit") {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/posts/${params.id}`)
        .then((res) => {
          if (res.status == 200) {
            setTitle(res.data.message.title);
            setDescription(res.data.message.description);
            setEditorText(res.data.message.post_contents);
            setMainImageUrl(res.data.message.main_image_source);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onRichTextEditorChange = (val) => {
    setEditorText(val);
  };

  const savePost = () => {
    let hasErrors = false;
    let formErrors = { titleError: "", descriptionError: "", editorError: "" };

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

    if (editorText.trim() == "") {
      hasErrors = true;
      formErrors = { ...formErrors, editorError: "editor should not be null" };
    }

    if (hasErrors) {
      setErrors(formErrors);
    } else if (Cookies.get("token") == null) {
      userContext.setShowLoginForm(true);
    } else {
      setIsPublishing(true);
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("post_contents", editorText);
      formData.append("file", mainImage);

      if (mode == "new") {
        axios
          .post(`${BACKEND_URL}/api/v1/blog/posts/new`, formData, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          })
          .then((res) => {
            if (res.status == 201) {
              setIsPublishing(false);
              navigate("/portfolio/blog");
            }
          })
          .catch((err) => {
            if (err.status == 401) {
              setIsPublishing(false);
              userContext.setShowLoginForm(true);
            }
          });
      } else {
        axios
          .put(
            `${BACKEND_URL}/api/v1/blog/posts/update/${params.id}`,
            formData,
            { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
          )
          .then((res) => {
            if (res.status == 201) {
              setIsPublishing(false);
              navigate("/portfolio/blog");
            }
          })
          .catch((err) => {
            if (err.status == 401) {
              setIsPublishing(false);
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
    <div className="flex flex-col gap-8 min-[1400px]:px-40 max-[1000px]:px-10 min-[1000px]:px-16 py-10">
      
      <Login closeLoginForm={() => userContext.setShowLoginForm(false)} navigateTo="" showLoginForm={userContext.showLoginForm} />

      <div className="flex flex-col gap-2">
        <label htmlFor="postTitle" className="text-lg">
          Post Title
        </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
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
                <span className="font-semibold">Main Post Image</span>
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
        <label htmlFor="postDescription" className="text-lg">
          Post Description
        </label>
        <textarea
          id="postDescription"
          name="postDescription"
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
        <label className="text-lg">Post Contents</label>

        {
          isLoading && mode == "edit" ? (
            <span className="material-symbols-rounded text-4xl animate-spin">sync</span>
          ) : (
            <RichTextEditor
              onRichTextEditorChange={onRichTextEditorChange}
              post_contents={editorText}
            />
          )
        }

        <label className="text-sm text-red-500">{errors.editorError}</label>
      </div>

      <div className="">

      <div className="flex gap-2 justify-center items-center">
        <button
          disabled={isPublishing}
          className={`disabled:bg-gray-400 disabled:cursor-default w-[150px] h-[40px] btn flex justify-center items-center gap-1 ${
            theme.theme == "dark" ? "btn-dark-theme" : "btn-light-theme"
          }`}
          onClick={savePost}
        >
      
           <span>{mode == "edit" ? 'RE-PUBLISH' : 'PUBLISH'}</span>
           <MdPublish className="text-xl" />
           {isPublishing ? <span className="material-symbols-rounded animate-spin">sync</span> : null}
          
        </button>

{mode == "edit" ? <button 
className={` w-[150px] h-[40px] btn flex justify-center items-center gap-1 ${theme.theme == "dark" ? "btn-dark-theme" : "btn-light-theme"}`}
onClick={() => {navigate("/portfolio/blog")}}>
            CANCEL <span className="material-symbols-rounded">close</span>
          </button>
          : null}
          

      </div>


      </div>
    </div>
  );
};

export default BlogPost;

BlogPost.propTypes = {
  mode: PropTypes.string.isRequired,
};

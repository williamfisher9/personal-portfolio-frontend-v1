import { useContext, useState } from "react";
import { BACKEND_URL, ThemeContext } from "../../constants/Constants";
import axios from "axios";

const Contact = () => {
  const theme = useContext(ThemeContext);

  const [mail, setMail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState({nameError: "", mailError: "", messageError: "", responseError: ""})

  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const handleNameChange = () => {
    setName(event.target.value)
  }

  const handleMailChange = () => {
    setMail(event.target.value)
  }

  const handleMessageChange = () => {
    setMessage(event.target.value)
  }


  const handleEnterButton = (event) => {
    if(event.key == "Enter")
      submitEmail()
  }

  const submitEmail = () => {
    let hasErrors = false

    let newErrors = {nameError: "", mailError: "", messageError: ""}

    if(name.trim() == ""){
      hasErrors = true;
      newErrors.nameError = "Name field is required"
    }

    if(mail.trim() == ""){
      hasErrors = true;
      newErrors.mailError = "Email address field is required"
    }

    if(message.trim() == ""){
      hasErrors = true;
      newErrors.messageError = "Message field is required"
    }

    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(mail.trim() != "" && !re.test(mail)){
      hasErrors = true;
      newErrors.mailError = "Improper email address format"
    }

    if(!hasErrors){
      setIsSendingEmail(true)
      axios.post(`${BACKEND_URL}/api/v1/mail/send`, {name, mail, message})
    .then((res) => {
      if(res.status==200){
        setName("")
        setMessage("")
        setMail("")
        setErrors({nameError: "", mailError: "", messageError: "", responseError: ""})
        setIsSendingEmail(false)
      }
    })
    .catch((err) => {
      console.log(err.message)
      setErrors({nameError: "", mailError: "", messageError: "", responseError: err.message})
      setIsSendingEmail(false)
    })
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <div className="">

      <div className="mt-8">
        <a id="portfolio" className="text-[40px] font-bold">
          Contact Me
        </a>
      </div>

      <div className="flex max-[1000px]:flex-col justify-around items-center max-[1000px]:gap-8 mt-4">
        <div id="contact" className="contact-info">
          <p className="text-xl">
            Contact me today to collaborate and discuss amazing projects and
            ideas.
          </p>
        </div>

        <div className="contact-form flex flex-col w-[50%] max-[1000px]:w-[70%] gap-4">
          <div className="flex flex-col">
          <input
            type="text"
            placeholder="name"
            className={`h-10 border-none outline-none rounded-md pl-2 placeholder:uppercase
                    ${
                      theme.theme == "dark" ? "bg-zinc-200/15" : "bg-indigo-200"
                    }`}
                    onChange={handleNameChange}
                    value={name}
                    onKeyDown={handleEnterButton}
          />
          <label className="text-red-500">{errors.nameError}</label>
          </div>

          <div className="flex flex-col">
          <input
            type="text"
            placeholder="email"
            className={`h-10 border-none outline-none rounded-md pl-2 placeholder:uppercase ${
              theme.theme == "dark" ? "bg-zinc-200/15" : "bg-indigo-200"
            }`}
            onChange={handleMailChange}
            value={mail}
            onKeyDown={handleEnterButton}
          />
          <label className="text-red-500">{errors.mailError}</label>
          </div>

          <div className="flex flex-col">
          <textarea
            rows="5"
            cols="50"
            placeholder="message"
            className={`h-10 border-none outline-none rounded-md pl-2 py-2 placeholder:uppercase ${
              theme.theme == "dark" ? "bg-zinc-200/15" : "bg-indigo-200"
            }`}
            onChange={handleMessageChange}
            value={message}
            onKeyDown={handleEnterButton}
          />
          <label className="text-red-500">{errors.messageError}</label>
          </div>


            <button disabled={isSendingEmail} className={`disabled:bg-gray-400 disabled:cursor-default flex items-center justify-center gap-2 px-4 py-2 uppercase ${theme.theme == "dark" ? "btn-dark-theme" : "btn-light-theme"}`} onClick={submitEmail}>
               {isSendingEmail ? <><span>SUBMIT</span><span className="material-symbols-rounded animate-spin">sync</span></> : <span>SUBMIT</span>}
            </button>

            <label className="text-red-500 text-center text-lg">{errors.responseError}</label>

        </div>
      </div>
    </div>
  );
};

export default Contact;

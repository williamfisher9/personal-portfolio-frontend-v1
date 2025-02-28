import { useContext } from "react";
import { ThemeContext } from "../../constants/Constants";

const IntroductoryMessage = () => {
  const theme = useContext(ThemeContext)

  return (
    <div>
      <div className="mt-8">
        <a id="about" className="text-[40px] font-bold">
          About Me
        </a>
      </div>

      <div className={`rounded-md p-8 ${theme.theme == 'dark' ? 'bg-teal-500 text-black' : 'bg-indigo-500 text-white'}`}>
        <p>
          Over 10 years of experience as a System Implementation and Support Engineer Dedicated Full Stack Developer with [number of years] years of
          experience in [specific programming languages or frameworks]. Seeking
          to leverage my expertise in [specific areas of full stack development]
          to drive [specific outcomes] at [Company Name]. Committed to
          delivering high-quality results in fast-paced environments, and eager
          to contribute innovative solutions that align with the company's
          technological vision.
        </p>
      </div>
    </div>
  );
};

export default IntroductoryMessage;

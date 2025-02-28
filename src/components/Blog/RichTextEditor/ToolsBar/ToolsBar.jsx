import { BiBold, BiItalic, BiAlignLeft, BiAlignMiddle, BiAlignRight, 
    BiCodeAlt, BiCodeCurly, BiImageAlt, BiListOl, BiListUl, 
    BiStrikethrough, BiUnderline, 
    BiAlignJustify} from "react-icons/bi"

import './ToolsBar.css'
import { useContext, useState } from "react"
import { ThemeContext } from "../../../../constants/Constants"
import ToolButton from "./ToolButton/ToolButton"
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs"
import ImageSelector from "../ImageSelector/ImageSelector"
import { GoHorizontalRule } from "react-icons/go"
import { MdOutlineInsertPageBreak } from "react-icons/md"

const ToolsBar = ({editor}) => {
    const theme = useContext(ThemeContext)
    const [showImageSelector, setShowImageSelector] = useState(false)

    const tools = [
        { task: "h1", icon: <BsTypeH1 className="toolbar-icon" /> },
        { task: "h2", icon: <BsTypeH2 className="toolbar-icon" /> },
        { task: "h3", icon: <BsTypeH3 className="toolbar-icon" /> },
      { task: "bold", icon: <BiBold className="toolbar-icon" /> },
      { task: "italic", icon: <BiItalic className="toolbar-icon" /> },
      { task: "strike", icon: <BiStrikethrough className="toolbar-icon" /> },
      { task: "underline", icon: <BiUnderline className="toolbar-icon" /> },
      { task: "codealt", icon: <BiCodeAlt className="toolbar-icon" /> },
      { task: "codecurly", icon: <BiCodeCurly className="toolbar-icon" /> },
      { task: "image", icon: <BiImageAlt className="toolbar-icon" /> },
      { task: "orderedList", icon: <BiListOl className="toolbar-icon" /> },
      { task: "bulletList", icon: <BiListUl className="toolbar-icon" /> },
      { task: "left", icon: <BiAlignLeft className="toolbar-icon" /> },
      { task: "center", icon: <BiAlignMiddle className="toolbar-icon" /> },
      { task: "right", icon: <BiAlignRight className="toolbar-icon" /> },
      { task: "justify", icon: <BiAlignJustify className="toolbar-icon" /> },
      { task: "hrule", icon: <GoHorizontalRule className="toolbar-icon" /> },

      { task: "hardbreak", icon: <MdOutlineInsertPageBreak className="toolbar-icon" /> },
      
      { task: "color", icon: <input type="color" className="h-7 w-10 block bg-transparent cursor-pointer disabled:opacity-50 disabled:pointer-events-none" 
                                  onChange={(event) => editor.chain().focus().setColor(event.target.value).run()} 
                                  defaultValue={editor.getAttributes('textStyle').color} />},

      { task: "fontFamily", icon: <select   
                                          defaultValue={editor.getAttributes('textStyle').fontFamily} 
                                          className={`${theme.theme == 'dark' ? 'border-teal-500' : 'border-indigo-500'} 
                                          outline-none border-2  w-32 ml-4 bg-transparent rounded-sm`}
                                          onChange={(event) => editor.chain().focus().setFontFamily(event.target.value).run()}>
                                    <option>Inter</option>
                                    <option>cursive</option>
                                    <option>Comic Sans MS, Comic Sans</option>
                                    <option>serif</option>
                                    <option>sans-serif</option>
                                    <option>monospace</option>
                                    <option>Exo 2</option>
                                  </select>},
    ];

    






    const handleOnClick = (task) => {
      switch (task) {
        case "h1":
          return editor.chain().focus().setHeading({ level: 1 }).run();
          case "h2":
          return editor?.chain().focus().toggleHeading({level: 2}).run();
          case "h3":
          return editor?.chain().focus().toggleHeading({level: 3}).run();
        case "bold":
          return editor?.chain().focus().toggleBold().run();
        case "italic":
          return editor?.chain().focus().toggleItalic().run();
        case "strike":
          return editor?.chain().focus().toggleStrike().run();
        case "underline":
          return editor?.chain().focus().toggleUnderline().run();
        case "codealt":
          return editor?.chain().focus().toggleCode().run();
        case "codecurly":
          return editor?.chain().focus().toggleCodeBlock().run();
        case "imagealt":
          return editor?.chain().focus().toggleItalic().run();
        case "orderedList":
          return editor.chain().focus().toggleOrderedList().run()
        case "bulletList":
          return editor.chain().focus().toggleBulletList().run()
        case "right":
          return editor?.chain().focus().setTextAlign('right').run();
        case "center":
          return editor?.chain().focus().setTextAlign('center').run();
        case "left":
          return editor?.chain().focus().setTextAlign('left').run();
        case "justify":
          return editor?.chain().focus().setTextAlign('justify').run();
        case "image":
          return setShowImageSelector(true);
        case "hrule":
          return editor.commands.setHorizontalRule()
        case "hardbreak":
          return editor.commands.setHardBreak()
       
      }
    };

    const storeInsertedFile = (source) => {
      editor.commands.setImage({
        src: source,
        alt: "alt text",
        title: 'An example',
      })

    }

    const closeImageSelector = () => {
      setShowImageSelector(false)
    }

    return <div className="">
        <ImageSelector visible={showImageSelector} storeInsertedFile={storeInsertedFile} closeImageSelector={closeImageSelector}/>
        
        <div className={`grid grid-cols-[repeat(auto-fill,_minmax(20px,_1fr))] border-2 rounded-t-md py-4 gap-4 px-4 ${theme.theme == 'dark' ? 'border-teal-500' : 'border-indigo-500'}`} >
            {
                tools.map(({task, icon}) => {
                    return <ToolButton key={task} active={editor?.isActive(task) || editor?.isActive({textAlign: task})} onClick={() => handleOnClick(task)}>{icon}</ToolButton>
                })
            }
        </div>
    </div>
}

export default ToolsBar
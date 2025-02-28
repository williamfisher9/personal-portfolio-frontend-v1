"use client";
import { EditorContent } from '@tiptap/react'

import ToolsBar from './ToolsBar/ToolsBar';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../../constants/Constants';


import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';

import StarterKit from '@tiptap/starter-kit';
import { useEditor } from "@tiptap/react";
import ImageResize from 'tiptap-extension-resize-image';
import HorizontalRule from '@tiptap/extension-horizontal-rule'

const RichTextEditor = ({onRichTextEditorChange, post_contents}) => {
  const theme = useContext(ThemeContext)

  useEffect(() => {
    //editor.commands.setContent(post_contents);
    editor.commands.setContent(post_contents, false, {
      preserveWhitespace: "full",
    })
  }, [])

  const extensions = [
    StarterKit.configure({heading: {levels: [1, 2, 3]}}), 
    Underline,
    TextAlign.configure({types: ['heading', 'paragraph'], alignments: ['left', 'right', 'center', 'justify'], defaultAlignment: 'left'}), 
    Placeholder.configure({placeholder: "Write something..."}),
    Image.configure({
      inline: true,
    }),
    TextStyle.configure({
      color:"#000000",
      fontFamily: "cursize"
    }),
    Color,
    
    FontFamily,
    
    ImageResize,
    HorizontalRule
  ]

  FontFamily.extend({
    addGlobalAttributes() {
      return [
        {
          types: ["textStyle"],
          attributes: {
            fontFamily: {
              default: 'cursive',
              parseHTML: element => element.style.fontFamily,
              renderHTML: attributes => {
                if (!attributes.fontFamily) {
                  return {}
                }
  
                return {
                  style: `font-family: ${attributes.fontFamily}`,
                }
              },
            },
          },
        },
      ]
    }
  })

  Color.extend({
    addGlobalAttributes() {
      return [
          {
              types: ["heading", "paragraph"],
              attributes: {
                  color: {
                      default: `${theme.theme == 'dark' ? "#ffffff" : "#000000"}`,
                      parseHTML: (element) => element.style.color?.replace(/['"]+/g, ""),
                      renderHTML: (attributes) => {
                          if (!attributes.color) {
                              return {};
                          }

                          return {
                              style: `color: ${attributes.color}`,
                          };
                      },
                  },
              },
          },
      ];
    },
  })

  const editor = useEditor({
    parseOptions: {
      preserveWhitespace: 'full',
    },
    extensions,
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none rounded-b-md border-2 ${theme.theme == 'dark' ? 'border-teal-500' : 'border-indigo-500'} p-4`,
      },
    }
  })


  editor.on('update', ({ editor }) => {
    onRichTextEditorChange(editor.getHTML())
  })


  return <div className={`flex flex-col ${theme.theme == 'dark' ? 'text-teal-500' : 'text-indigo-500'}`}>
    <ToolsBar editor={editor} />
    <EditorContent editor={editor} />
  </div>
}

export default RichTextEditor
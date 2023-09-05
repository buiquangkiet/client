import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useRef } from 'react';
import { memo } from 'react';

const MarkdownEditor = ({ label, field, value, onSubmit }) => {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            onSubmit(field, editorRef.current.getContent());
        }
    };
    return (
        <div>
            <span className="my-5 mx-2 font-semibold ">
                {label}
            </span>
            <Editor
                apiKey='gefnp9af6p2ktnlx6np98fqqwzj1y1nvvzx6y3axlmmu9vrq'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={value}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onChange={log}
            />
        </div>
    )
}

export default memo(MarkdownEditor)

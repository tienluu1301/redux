import { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import styles from './MyCkEditor.module.scss'

const MyCkEditor = ({ label, error, editorRef = {}, ...passProps }) => {
    // const [textValue, setTextValue] = useState("")

    return (
        <div className={styles.wrapper}>
            <label>{label}</label>
            <div className={styles.editorWrapper}>
                <CKEditor
                    editor={ClassicEditor}
                    // toolbar={[ ... , 'insertImage' ]} 
                    // data={textValue}

                    // onChange={(event, editor) => {
                    //     const data = editor.getData();
                    //     setTextValue(data);
                    // }}
                    // {...formState}
                    // data="<p>Hello from CKEditor 5!</p>"
                    onReady={editor => {
                        editorRef.current = editor
                        // You can store the "editor" and use when it is needed.
                    }}
                    // onChange={(event, editor) => {
                    //     const data = editor.getData();
                    //     console.log({ event, editor, data });
                    // }}
                    // onBlur={(event, editor) => {
                    //     console.log('Blur.', editor);
                    // }}
                    // onFocus={(event, editor) => {
                    //     console.log('Focus.', editor);
                    // }}

                    {...passProps}
                />
            </div>
            {error &&
                <p className={styles.errorMess}>
                    <ReportProblemIcon fontSize='inherit' color='inherit' />
                    {error}
                </p>}
        </div>
    )
}



export default MyCkEditor
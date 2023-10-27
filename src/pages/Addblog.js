// import React, { useState } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// const Addblog = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [type, setType] = useState("unpaid");
//   const [categories, setCategories] = useState([]);

//   const [editor, setEditor] = useState(null);

//   const handleReady = (editor) => {
//     // You can store the "editor" and use when it is needed.
//     setEditor(editor);
//     console.log("Editor is ready to use!", editor);
//   };

//   const handleChange = (event, editor) => {
//     const data = editor.getData();
//     console.log({ event, editor, data });
//   };

//   const handleBlur = (event, editor) => {
//     console.log("Blur.", editor);
//   };

//   const handleFocus = (event, editor) => {
//     console.log("Focus.", editor);
//   };

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setDescription(data);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission, e.g., send data to the server
//     console.log({ title, description, type, categories });
//   };

//   return (
//     <div>
//       <h2>Create a New Blog</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </label>
//         <br />
//         {/* <label> */}

//         <CKEditor
//           editor={ClassicEditor}
//           data="<p>Hello from CKEditor&nbsp;5!</p>"
//           onReady={handleReady}
//           onChange={handleChange}
//           onBlur={handleBlur}
//           onFocus={handleFocus}
//         />
//         {/* </label> */}
//         <br />
//         <label>
//           Type:
//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option value="unpaid">Unpaid</option>
//             <option value="paid">Paid</option>
//           </select>
//         </label>
//         <br />
//         <label>
//           Categories:
//           <input
//             type="text"
//             value={categories}
//             onChange={(e) => setCategories(e.target.value.split(","))}
//           />
//         </label>
//         <br />
//         <button type="submit">Create Blog</button>
//       </form>
//     </div>
//   );
// };

// export default Addblog;



// ==========================================================================


import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { InputText } from 'primereact/inputtext';

const Addblog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("unpaid");
  const [categories, setCategories] = useState([]);

  const [editor, setEditor] = useState(null);

  const handleReady = (editor) => {
    // You can store the "editor" and use when it is needed.
    setEditor(editor);
    console.log("Editor is ready to use!", editor);
  };

  const handleChange = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
  };

  const handleBlur = (event, editor) => {
    console.log("Blur.", editor);
  };

  const handleFocus = (event, editor) => {
    console.log("Focus.", editor);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log({ title, description, type, categories });
  };

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
      <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Question
                    </label>
                    <InputText id="name" 
                    // value={product.question} 
                    // onChange={(e) => onInputChange(e, 'name')} 
                     disabled/>
                    {/* {submitted && !product.employee_name && <small className="p-error">question is required.</small>} */}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Answer
                    </label>
                    {/* <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} /> */}
                    <CKEditor
        editor={ClassicEditor}
        // data={product.answer}
        onChange={handleEditorChange}
      />
                </div>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
        </label>
        <br />
        <label>
          Categories:
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value.split(","))}
          />
        </label>
        <br />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default Addblog;


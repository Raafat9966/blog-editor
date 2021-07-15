import React, { useState } from "react";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css"; // Add css for snow theme

const Editor = () => {
	const theme = "snow";

	const modules = {
		toolbar: {
			container: "#toolbar",
			handlers: {
				"code-block": function () {
					let editor = document.querySelector(".ql-editor");
					// let firstElement = document.createElement("p");
					// let list = document.createElement("ul");
					let node = document.createElement("ul");
					node.innerHTML = "<li></li><li></li>";
					// list.appendChild(node);

					// firstElement.appendChild(list);
					editor.appendChild(node);
					// editor.appendChild(node);

					console.log(editor);
				},
			},
		},
		clipboard: {
			matchVisual: false,
		},
	};

	const placeholder = "Compose an epic...";

	const formats = ["size", "bold", "script"];

	const { quill, quillRef } = useQuill({
		theme,
		modules,
		formats,
		placeholder,
	});

	const [content, setContent] = useState("");

	React.useEffect(() => {
		if (quill) {
			quill.on("text-change", () => {
				setContent(quill.root.innerHTML);
			});
		}
	}, [quill]);

	const submitHandler = (e) => {};

	return (
		<div style={{ width: 400, height: 400 }}>
			<div ref={quillRef} />
			<div id="toolbar">
				<select className="ql-size">
					<option value="small" />
					<option selected />
					<option value="large" />
					<option value="huge" />
				</select>
				<button className="ql-bold" />
				<button className="ql-code-block" />
				<button className="ql-script" value="sub" />
				<button className="ql-script" value="super" />
			</div>
			<div id="editor" />

			<form onSubmit={submitHandler}>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Editor;

import React, { useState, useEffect, useRef } from "react";
import "./PostCreationPage.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Add styling
import axios from "axios";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // Formatting buttons
  ["blockquote", "code-block"],
  ["link", "formula"],

  [{ header: 1 }, { header: 2 }], // Header buttons
  [{ list: "ordered" }, { list: "bullet" }], // List types
  [{ script: "sub" }, { script: "super" }], // Super/sub script
  [{ indent: "-1" }, { indent: "+1" }], // Indent
  [{ direction: "rtl" }], // Text direction

  [{ size: ["small", false, "large", "huge"] }], // Size options
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header levels

  [{ color: [] }, { background: [] }], // Color options
  [{ font: [] }],
  [{ align: [] }], // Text alignment

  ["clean"], // Clear formatting
];

const PostCreationPage = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Quill editor reference using useRef
  const quillRef = useRef<ReactQuill | null>(null);

  const handleContentChange = (value: string) => {
    setBody(value);
  };

  // Function to automatically add 'https://' to links without protocol
  const fixLinks = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const links = editor.root.querySelectorAll("a");

      links.forEach((link: HTMLAnchorElement) => {
        const href = link.getAttribute("href") || "";
        if (!href.startsWith("http://") && !href.startsWith("https://")) {
          link.setAttribute("href", "https://" + href);
        }
      });
    }
  };

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      // Listen to text changes and fix links
      editor.on("text-change", fixLinks);
    }
    // Clean up the event listener on unmount
    return () => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        editor.off("text-change", fixLinks);
      }
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !body) {
      setErrorMessage("All fields are required!");
      return;
    }

    setErrorMessage(""); // Clear error if inputs are valid

    try {
      setIsSubmitting(true);
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://35.175.254.24:4000/api/forums",
        {
          title,
          body,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the headers
          },
        }
      );
      setSuccessMessage("Post successfully created!");
      setTitle("");
      setBody(""); // Reset the content after successful post creation
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "An error occurred.");
      } else {
        setErrorMessage("An error occurred while creating the post.");
      }
    }
  };

  return (
    <div className="PC-container-fluid">
      <div className="firstrow-row">
        <div className="title-container-fluid">
          <h1 className="PC-header">Create New Post</h1>
        </div>
      </div>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="secondrow-row">
          <div className="postTitle-container-fluid">
            <input
              className="title-input"
              type="input"
              placeholder="Enter title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="textrow-row">
          <div className="text-container-fluid">
            <ReactQuill
              className="ReactQuill"
              ref={quillRef} // Attach the ref here
              value={body}
              onChange={handleContentChange}
              modules={{
                toolbar: toolbarOptions, // Toolbar configuration passed here
              }}
            />
          </div>
        </div>
        <div className="buttonrow row">
          <div className="buttoncolumn col">
            {errorMessage && (
              <div className="text-error-message">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            <button
              className="PC-btn btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostCreationPage;

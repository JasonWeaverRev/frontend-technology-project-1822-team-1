import React, { useState, useEffect, useRef } from "react";
import "./PostCreationPage.css";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["link", "formula"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

// Define the type of options we expect from the API
interface EncounterOption {
  encounter_id: string;
  encounter_title: string;
}

const PostCreationPage: React.FC = () => {
  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [options, setOptions] = useState<EncounterOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const quillRef = useRef<ReactQuill | null>(null);

  const handleContentChange = (value: string) => {
    setBody(value);
  };

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
      // Apply black color as the default for all text to override webview styles
      editor.format("color", "#000000");
      editor.on("text-change", fixLinks);
    }
    return () => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        editor.off("text-change", fixLinks);
      }
    };
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await axios.get(
        `http://3.81.216.218:4000/api/encounters/${localStorage.getItem(
          "username"
        )}`
      );
      setOptions(response.data.encounters);
      // Assuming response data is an array of options
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  // Fetch options from the table
  useEffect(() => {
    fetchOptions();
  }, []);

  useEffect(() => {}, [options]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !body) {
      setErrorMessage("All fields are required!");
      return;
    }

    console.log(selectedOption);

    setErrorMessage("");

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://3.81.216.218:4000/api/forums",
        {
          title,
          body,
          encounterId: selectedOption,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Post successfully created!");
      setTitle("");
      setBody("");
      setSelectedOption("");
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
            <label id="choice-text" htmlFor="dropdown">
              Choose an Encounter:
            </label>
            <select
              id="encounter-dropdown"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              required
            >
              <option value="" disabled>
                Select an encounter
              </option>
              {options.map((encounter) => (
                <option
                  key={encounter.encounter_id}
                  value={encounter.encounter_id}
                >
                  {encounter.encounter_title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="textrow-row">
          <div className="text-container-fluid">
            <ReactQuill
              className="ReactQuill"
              ref={quillRef}
              value={body}
              onChange={handleContentChange}
              modules={{ toolbar: toolbarOptions }}
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

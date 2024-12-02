import { useState } from "react";
import generateContent from "../services/genService";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { marked } from "marked";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function AIContentGenerator() {
  const [chatHistory, setChatHistory] = useState([]); // Store multiple prompts and responses
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle content generation
  const handleGenerateContent = async (e) => {
    if (e.key === "Enter" && prompt.trim() !== "") {
      try {
        setLoading(true);
        const response = await generateContent(prompt);
        const newEntry = {
          prompt: prompt.trim(),
          response: response.generatedContent,
        };
        setChatHistory((prev) => [...prev, newEntry]); // Add new prompt and response to history
        setPrompt("");
      } catch (error) {
        console.error("Error generating content:", error);
        const errorEntry = {
          prompt: prompt.trim(),
          response: "Error generating content. Check console for details.",
        };
        setChatHistory((prev) => [...prev, errorEntry]);
      } finally {
        setLoading(false);
      }
    }
  };

  // Render Markdown with syntax highlighting
  const renderMarkdown = (text) =>
    marked(text, {
      breaks: true,
      gfm: true,
      highlight: function (code, language) {
        return SyntaxHighlighter({
          language: language,
          children: code,
          style: docco,
        });
      },
    });

  return (
    <div className="p-4 text-white overflow-auto">

      <div
        className="chat-history"
        style={{
          marginTop: "20px",
          maxHeight: "80vh",
          overflowY: "auto",
          paddingBottom: "60px",
        }}
      >
        {chatHistory.map((entry, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              border: "1px solid #333",
              borderRadius: "10px",
              padding: "10px",
              backgroundColor: "#1e1e1e",
            }}
          >
            <div className="text-white font-bold">Prompt:</div>
            <div
              style={{
                color: "black",
                backgroundColor: "#e0e0e0",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              {entry.prompt}
            </div>

            <div className="text-white font-bold">Response:</div>
            <div
              style={{
                backgroundColor: "#121212",
                borderRadius: "8px",
                padding: "15px",
                color: "white",
              }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(entry.response) }}
            />
          </div>
        ))}
      </div>

      <div
        className="fixed bottom-5 left-0 right-0 flex justify-center items-center"
        style={{ height: "10vh" }}
      >
        <TextField
          variant="outlined"
          color="primary"
          value={prompt}
          autoComplete="off"
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleGenerateContent} // Handle Enter key to generate content
          placeholder={loading ? "Generating..." : "Write a prompt to generate content..."}
          disabled={loading}
          sx={{
            width: "30%",
            padding: "5px",
            fontSize: "16px",
            borderRadius: "20px",
            transition: "width 1s ease, box-shadow 0.3s ease",
            backgroundColor: "#333",
            "& input": {
              transition: "all 0.3s ease",
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderRadius: "50px",
                borderColor: "white",
                transition: "all 0.3s ease",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
                transition: "all 0.5s ease",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              },
            },
            "&:hover": {
              width: "60%",
            },
            "&.Mui-focused": {
              width: "60%",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="text-white" />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default AIContentGenerator;


import React, { useState, useEffect } from "react";
import "./FaqsPage.css";
import axios from "axios";
const FaqsPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setanswer] = useState("");
  const [loading, setloading] = useState(null);
  const [FaqData, setFaqData] = useState([]);
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedques, setSelectedques] = useState(null);

  async function AddNewFaq(e) {
    e.preventDefault();
    const newFaq = {
      question,
      answer,
    };
    if (!question || !answer) return alert("please add values");
    setloading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/new-faq",
        newFaq,
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setQuestion(""), setanswer("");
      alert("new FAQ added");
      window.location.reload();
    } catch (error) {
      console.log(error.message, "error while saving new faq");
      alert(`Error: ${error.message}`);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    async function GetFaqData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/faqs?lang=${selectedLang}`
        );
        setFaqData(response.data.data);
      } catch (error) {
        console.log("error while fetching the data");
      }
    }
    GetFaqData();
  }, [selectedLang]);

  const handleClick = (question) => {
    setSelectedques((prev) => (prev === question ? null : question)); // Toggle logic
  };

  if (loading) {
    return (
      <div>
        <h1> Saving new FAQ please wait... </h1>
      </div>
    );
  }

  return (
    <div>
      {/* //NAVBAR SECTION  */}
      <div id="Navbar">
        <div id="navleft">
          <h1 style={{ color: "#2C387A" }}>
            {" "}
            Bharat<span>FD</span>{" "}
          </h1>
        </div>
        <div id="navright">
          <p>Compare FD rates </p>
          <p>Contact us</p>
        </div>
      </div>{" "}
      {/* //NAVBAR SECTION  */}
      {/* //FAQS SECTION  */}
      <div id="faqs-heading">
        <h2> Frequently Asked Questions </h2>
      </div>
      <div id="faqs-box-outer">
        <div id="faqs-box-inner">
          <div id="language-btn-div">
            <button id="language-btn" onClick={() => setSelectedLang("")}>
              {" "}
              English{" "}
            </button>
            <button id="language-btn" onClick={() => setSelectedLang("hi")}>
              {" "}
              Hindi{" "}
            </button>
            <button id="language-btn" onClick={() => setSelectedLang("bn")}>
              {" "}
              Bengali{" "}
            </button>
            <button id="language-btn" onClick={() => setSelectedLang("ta")}>
              {" "}
              Tamil{" "}
            </button>
          </div>

          {FaqData &&
            FaqData.map((data) => (
              <div id="q-a-div" key={data._id}>
                <button
                  id="question-open-btn"
                  onClick={(e) => handleClick(data.question)}
                >
                  <div id="ques-div">
                    <p
                      style={{
                        color:
                          selectedques === data.question ? "#2C387A" : "black",
                      }}
                    >
                      {data.question}
                    </p>
                    <p
                      style={{
                        display:
                          selectedques === data.question ? "none" : "block",
                      }}
                    >
                      {" "}
                      Show{" "}
                    </p>
                    <p
                      style={{
                        display:
                          selectedques === data.question ? "block" : "none",
                      }}
                    >
                      {" "}
                      Hide{" "}
                    </p>
                  </div>
                </button>

                <div
                  id="ans-div"
                  style={{
                    display: selectedques === data.question ? "block" : "none",
                  }}
                >
                  <p> {data.answer} </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* //ADD NEW FAQS SECTION */}
      <div id="new-faq-add-box">
        <div>
          <h2> Add new FAQS </h2>
        </div>
        <div id="add-ques-form">
          <form onSubmit={(e) => AddNewFaq(e)}>
            <input
              onChange={(e) => setQuestion(e.target.value)}
              style={{
                outline: "none",
                margin: "5px 0px 5px 0px",
                width: "100%",
                padding: "10px 15px 10px 15px",
                border: "1px solid #212426",
                value: { question },
              }}
              type="text"
              placeholder="Type question here..."
            />
            <input
              onChange={(e) => setanswer(e.target.value)}
              style={{
                outline: "none",
                margin: "5px 0px 5px 0px",
                width: "100%",
                padding: "10px 15px 10px 15px",
                border: "1px solid #212426",
                value: { answer },
              }}
              type="text"
              placeholder="Type answer here..."
            />
            <button
              type="submit"
              style={{
                outline: "none",
                margin: "5px 0px 5px 0px",
                width: "100%",
                padding: "10px 15px 10px 15px",
              }}
              id="newfaq-add-btn"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FaqsPage;

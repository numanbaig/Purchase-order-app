import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [vendorName, setVendorName] = useState("");
  const [date, setDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVendorNameChange = (e) => {
    setVendorName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData();
    formData.append("vendorName", vendorName);
    formData.append("date", date);
    formData.append("file", selectedFile);

    axios
      .post("http://localhost:3001/uploadfile", formData)
      .then((res) => {
        alert(res.data)
      })
      .catch((err) => {
        console.log('er', err);
        alert(err.response.data.message)
      }).finally(()=>{
        setIsLoading(false)
      });

  };

  return (
    <div>
      <Head>
        <title>Purchase Order App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          width: "800px",
          height: "500px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "100px",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Welcome to Purchase Order App</h1>
        <form
          onSubmit={handleSubmit}
          method="POST"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "fit-content",
          }}
        >
          <div style={{ paddingBottom: "10px" }}>
            <label
              htmlFor="vendorName"
              style={{ fontSize: "20px", marginRight: "15px" }}
            >
              Vendor Name:
            </label>
            <input
              type="text"
              id="vendorName"
              value={vendorName}
              onChange={handleVendorNameChange}
              style={{ width: "190px", height: "30px" }}
            />
          </div>
          <div style={{ paddingBottom: "12px" }}>
            <label
              htmlFor="date"
              style={{ fontSize: "20px", marginRight: "10px" }}
            >
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              style={{ width: "190px", height: "30px" }}
              onChange={handleDateChange}
            />
          </div>
          <div style={{ paddingBottom: "12px" }}>
            <label
              htmlFor="file"
              style={{ fontSize: "20px", marginRight: "15px" }}
            >
              Select CSV File:
            </label>
            <input
              type="file"
              id="file"
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            style={{
              cursor:'pointer',
              width: "100px",
              fontSize: "16px",
              height: "30px",
              backgroundColor: "blue",
              color: "white",
              borderRadius: "5px",
              border: "none",
            }}
          >
            { isLoading ? 'Loading...' : 'Save' }
          </button>
        </form>
      </main>
    </div>
  );
}

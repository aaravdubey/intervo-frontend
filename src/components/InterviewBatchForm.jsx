import React, { useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

const API_BASE = 'http://localhost:3000';

const InterviewBatchForm = () => {
  const [formData, setFormData] = useState({
    companyName: localStorage.getItem('companyName') || "",
    totalCandidatesRequired: "",
    domains: "",
    skills: [],
    interviewTypes: [],
    deadline: null,
    csvFile: null,
    note: ""
  });

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, csvFile: file });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevFormData) => {
      const updatedInterviewTypes = checked
        ? [...prevFormData.interviewTypes, value]
        : prevFormData.interviewTypes.filter((type) => type !== value);
      return { ...prevFormData, interviewTypes: updatedInterviewTypes };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataForSubmission = new FormData();
    formDataForSubmission.append("companyName", formData.companyName);
    formDataForSubmission.append("totalCandidatesRequired", formData.totalCandidatesRequired);
    formDataForSubmission.append("domains", formData.domains);
    formDataForSubmission.append("skills", JSON.stringify(formData.skills));
    formDataForSubmission.append("interviewTypes", JSON.stringify(formData.interviewTypes));
    formDataForSubmission.append("deadline", formData.deadline);
    formDataForSubmission.append("csvFile", formData.csvFile);
    formDataForSubmission.append("note", formData.note);

    try {
      const response = await axios.post(`${API_BASE}/api/interviewBatch`, formDataForSubmission, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        console.log("Interview batch created successfully");
        toast.success('Interview batch created successfully');
        setFormData({
          companyName: localStorage.getItem('companyName') || "",
          totalCandidatesRequired: "",
          domains: "",
          skills: [],
          interviewTypes: [],
          deadline: null,
          csvFile: null,
          note: ""
        });
        setInputValue("");
      } else {
        console.error("Failed to create interview batch", response.data.message);
        toast.error(`Failed to create interview batch: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`Error submitting form: ${error.message}`);
    }
  };

  const addTag = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !formData.skills.includes(inputValue.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, inputValue.trim()] });
      setInputValue("");
    }
  };

  const removeTag = (skill) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const interviewTypes = [
    { value: "Aptitude", label: "Aptitude" },
    { value: "Coding", label: "Coding" },
    { value: "Group Discussion", label: "Group Discussion" },
  ];

  return (
    <div className="max-w-xxl mx-auto px-28 mt-10 bg-white rounded-lg shadow-lg ">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 ">Interview Batch Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Company Name */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">Company Name:</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              readOnly
              className="px-4 py-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Total Candidates Required */}
          <div className="w-full md:w-1/2 px-3">
            <label htmlFor="totalCandidatesRequired" className="block text-gray-700 font-bold mb-2">Total No. of Candidates Required:</label>
            <input
              type="number"
              id="totalCandidatesRequired"
              name="totalCandidatesRequired"
              value={formData.totalCandidatesRequired}
              onChange={handleInputChange}
              placeholder="Enter Total No. of Candidates Required"
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Domains */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="domains" className="block text-gray-700 font-bold mb-2">Domains:</label>
            <input
              type="text"
              id="domains"
              name="domains"
              value={formData.domains}
              onChange={handleInputChange}
              placeholder="Enter Domains"
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Skills */}
          <div className="w-full md:w-1/2 px-3">
            <label htmlFor="skills" className="block text-gray-700 font-bold mb-2">Skills:</label>
            <div className='flex mb-2'>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-l-md placeholder:font-light placeholder:text-gray-500"
                name="skills"
                id="skills"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ex: React, NodeJs, Python, etc."
              />
              <button className='bg-teal-500 text-white w-10 rounded-r-md' onClick={addTag}>+</button>
            </div>
            <div className="flex flex-wrap">
              {formData.skills.map((skill, index) => (
                <div key={index} className="bg-gray-200 p-2 m-1 rounded-md flex items-center">
                  <span className="mr-2">{skill}</span>
                  <button type="button" className="text-red-500" onClick={() => removeTag(skill)}>x</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Interview Types and Deadline */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <span className="block text-gray-700 font-bold mb-2">Interview Types:</span>
            {interviewTypes.map((type) => (
              <div key={type.value} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={type.value}
                  value={type.value}
                  checked={formData.interviewTypes.includes(type.value)}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor={type.value} className="text-gray-700">{type.label}</label>
              </div>
            ))}
          </div>

          {/* Deadline */}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">Deadline:</label>
            <DatePicker
              id="deadline"
              selected={formData.deadline}
              onChange={handleDateChange}
              placeholderText="Select Deadline"
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Upload CSV File */}
          <div className="w-full px-3 mb-6 md:mb-0">
            <label htmlFor="csvFile" className="block text-gray-700 font-bold mb-2">Upload CSV File:</label>
            <input
              type="file"
              id="csvFile"
              name="csvFile"
              onChange={handleFileChange}
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          {/* Note */}
          <div className="w-full px-3 mb-6 md:mb-0">
            <label htmlFor="note" className="block text-gray-700 font-bold mb-2">Note:</label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              placeholder="Enter any additional notes"
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterviewBatchForm;

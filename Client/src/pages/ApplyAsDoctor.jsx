import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-hot-toast'

function ApplyAsDoctor() {

    const navigate = useNavigate()

    const onCompleted = async () => {
        try {
            let response = axios.post('http://localhost:5003/api/v1/auth/applyDoctor', {
                name: personalInfo.name,
                email: personalInfo.email,
                phone: personalInfo.phone,
                address: personalInfo.address,
                specialization: professionalInfo.specialization,
                experience: professionalInfo.experience,
                feePerConsultation: professionalInfo.feePerConsultation,
                fromTime: professionalInfo.fromTime,
                toTime: professionalInfo.toTime
            }, {
                withCredentials: true
            })
            response = await response
            console.log(response.data);
            console.log(response.data.success);
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/')
            }
            else {
                toast.error(response.data.message)
            }

            console.log('Personal Information:', personalInfo);
            console.log('Professional Information:', professionalInfo);
        } catch (error) {
            console.log(error);
        }
    }


    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [professionalInfo, setProfessionalInfo] = useState({
        specialization: '',
        experience: '',
        feePerConsultation: 0,
        fromTime: '',
        toTime: ''
    });

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProfessionalInfoChange = (e) => {
        const { name, value } = e.target;
        setProfessionalInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Personal Information:', personalInfo);
        console.log('Professional Information:', professionalInfo);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Doctor Form</h2>

            <form onSubmit={onCompleted}>

                {/* Personal Information */}
                <h3 className="text-xl font-bold mb-2">Personal Information</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" value={personalInfo.email} onChange={handlePersonalInfoChange} className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="text" name="phone" value={personalInfo.phone} onChange={handlePersonalInfoChange} className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" name="address" value={personalInfo.address} onChange={handlePersonalInfoChange} className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>

                {/* Professional Information */}
                <h3 className="text-xl font-bold mb-2">Professional Information</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Specialization</label>
                    <input type="text" name="specialization" value={professionalInfo.specialization} onChange={handleProfessionalInfoChange} className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Experience</label>
                    <input type="text" name="experience" value={professionalInfo.experience} onChange={handleProfessionalInfoChange} className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Fee Per Consultation</label>
                    <input type="number" name="feePerConsultation" value={professionalInfo.feePerConsultation} onChange={handleProfessionalInfoChange} className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">From Time</label>
                    <input type="time" name="fromTime" value={professionalInfo.fromTime} onChange={handleProfessionalInfoChange} className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">To Time</label>
                    <input type="time" name="toTime" value={professionalInfo.toTime} onChange={handleProfessionalInfoChange} className="mt-1 p-2 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>

                <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
            </form>
        </div>
    )
}

export default ApplyAsDoctor
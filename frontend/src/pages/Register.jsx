import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false)
    const [textSize, setTextSize] = useState(localStorage.getItem('fontSize') || 'md')
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const API = import.meta.env.VITE_BACKEND_HOST


    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        mobile: '',
        address: '',
        department: ''
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const formsubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrors("")
        try {
            const response = await axios.post(`${API}/api/patients`, formData)
            console.log(response.data)

            localStorage.setItem("name", response.data.data.name)
            localStorage.setItem("token", response.data.data.token)
            localStorage.setItem("age", response.data.data.age)
            localStorage.setItem("department", response.data.data.department)
            localStorage.setItem("created_at", response.data.data.created_at)

            // navigate("/token")
        } catch (error) {
            console.log(error)
            setErrors(error.response?.data?.message || "Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    const changeTextSize = (size) => {
        setTextSize(size)
        localStorage.setItem("fontSize", size)
    }

    // Size class
    const sizeClasses = {
        md: {
            title: "text-4xl md:text-5xl",
            body: "text-base md:text-lg",
        },
        lg: {
            title: "text-5xl md:text-6xl",
            body: "text-lg md:text-xl",
        },
        xl: {
            title: "text-6xl md:text-7xl",
            body: "text-xl md:text-2xl",
        }
    }
    const currentFontSize = sizeClasses[textSize]



    return (
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden select-none">
            {/* Navigation Header */}
            <header className="w-full top-0 sticky border-b border-slate-200 bg-white z-50 shadow-sm">
                <div className="flex justify-start items-center py-4 w-full max-w-7xl mx-auto px-6">
                    <button
                        onClick={() => navigate("/")}
                        className="h-12 px-6 rounded-xl font-bold shadow-md active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-base md:text-lg"
                        aria-label="Go back to welcome screen"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                        <span>Go Back</span>
                    </button>
                    <h2 className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-semibold text-blue-600 hidden sm:block">
                        MediQ Patient Registration Kiosk
                    </h2>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col items-center justify-center px-6">
                <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md">
                    <div className="text-center mb-2">
                        <h1 className={`${currentFontSize.title} font-bold text-blue-600`}>
                            Patient Registration
                        </h1>
                        <p className={`${currentFontSize.body} text-slate-600`}>
                            Please fill out the form and choose your department to register.
                        </p>
                    </div>

                    <form onSubmit={formsubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
                        {/* left */}
                        <div className="space-y-4">
                            {/* Full Name */}
                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-slate-700" htmlFor="fullName">Full Name<span className='text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Full Legal Name"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-xl text-base"
                                />
                            </div>

                            {/* Age and Gender */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-sm font-semibold text-slate-700" htmlFor="age">Age<span className='text-red-500'>*</span></label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        min="1"
                                        max="120"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter Age"
                                        className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-xl text-base"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-semibold text-slate-700">Gender<span className='text-red-500'>*</span></label>
                                    <div className="flex gap-2">
                                        {['male', 'female', 'other'].map((select) => (
                                            <label key={select} className="flex-1 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={select}
                                                    checked={formData.gender === select}
                                                    onChange={handleChange}
                                                    required
                                                    className="sr-only peer"
                                                />
                                                <div className="h-12 flex items-center justify-center border-2 border-slate-200 rounded-xl peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all text-slate-700 font-semibold capitalize text-sm">
                                                    {select}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Number */}
                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-slate-700" htmlFor="mobile">Mobile Number<span className='text-red-500'>*</span></label>
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    pattern="[0-9]{10}"
                                    value={formData.mobile}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
                                        setFormData(prev => ({ ...prev, mobile: val }))
                                    }}
                                    required
                                    placeholder="10-digit Mobile Number"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-xl text-base"
                                />
                            </div>

                            {/* Address */}
                            <div className="space-y-1">
                                <label className="block text-sm font-semibold text-slate-700" htmlFor="address">Address (Optional)</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows="4"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your current address"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-xl text-base resize-none"
                                />
                            </div>


                        </div>

                        {/* right */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-slate-700">Select Department<span className='text-red-500'>*</span></label>
                            <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, department: 'General Medicine' }))}
                                    className={`w-full p-3 flex items-center gap-3 border-2 rounded-xl text-left font-bold transition-all active:scale-95 cursor-pointer text-base
                                        ${formData.department === 'General Medicine'
                                            ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-750'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${formData.department === 'General Medicine' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'} flex items-center justify-center`}>
                                        <span className="material-symbols-outlined text-xl">stethoscope</span>
                                    </div>
                                    <span>General Medicine</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, department: 'Cardiology' }))}
                                    className={`w-full p-3 flex items-center gap-3 border-2 rounded-xl text-left font-bold transition-all active:scale-95 cursor-pointer text-base
                                        ${formData.department === 'Cardiology'
                                            ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-750'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${formData.department === 'Cardiology' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'} flex items-center justify-center`}>
                                        <span className="material-symbols-outlined text-xl">cardiology</span>
                                    </div>
                                    <span>Cardiology</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, department: 'Orthopedics' }))}
                                    className={`w-full p-3 flex items-center gap-3 border-2 rounded-xl text-left font-bold transition-all active:scale-95 cursor-pointer text-base
                                        ${formData.department === 'Orthopedics'
                                            ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-750'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${formData.department === 'Orthopedics' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'} flex items-center justify-center`}>
                                        <span className="material-symbols-outlined text-xl">orthopedics</span>
                                    </div>
                                    <span>Orthopedics</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, department: 'Dermatology' }))}
                                    className={`w-full p-3 flex items-center gap-3 border-2 rounded-xl text-left font-bold transition-all active:scale-95 cursor-pointer text-base
                                        ${formData.department === 'Dermatology'
                                            ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-750'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${formData.department === 'Dermatology' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'} flex items-center justify-center`}>
                                        <span className="material-symbols-outlined text-xl">dermatology</span>
                                    </div>
                                    <span>Dermatology</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, department: 'Pediatrics' }))}
                                    className={`w-full p-3 flex items-center gap-3 border-2 rounded-xl text-left font-bold transition-all active:scale-95 cursor-pointer text-base
                                        ${formData.department === 'Pediatrics'
                                            ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-750'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${formData.department === 'Pediatrics' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'} flex items-center justify-center`}>
                                        <span className="material-symbols-outlined text-xl">child_care</span>
                                    </div>
                                    <span>Pediatrics</span>
                                </button>
                            </div>
                        </div>


                        {/* Symmetrical Action Buttons */}
                        <div className="col-span-1 lg:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
                            {errors ? (
                                <div
                                    className="flex items-center gap-2 p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 font-medium text-sm sm:text-base"
                                >
                                    <span className="material-symbols-outlined  ">error</span>
                                    {errors}
                                </div>
                            ) : <div></div>
                            }
                            <div className="flex gap-x-4 w-full sm:w-auto justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormData({
                                            name: '',
                                            age: '',
                                            gender: '',
                                            mobile: '',
                                            address: '',
                                            department: ''
                                        })
                                    }}
                                    className="w-full sm:w-36 h-14 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold rounded-xl active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="w-full sm:w-36 h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                                >
                                    {loading ? "Registering..." : "Continue"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            {/* Floating Accessibility Controls */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                {showAccessibilityMenu && (
                    <div className="p-6 rounded-2xl border border-slate-200 shadow-2xl w-80 mb-2 transition-all bg-white text-slate-800">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
                            <h4 className="font-bold text-lg">
                                Accessibility Settings
                            </h4>
                            <button
                                onClick={() => setShowAccessibilityMenu(false)}
                                className="hover:opacity-75 p-1 rounded-full cursor-pointer flex items-center justify-center text-slate-400"
                                aria-label="Close menu"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Text Size Selectors */}
                            <div className="space-y-2">
                                <span className="font-medium block text-slate-600 text-sm">Text Size</span>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => changeTextSize('md')}
                                        className={`py-1.5 px-3 rounded-lg text-sm font-bold border transition-all cursor-pointer
                                            ${textSize === 'md'
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        Default
                                    </button>
                                    <button
                                        onClick={() => changeTextSize('lg')}
                                        className={`py-1.5 px-3 rounded-lg text-sm font-bold border transition-all cursor-pointer
                                            ${textSize === 'lg'
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        Large
                                    </button>
                                    <button
                                        onClick={() => changeTextSize('xl')}
                                        className={`py-1.5 px-3 rounded-lg text-sm font-bold border transition-all cursor-pointer
                                            ${textSize === 'xl'
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        XL
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
                    role="menu"
                    aria-label="Accessibility Settings"
                    className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-200 active:scale-90 shadow-lg cursor-pointer bg-slate-100 text-slate-600 hover:bg-slate-250"
                >
                    <span className="material-symbols-outlined text-3xl">settings_accessibility</span>
                </button>
            </div>
        </div>
    )
}
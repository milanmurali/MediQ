import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"


export const Admin = () => {

    const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false)
    const [textSize, setTextSize] = useState(localStorage.getItem('fontSize') || 'md')

    const [patients, setPatients] = useState([]);
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("All");
    const departments = [
        "All",
        `General%20Medicine`,
        "Cardiology",
        "Orthopedics",
        "Dermatology",
        "Pediatrics",
    ];
    const HOST = import.meta.env.VITE_BACKEND_HOST;
    let API = `${HOST}/api/patients`

    const fetch = async (e) => {
        e.preventDefault()
        setLoading(true);
        setErrors("");

        
        if (search) {
            API += `?search=${search}`
        }
        
        if (department !== "All") {
            API += `?department=${department}`
        }
        console.log(API);

        try {
            const response = await axios.get(API);
            setPatients(response.data.data);
            setLoading(false)
            console.log(response);
        }
        catch (error) {
            console.log(error);
            setErrors(error.response?.data?.message || "Something went wrong!");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }



    const changeTextSize = (size) => {
        setTextSize(size)
        localStorage.setItem("fontSize", size)
    }
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden select-none">

            {/* Navigation Header */}
            <header className="w-full top-0 sticky border-b border-slate-200 bg-white z-50 shadow-sm">
                <div className="flex justify-center items-center py-4 w-full max-w-7xl mx-auto px-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-blue-600 hidden sm:block">
                        MediQ Admin Panel
                    </h2>
                </div>
            </header>


            {/* Main */}
            <div className="flex-grow flex flex-col items-center my-2 px-6 w-full">
                {loading ? (
                    <div className="flex items-center justify-center p-3 rounded-xl">
                        <span className="material-symbols-outlined animate-spin text-blue-600">Cycle</span>
                    </div>
                ) :
                    <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md">

                        {/* Search bar */}
                        <div>
                            <form
                                onSubmit={fetch}
                                className="flex justify-center items-center gap-x-4">
                                <input
                                    type="text"
                                    name='search'
                                    id='search'
                                    placeholder=" Search by name or ID"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:outline-none rounded-xl text-base"
                                />

                                <button
                                    onClick={fetch}
                                    type='submit'
                                    className="w-full sm:w-36 h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                                >
                                    <span className='material-symbols-outlined'>search</span>
                                    <p>Search</p>
                                </button>
                            </form>


                            {/* Filter */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {departments.map((dept) => (
                                    <button
                                        key={dept}
                                        onClick={() => setDepartment(dept)}
                                        className={`px-5 h-12 font-bold rounded-xl active:scale-95 transition-all cursor-pointer flex items-center justify-center border text-sm md:text-base
                                            ${department === dept
                                                ? "bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700"
                                                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        {dept}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                }



            </div>

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
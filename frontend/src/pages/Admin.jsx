import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"


export const Admin = () => {

    // const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false)
    // const [textSize, setTextSize] = useState(localStorage.getItem('fontSize') || 'md')

    const [patients, setPatients] = useState([])
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [department, setDepartment] = useState("All")
    const departments = [
        "All",
        `General Medicine`,
        "Cardiology",
        "Orthopedics",
        "Dermatology",
        "Pediatrics",
    ]
    // const params = useSearchParams()

    const HOST = import.meta.env.VITE_BACKEND_HOST


    const fetch = async (e) => {
        e?.preventDefault()
        setLoading(true)
        setErrors("")

        const params = new URLSearchParams()

        if (search.trim()) {
            params.append("search", search)
        }
        
        if (department && department !== "All") {
            params.append("department", department)
        }
        const API = `${HOST}/api/patients?${params.toString()}`
        // console.log(API)

        try {
            const response = await axios.get(API)
            // console.log(response.data.data)
            setPatients(response.data.data)
            
        }
        catch (error) {
            console.log(error)
            setErrors(error.response?.data?.message || "Something went wrong!")
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        fetch()
    }, [department,search])
    
    

const formatter = (timestamp) => {
    if (!timestamp) return { date: "-", time: "-" };

    const date = new Date(timestamp);

    return {
        date: date.toLocaleDateString("en-GB"),
        time: date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,

        }),
    };
};
    
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

                <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md">

                    {/* Search Filter */}
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
                                type='submit'
                                className="w-full sm:w-36 h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center"
                            >
                                <span className='material-symbols-outlined'>search</span>
                                <p>Search</p>
                            </button>
                        </form>


                        {/* Filter */}
                        <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
                            {departments.map((dept) => (
                                <button
                                    type="button"
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


                    {errors ? (
                        <div className="flex items-center justify-center gap-2 p-5 my-5 rounded-xl">
                            <span className="material-symbols-outlined text-red-500">error</span>
                            <p className="text-red-500">{errors}</p>
                        </div>

                    ) : (

                        <div className='my-10'>

                            {loading ? (
                                <div className="flex items-center justify-center p-3 rounded-xl">
                                    <span className="material-symbols-outlined animate-spin text-blue-600">cycle</span>
                                </div>
                            ) : (
                                <div className='overflow-x-auto border border-slate-200/80 rounded-xl shadow-sm bg-white'>
                                    {/* Data table */}
                                    <table className="w-full border-collapse text-left text-sm text-slate-700">
                                        <thead>
                                            <tr className="border-b border-slate-200 text-left">
                                                <th className="p-3">ID</th>
                                                <th className="p-3">Name</th>
                                                <th className="p-3">Age</th>
                                                <th className="p-3">Gender</th>
                                                <th className="p-3">Mobile</th>
                                                <th className="p-3">Department</th>
                                                <th className="p-3">Token</th>
                                                <th className="p-3">Date</th>
                                                <th className="p-3">Time</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {patients.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="p-3">
                                                        <p className="font-semibold">{user.id}</p>
                                                    </td>
                                                    <td className="p-3">
                                                        <p className="font-semibold">{user.name}</p>
                                                    </td>

                                                    <td className="p-3">
                                                        <p className="font-semibold">{user.age}</p>
                                                    </td>

                                                    <td className="p-3">
                                                        <p className="font-semibold">{user.gender}</p>
                                                    </td>
                                                    <td className="p-3">
                                                        <p className="font-semibold">{user.mobile}</p>
                                                    </td>

                                                    <td className="p-3">
                                                        <p className="font-semibold">{user.department}</p>
                                                    </td>
                                                    <td className="p-3">
                                                        <p className="font-semibold">{user.token}</p>
                                                    </td>
                                                    <td className="p-3">
                                                        <p className="font-semibold"> {formatter(user.created_at).date}</p>
                                                    </td>
                                                    <td className="p-3">
                                                        <p className="font-semibold"> {formatter(user.created_at).time}</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>




                            )}


                        </div>
                    )}


                </div >




            </div >

            {/* Floating Accessibility Controls */}

            {/* < div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" >
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
            </div > */}

        </div >
    )
}
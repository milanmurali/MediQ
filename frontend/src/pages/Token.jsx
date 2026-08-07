import React, { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useReactToPrint } from "react-to-print";

export const Token = () => {
    const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false)
    const [textSize, setTextSize] = useState(localStorage.getItem('fontSize') || 'md')
    const navigate = useNavigate()

    const tokenRef = useRef(null);

    const print = useReactToPrint({
        contentRef: tokenRef,
        documentTitle: "MediQ Token",
    });


    const name = localStorage.getItem("name")
    const gender = localStorage.getItem("gender")
    const age = localStorage.getItem("age")
    const token = localStorage.getItem("token")
    const department = localStorage.getItem("department")
    const created_at = localStorage.getItem("created_at")

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
        <div>

            {/* Navigation Header */}
            <header className="w-full top-0 sticky border-b border-slate-200 bg-white z-50 shadow-sm">
                <div className="flex justify-center items-center py-4 w-full max-w-7xl mx-auto px-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-blue-600 hidden sm:block">
                        MediQ Patient Registration Kiosk
                    </h2>
                </div>
            </header>

            {/* main */}

            <div className="grow flex flex-col items-center my-2 px-6 w-full">

                <div className="flex flex-col items-center space-y-4 my-2 p-6">
                    <h1 className={`${currentFontSize.title} font-bold text-blue-600`}>
                        Registration Complete!
                    </h1>
                    <p className={`${currentFontSize.body}  text-slate-600`}>
                        Your check-in process is Complete. Please wait till your turn.
                    </p>

                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="group relative h-16 min-w-[340px] px-12 rounded-xl font-bold shadow-md active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-xl md:text-2xl"
                        aria-label="Go to home screen"
                    >
                        <span className="material-symbols-outlined transition-transform duration-200 group-hover:translate-x-1">home</span>
                        <span>Go Home</span>
                    </button>

                    <button
                        onClick={print}
                        className="group relative h-16 min-w-[340px] px-12 rounded-xl font-bold shadow-md active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-xl md:text-2xl"
                        aria-label="Print token"
                    >
                        <span className="material-symbols-outlined transition-transform duration-200 group-hover:translate-x-1">print</span>
                        <span>Print Token</span>
                    </button>
                </div>

                <div ref={tokenRef}>
                    
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-md px-8 py-6 max-w-md mx-auto my-4 text-center">

                        <h1 className="text-2xl font-bold text-blue-600">
                            MediQ Patient Token
                        </h1>

                        <p className={`text-l text-slate-500 mt-2`}>
                            Please wait until your token is called.
                        </p>

                        <div className="my-2 py-2 border-y border-slate-200">
                            <p className="text-sm text-slate-500 uppercase tracking-wide">
                                Token Number
                            </p>

                            <h2 className="text-5xl font-extrabold text-blue-600 mt-2">
                                {token}
                            </h2>
                        </div>

                        <div className="space-y-3 text-left">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Patient Name</span>
                                <span className="font-semibold">{name}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500">Department</span>
                                <span className="font-semibold">{department}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500">Date</span>
                                <span className="font-semibold">
                                    {formatter(created_at).date}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-slate-500">Time</span>
                                <span className="font-semibold">
                                    {formatter(created_at).time}
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 pt-4 border-t border-slate-100">
                            <p className="text-xs text-slate-400">
                                Please keep this token for your visit.
                            </p>
                        </div>

                    </div>
                </div>


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
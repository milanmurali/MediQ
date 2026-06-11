import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
export const Register = () => {

    const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false)
    const [textSize, setTextSize] = useState(localStorage.getItem('fontSize') || 'md')
    const navigate = useNavigate()

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
                <div className="flex justify-start items-center py-4 w-full max-w-7xl mx-auto">

                    <button
                        onClick={() => navigate("/")}
                        className="h-12 min-w-[100px] px-6 rounded-xl font-bold shadow-md active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white text-xl md:text-2xl"
                        aria-label="Start patient registration"
                    >
                        <span className="material-symbols-outlined transition-transform duration-200 group-hover:translate-x-1">arrow_back</span>
                        <span>Go Back</span>
                    </button>

                    <h2 className="absolute left-1/2 -translate-x-1/2 text-xl md:text-3xl font-semibold text-blue-600">
                        MediQ Patient Registration Kiosk
                    </h2>
                </div>
            </header>




            {/* Floating */}
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
                                        Extra Lg
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
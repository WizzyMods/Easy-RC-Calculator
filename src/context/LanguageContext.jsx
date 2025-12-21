import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations, supportedLanguages } from '../locales/index';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // 1. Check local storage
        const savedCallback = localStorage.getItem('rc-language');
        if (savedCallback && translations[savedCallback]) {
            return savedCallback;
        }

        // 2. Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            return browserLang;
        }

        // 3. Default to English
        return 'en';
    });

    useEffect(() => {
        localStorage.setItem('rc-language', language);
    }, [language]);

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // Fallback to English if key missing in current language
                let fallback = translations['en'];
                for (const fk of keys) {
                    if (fallback && fallback[fk]) fallback = fallback[fk];
                    else return key; // Return key if absolutely not found
                }
                return fallback;
            }
        }
        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, supportedLanguages }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

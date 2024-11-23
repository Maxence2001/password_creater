import React from 'react'
import { useState } from 'react'
const Passw = () => {
    const [passwordLength, setPasswordLength] = useState("");
    const [includeSpecialChars, setIncludeSpecialChars] = useState("");
    const [includeNumbers, setIncludeNumbers] = useState("");
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [error, setError] = useState("");
    const [errorSpecialChars, setErrorSpecialChars] = useState("");
    const [errorNumbersChange, setErrorNumbersChange] = useState("");

    const handlePasswordLengthChange = (e) => {
        const value = e.target.value;
        if (/^\d+$/.test(value) || value === "") {
            setPasswordLength(value);
            setError(""); // Réinitialise le message d'erreur
        } else if (/\D/.test(value)) {
            setError("Veuillez entrer un nombre entier valide."); // Message si ce n'est pas un nombre
        } else if (/\./.test(value)) {
            setError("Les nombres décimaux ne sont pas acceptés."); // Message pour les nombres décimaux
        } else {
            setError(""); // Par défaut, aucun message
        }
    };

    const handleSpecialCharsChange = (e) => {
        const value = e.target.value;
        if (value === "o" || value === "n" || value === "") {
            setIncludeSpecialChars(value);
            setErrorSpecialChars(""); // Réinitialise le message d'erreur
        } else {
            setErrorSpecialChars('Veuillez entrer "o" pour oui ou "n" pour non.');
        }
    };

    const handleNumbersChange = (e) => {
        const value = e.target.value;
        if (value === "o" || value === "n" || value === "") {
            setIncludeNumbers(value);
            setErrorNumbersChange(""); // Réinitialise le message d'erreur
        } else {
            setErrorNumbersChange('Veuillez entrer "o" pour oui ou "n" pour non.');
        }
    };

    const generatePassword = () => {
        if (!passwordLength || !/^\d+$/.test(passwordLength)) {
            setGeneratedPassword('Entrez une longueur de mot de passe valide !');
            return;
        }

        const length = parseInt(passwordLength, 10);
        const specialChars = includeSpecialChars.toLowerCase() === 'o';
        const numbers = includeNumbers.toLowerCase() === 'o';

        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const special = '!@#$%^&*()';
        const num = '0123456789';

        let charSet = chars;
        if (specialChars) charSet += special;
        if (numbers) charSet += num;

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charSet.length);
            password += charSet[randomIndex];
        }

        setGeneratedPassword(password);
    };

    return (
        <div className='container'>
            <form className='container-text'>
                <div className='string-reverse-answer'>
                    <label>
                        <h5>{generatedPassword}</h5>
                    </label>
                </div>
                <div>
                    <input
                        className='input-reverse aleft'
                        type="text"
                        placeholder='Longueur de mot de passe'
                        value={passwordLength}
                        onChange={handlePasswordLengthChange}
                    />
                    {/* Affichage conditionnel du message d'erreur */}
                    {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                </div>
                <br />
                <div>
                    <input
                        className='input-reverse aleft'
                        type="text"
                        placeholder='Voulez-vous des caractères spéciaux ? (o/n)'
                        value={includeSpecialChars}
                        onChange={handleSpecialCharsChange}
                    />
                    {errorSpecialChars && <p style={{ color: 'red', fontSize: '14px' }}>{errorSpecialChars}</p>}
                </div>
                <br />
                <div>
                    <input
                        className='input-reverse aleft'
                        type="text"
                        placeholder='Voulez-vous des chiffres ? (o/n)'
                        value={includeNumbers}
                        onChange={handleNumbersChange}
                    />
                    {errorNumbersChange && <p style={{ color: 'red', fontSize: '14px' }}>{errorNumbersChange}</p>}
                </div>
                <br />
                <div>
                    <button className='btn container' onClick={generatePassword} type="button">
                        Générer
                    </button>
                </div>
            </form>
        </div>
    );
};


export default Passw
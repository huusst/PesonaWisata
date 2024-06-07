import React from 'react';

const Alert = ({ show, onClose, status, message }) => {

    // if (!show) {
    //     return null;
    // }

    return (
        <div class={`alert ${show ? 'show' : 'hide'} showAlert ${status === "Success" ? 'success' : status === "Warning" ? 'warning' : status === "Info" ? 'info' : status === "Error" ? 'error' : ''}`}>
            {status === "Success" && (
                <span class="fa-solid fa-circle-check"></span>
            )}
            {status === "Warning" && (
                <span class="fas fa-exclamation-circle"></span>
            )}
            {status === "Error" && (
                <span class="fas fa-exclamation-circle error"></span>
            )}
            {status === "Info" && (
                <span class="fa-solid fa-circle-info"></span>
            )}
            <span class="msg">{status}: {message}</span>
            <div class="close-btn" onClick={onClose}>
                <span class="fas fa-times"></span>
            </div>
        </div>
    );
};

export default Alert;

import React from "react";

const ConfirmationModal = ({ title, message,  modalData, successAction,successButtonName}) => {
  return (
    <div>
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal dark:text-black">
        <div className="modal-box relative">
        <label htmlFor="confirmation-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-lg">
          {title}
          </h3>
          <p className="py-4">
          {message}
          </p>
          <div className="modal-action">
            <label 
            onClick={() => successAction(modalData)} 
            htmlFor="confirmation-modal" className="btn btn-warning">
              {successButtonName}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

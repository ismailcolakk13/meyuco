import React from "react";

const Spinner = ({ message = "Yükleniyor..." }) => (
  <div className="d-flex flex-column align-items-center justify-content-center py-5">
    <div className="spinner-border text-primary mb-3" style={{ width: 48, height: 48 }} role="status">
      <span className="visually-hidden">Yükleniyor...</span>
    </div>
    <div className="fw-bold text-secondary">{message}</div>
  </div>
);

export default Spinner;

import React from "react";

const InfoCard = ({dentalInfo}) => {
    const { name, description, icon, bgClass } = dentalInfo;
  return (
    <div className={`card p-4 text-white card-side bg-base-100 shadow-xl ${bgClass}`}>
      <figure>
        <img src={icon} alt="change icon" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;

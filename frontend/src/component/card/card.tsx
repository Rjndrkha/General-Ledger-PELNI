import React from "react";

interface CardComponentProps {
  href: string;
  imgSrc: string;
  imgAlt: string;
  text: string;
}

const CardComponent: React.FC<CardComponentProps> = ({
  href,
  imgSrc,
  imgAlt,
  text,
}) => {
  return (
    <a href={href}>
      <div className="hover:scale-105 transition-transform duration-300 h-44 w-full md:w-[18rem] md:h-[9rem] border flex flex-col justify-center items-center border-blue-200 shadow-lg shadow-blue-200">
        <div className="h-full flex items-center justify-center">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-32 h-32 md:w-[5rem] md:h-[5rem]"
          />
        </div>
        <div className="bg-blue-50 w-full h-[45%] bottom-0 flex items-center justify-center">
          <p className="text-sm text-blue-700 md:text-sm font-sans text-center font-semibold">
            {text}
          </p>
        </div>
      </div>
    </a>
  );
};

export default CardComponent;

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
      <div className="hover:scale-105  transition-transform duration-300 h-44 w-full md:w-[25rem] md:h-[15rem] border flex flex-col justify-center items-center border-gray-200 shadow-lg shadow-gray-400">
        <div className="h-full flex items-center justify-center">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-32 h-32 md:w-[10rem] md:h-[10rem]"
          />
        </div>
        <div className="bg-blue-50 w-full h-[35%] bottom-0 flex items-center justify-center">
          <p className="text-base text-blue-700 md:text-lg font-sans text-center font-semibold">
            {text}
          </p>
        </div>
      </div>
    </a>
  );
};

export default CardComponent;

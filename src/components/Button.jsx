import React from "react";
const Button = ({text, size}) => {
    console.log(size)
  return (
    <div>
      <button>
        <p
          
          className={ ` bg-text btn text-background rounded-lg`}
        >
          {text}
        </p>
      </button>
    </div>
  );
};

export default Button;
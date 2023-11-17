import React from "react";

const Button = (props: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => {
  return (
    <div>
      <button className="px-8 py-3 text-lg font-semibold rounded bg-uptickblue10 text-white hover:bg-upticklightb30">
        {props.title}
      </button>
    </div>
  );
};

export default Button;
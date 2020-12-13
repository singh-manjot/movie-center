import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

const Spinner = (props) => {
  const spinnerCss = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <BounceLoader
      size={props.size ? props.size : 200}
      css={spinnerCss}
      color={props.color ? props.color : "white"}
      loading={props.loading}
    />
  );
};

export default Spinner;

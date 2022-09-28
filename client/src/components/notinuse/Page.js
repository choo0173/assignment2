import React, { useEffect } from "react";
import BodyContainer from "../BodyContainer";

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | TMS`;
    window.scrollTo(0, 0);
  }, []);
  return <BodyContainer wide={props.wide}>{props.children}</BodyContainer>;
}

export default Page;

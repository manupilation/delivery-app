import React, { useEffect } from 'react';

const MetaHead = (props) => {

  useEffect(() => {
    document.title = props.title + " | Deliveree";

    document.querySelector("meta[name='description']")
    .setAttribute('content', props.description || "");
  }, [props]);

  return <></>;
};

export default MetaHead;
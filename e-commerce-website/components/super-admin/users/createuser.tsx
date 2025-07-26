"use client";
import React, { useState } from "react";
import Button from "../../button";
import UserForm from "./userform";

function Createuser({buttonText} : {buttonText:string}) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <>
      {open && <UserForm handleFunction={handleOpen}/>}
      <Button text={buttonText} handleFunction={handleOpen} />
    </>
  );
}

export default Createuser;

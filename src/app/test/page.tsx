'use client'
import VariableForm from "@/components/Tool_drawer/form";
import { useState } from "react";
const Test = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };



  return (
    <div>
      
    <VariableForm/>
    </div>

 
  )
}

export default Test
import React, { useState } from "react"

export default function SideColorList({item, setColorName}) {

  const [ chk, setChk ] = useState(false);
  const handleCheck = (name) => {
    setColorName(name)
    setChk(!chk)
  }

  return(
    <li>
      <div className="sidebar-widget-list-left">
        <button 
          onClick={() => handleCheck(item.name)}
          >
          <span className={chk ? "mark" : "checkmark"}/>
          {item.name}
        </button>
      </div>
    </li>
  );
}
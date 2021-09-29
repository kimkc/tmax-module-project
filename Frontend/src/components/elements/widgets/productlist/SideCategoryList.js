import React, { useState } from "react"

export default function SideCategoryList({item, setCategoryName}) {

  const [ chk, setChk ] = useState(false);
  const handleCheck = (name) => {
    setCategoryName(name)
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
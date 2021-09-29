import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addView } from '../redux/views/action';

const Views = ({count, addView}) => {
  const [ number, setNumber ] = useState(1)
  return(
    <div>
      <p>조회수 : {count}</p>
       type="text" value={number} onChange={(e) => setNumber(e.target.value)}/>
      <button onClick={() => addView(number)}>입력</button>
    </div>
  )
}

const mapStatetoProps = ( state ) => {
  return {
    count : state.views.count
  }
}

const mapDispatchToProps = {
  addView: (number) => addView(number)
}

export default connect( mapStatetoProps, mapDispatchToProps )( Views )
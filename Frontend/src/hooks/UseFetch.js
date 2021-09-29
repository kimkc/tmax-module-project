import { useEffect, useState } from 'react';

export default function UseFetch(url) {
  
  var process = require('../myprocess.json');

  const [ data, setData ] = useState([]);

  useEffect(() => {
    fetch(`http://${process.IP}:${process.PORT}/${url}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setData(data);
    })
    // .catch(error => console.log(error));
  },[process.IP, process.PORT, url]);

  return data;
}
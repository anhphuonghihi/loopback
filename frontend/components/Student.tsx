import React, { useEffect } from 'react'
type Props = {}
import { useDispatch, useSelector } from 'react-redux';
const Student = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    
  }, [dispatch])

  return (
    <div>Student</div>
  )
}

export default Student
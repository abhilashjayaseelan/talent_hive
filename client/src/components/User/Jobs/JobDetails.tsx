import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobDetails, clearJObDetails, clearJObId } from '../../../features/redux/slices/jobDetailsSlice';
import { RootState } from '../../../features/redux/reducers/Reducer';

function JobDetails (){
    const dispatch = useDispatch();
    const jobId: string = useSelector((state: RootState) => state.jobDetails.jobId) ?? '';
    const jobDetails = useSelector((state: RootState) => state.jobDetails.jobDetails)
    console.log(jobDetails)

    useEffect(() => {
        dispatch(fetchJobDetails(jobId));
        return ()=> {
            dispatch(clearJObDetails());
            dispatch(clearJObId());
        }
    }, [dispatch, jobId])
  return (
    <div>
      jobDetails
    </div>
  )
}

export default JobDetails;

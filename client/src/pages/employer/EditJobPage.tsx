import EditJob from "../../components/Employer/Jobs/EditJob";
import EmployerHeader from "../../components/Header/EmployerHeader";
import React from "react";

function EditJobPage() {
  return (
    <div className="bg-foundItBg">
      <EmployerHeader />
      <EditJob />
    </div>
  );
}

export default EditJobPage;

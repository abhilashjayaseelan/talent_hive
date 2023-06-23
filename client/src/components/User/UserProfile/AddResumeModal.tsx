import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner
} from "@material-tailwind/react";
import { XMarkIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { uploadResume } from "../../../features/axios/api/user/userDetails";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddResumeConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  setIsUploaded: () => void;
}

export default function AddResume({
  isOpen,
  onClose,
  setIsUploaded,
}: AddResumeConfirmationProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false)

  const handleSubmit = async () => {
    try {
      if (selectedFile) {
        setUploaded(true);
        await uploadResume(selectedFile).then((response) => {
          setIsUploaded();
          setTimeout(() => {
            toast.success("Resume uploaded successfully");
          }, 2000);
          setTimeout(() => {
            setUploaded(false);
            onClose();
          }, 2000);
        });
      }
    } catch (error) {
      onClose();
      toast.error("Failed to upload the resume");
    }
  };

  return (
    <React.Fragment>
      <Dialog open={isOpen} handler={setSelectedFile} className="z-10">
        <div className="flex items-center justify-between">
          <DialogHeader className="flex">
            Upload your resume{" "}
            <DocumentIcon className="text-purple-700 h-8 w-8 ml-4" />
          </DialogHeader>
          <XMarkIcon className="mr-3 h-5 w-5" onClick={onClose} />
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <form action="">
              <label className="relative cursor-pointer bg-red-200 hover:bg-red-300 py-2 px-4 rounded-md shadow-sm">
                <span className="text-black">Choose File</span>
                <input
                  type="file"
                  id="user-profile"
                  accept=".pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </label>
              {selectedFile && (
                <div className="flex items-center space-x-2 pt-4">
                  <DocumentIcon className="text-red-500 h-6 w-6" />
                  <span>{selectedFile.name}</span>
                </div>
              )}
            </form>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={onClose}>
            close
          </Button>
          <Button color="purple" onClick={() => handleSubmit()}>
            {uploaded ? <Spinner/> :'Upload' }
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer className="z-50" />
    </React.Fragment>
  );
}

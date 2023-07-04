import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Chip,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/reducers/Reducer";
import { updateUser } from "../../../features/axios/api/user/userDetails";

interface SkillUploadInterface {
  isOpen: boolean;
  onClose: () => void;
  setIsUploaded: () => void;
}

export default function AddKeySkillsModal({
  isOpen,
  onClose,
  setIsUploaded
}: SkillUploadInterface) {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const user = useSelector((state: RootState) => state.userDetails.userDetails);
  
  useEffect(()=> {
      setSkills(user?.skills)
  }, [user, isOpen]);

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(e.target.value);
  };

  const handleSkillAdd = () => {
    if (skill.trim() !== "") {
      setSkills((prevSkills) => [...prevSkills, skill.trim()]);
      setSkill("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkills((prevSkills) =>
      prevSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSaveSkills = async () => {
    try {
      const payload = {
        skills: [...skills],
      };
      await updateUser(payload);
      onClose();
      setIsUploaded();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    // Reset the state and close the modal
    setSkill("");
    setSkills([]);
    onClose();
  };

  return (
    <Dialog size="sm" open={isOpen ?? false} handler={handleClose}>
      <DialogHeader>Add your key skills</DialogHeader>
      <DialogBody>
        <input
          type="text"
          value={skill}
          onChange={handleSkillChange}
          placeholder="Type a skill..."
          className="mt-2 w-full p-2 border border-gray-300 rounded"
        />
        <Button color="purple" onClick={handleSkillAdd} className="mt-4">
          Add Skill
        </Button>
        <div className="flex flex-wrap mt-4">
          {skills?.map((skill) => (
            <Chip
              key={skill}
              variant="ghost"
              color="teal"
              className="rounded-full py-1.5 mr-2 mb-2"
              size="sm"
              value={skill}
              onClose={() => handleSkillRemove(skill)}
            />
          ))}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button color="red" onClick={handleClose} className="mr-2">
          Close
        </Button>
        {skills?.length > 0 && (
          <Button color="purple" onClick={handleSaveSkills}>
            Save Skills
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}

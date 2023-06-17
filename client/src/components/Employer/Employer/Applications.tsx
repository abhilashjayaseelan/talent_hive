import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { EyeIcon} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  // Button,
  CardBody,
  Chip,
  // CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { allApplications } from "../../../features/axios/api/applicatons/allApplicationEmployer";
import { jobDetails } from "../../../features/axios/api/user/jobDetails";
import { useNavigate } from "react-router-dom";
import ApplicationDetails from "../../../types/ApplicationsInterface";
 
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Applied",
    value: "Applied",
  },
  {
    label: "Shortlisted",
    value: "Shortlisted",
  },
];
 
const TABLE_HEAD = ["Candidate", "Applied For", "Application Status", "Applied on", ""];
 
export default function Applications() {
  const [applicationData, setApplicationData] = useState<ApplicationDetails[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const applications = async() => {
      const data = await allApplications();
      setApplicationData(data.applications);
    }
    applications();
  }, [])

  const handleViewApplicant = (applicatonId: string)=> {
    navigate(`/application/view-applicant/${applicatonId}`)
  }

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              All applications
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all applicants
            </Typography>
          </div>
         
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD?.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applicationData.map((data, index) => {
              const isLast = index === jobDetails.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={'https://avatars.githubusercontent.com/u/113935267?v=4'} alt={'img'} size="sm" />
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {data?.userId?.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {data?.userId?.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {data?.jobId?.title}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={data.applicationStatus === 'Applied' ? "Applied" : data.applicationStatus === 'Rejected' ? "Rejected" : "Shortlisted"}
                        color={data.applicationStatus === 'Applied' ? "green" : data.applicationStatus === 'Rejected' ? 'red' : 'orange'}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {new Date(data.createdAt).toLocaleDateString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="View Application">
                      <IconButton variant="text" color="blue-gray"
                      onClick={()=> handleViewApplicant(data._id)}>
                        <EyeIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td> 
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter> */}
    </Card>
  );
}
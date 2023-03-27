import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";

import { Spinner } from "@/components/spinner";
import { base64String } from "@/utils/utils2";

const baseurl = process.env.NEXT_PUBLIC_API_URL;

const ReactJson = dynamic(() => import("react-json-view"), {ssr: false});

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [pretty, setPretty] = useState<any>(true);
  const [loading, setLoading] = useState(false);
  const [typeFlag, setTypeFlag] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  const parseData = (data: any) => {
    const { headShot, ...rest } = data;
    return rest;
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>, flag: boolean) => {
    if (!e.target.files) {
      console.log("Err: No Files");
      return;
    }
    setLoading(true);
    setTypeFlag(flag);
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("file", file);

    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event: any) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
      validateStatus: (status: any) => true,
    };
    const response = await axios.post(
      `/api/upload?type=${flag ? "resume" : "job"}`,
      formData,
      config
    );
    setData(response.data.data);
    setLoading(false);
  };

  const handleOrgs = async () => {
    // const response = await axios.get(`/api/get-organizations`, {
      
    // });

    const response = await fetch(`/api/get-organizations`, {
      mode: "no-cors"
    })
    const x = await response.json()
    console.log("res", x)
  };
  const handleWss = async () => {
    const response = await axios.get(`/api/get-workspaces`, {});
    console.log("WORKSPACES", response.data);
  };
  const handleCols = async () => {
    const response = await axios.get(`/api/get-collections`);
    console.log("Collections", response.data);
  };
  const handleDocs = async () => {
    const response = await axios.get(`/api/get-documents`);
    console.log("Documents", response.data);
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="bg-zinc-200 rounded-md p-10 w-82">
        <h1 className="text-3xl font-bold">Affinda Playground</h1>
        <div className="mt-4">
          <div>
            <label htmlFor="upload">
              <div className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 w-fit rounded-lg flex">
                upload to resume parser
                {loading && typeFlag === true && Spinner}
              </div>
              <input
                disabled={loading && typeFlag === true}
                className="hidden"
                type="file"
                id="upload"
                onChange={(e) => onChange(e, true)}
              />
            </label>
          </div>
          <div className="mt-4">
            <label htmlFor="upload-jd">
              <div className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 w-fit rounded-lg flex">
                upload to job description{" "}
                {loading && typeFlag === false && Spinner}
              </div>
              <input
                className="hidden"
                type="file"
                id="upload-jd"
                onChange={(e) => onChange(e, false)}
              />
            </label>
          </div>
          <div className="mt-4">
            <div>
              <input
                className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={pretty}
                onChange={(e) => setPretty(e.target.checked)}
              />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="flexSwitchCheckDefault"
              >
                Pretty
              </label>
            </div>
          </div>
          <div className="flex flex-col items-start mt-10 space-y-2">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 w-fit rounded-lg flex"
              onClick={handleOrgs}
            >
              get organizations
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 w-fit rounded-lg flex"
              onClick={handleWss}
            >
              get workspaces
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 w-fit rounded-lg flex"
              onClick={handleCols}
            >
              get collections
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 w-fit rounded-lg flex"
              onClick={handleDocs}
            >
              get documents
            </button>
          </div>
        </div>
      </div>
      {data && (
        <div className="bg-gray-100 p-10 h-screen overflow-y-auto w-full">
          {pretty ? (
            <>
              <div>
                {data.headShot && (
                  <Image
                    src={`data:image/png;base64,${base64String(
                      data.headShot.data
                    )}`}
                    height={200}
                    width={200}
                    alt=""
                  />
                )}
              </div>
              <div>
                Name:{" "}
                {`${data.name.first} ${data.name.middle} ${data.name.last} ${
                  data.name.title && ", " + data.name.title
                }`}
              </div>
              <div>
                Emails:{" "}
                {data.emails.map((em: string) => (
                  <span key={em}>{em} </span>
                ))}
              </div>
              <div>Linkedin: {data.linkedin}</div>
              <div>location: {data.location && data.location.country}</div>
              <div>Birthdate: {data.dateOfBirth}</div>
              <div>Objective: {data.objective}</div>
              <div>
                Websites:{" "}
                {data.websites.map((ws: string) => (
                  <span key={ws}>{ws} </span>
                ))}
              </div>
              <div>Summary: {data.summary}</div>
              <div>
                Role: {data.profession} with {data.totalYearsExperience} years
                of experience
              </div>
              <div>
                Phone Numbers:{" "}
                {data.phoneNumbers.map((num: string) => (
                  <span key={num}>{num} </span>
                ))}
              </div>
              <div>
                languages:{" "}
                {data.languages.map((lang: string) => (
                  <span key={lang}>{lang} </span>
                ))}
              </div>
              <div className="mt-5">
                <h1 className="text-xl font-bold">work experience</h1>
                {data.workExperience.map((work: any, idx: number) => (
                  <div key={idx} className="mb-5 mt-2">
                    <span className="font-bold">
                      {work.jobTitle} @ {work.organization}
                    </span>{" "}
                    {work.dates && (
                      <span>
                        {work.dates.startDate &&
                          new Date(
                            work.dates.startDate
                          ).toLocaleDateString()}{" "}
                        -{" "}
                        {work.dates.endDate &&
                          new Date(work.dates.endDate).toLocaleDateString()}
                      </span>
                    )}
                    <p className="font-medium">
                      {work.location && work.location.ed}
                    </p>
                    <p>{work.jobDescription}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <h1 className="text-xl font-bold">education</h1>
                {data.education.map((ed: any, idx: any) => (
                  <div key={idx} className="mb-5 mt-2">
                    <span>
                      Grade: {ed.grade} - (
                      {ed.dates.completionDate &&
                        new Date(ed.dates.completionDate).toLocaleDateString()}
                      )
                    </span>
                    <p>Institute: {ed.organization}</p>
                    <p>accrediation-education: {ed.accreditation.inputStr}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <h1 className="text-xl font-bold">skills</h1>
                {data.skills.map((skl: any, idx: any) => (
                  <div key={idx} className="mb-5 mt-2">
                    <span>
                      {skl.name} - {Math.ceil(skl.numberOfMonths / 12)}.
                      {skl.numberOfMonths % 12} years
                    </span>
                  </div>
                ))}
              </div>

              <button
                className="bg-zinc-300 px-3 py-2"
                onClick={() => setShowSummary((prev) => !prev)}
              >
                {showSummary ? "Hide" : "Show"} Summary
              </button>
              {showSummary && (
                <div>
                  {data.sections.map((sct: any, idx: any) => (
                    <div key={idx} className="mb-5 mt-2">
                      <h1 className="font-bold">{sct.sectionType}</h1>
                      <p className="">{sct.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <ReactJson src={parseData(data)} collapsed={3} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

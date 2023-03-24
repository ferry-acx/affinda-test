import { Spinner } from '@/components/spinner';
import { base64String, sampleOutput } from '@/utils/utils2';
import axios from 'axios';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

export default function Home() {
  const [loading,setLoading] = useState(false);
  const [data, setData] = useState<any>(null)
  const [showSummary, setShowSummary] = useState(false);
  const [typeFlag, setTypeFlag] = useState(true)


  const onChange = async (e: ChangeEvent<HTMLInputElement>, flag:boolean) => {
    if (! e.target.files) {
      console.log("Err: No Files")
      return;
    }
    setLoading(true)
    setTypeFlag(flag);
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('file', file)

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
    const response = await axios.post(`/api/upload?type=${flag ? 'resume' : 'job'}`, formData, config);
    // console.log("RR", response.data.data)
    setData(response.data.data)
    setLoading(false)
  };

  const handleOrgs = async () => {
    const response = await axios.get("/api/get-organizations")
    console.log("ORGANIZATIONS",response.data)
  };
  const handleWss = async () => {
    const response = await axios.get("/api/get-workspaces")
    console.log("WORKSPACES", response.data);

  };
  const handleCols = async () => {
    const response = await axios.get("/api/get-collections")
    console.log("Collections", response.data);

  };
  const handleDocs = async () => {
    const response = await axios.get("/api/get-documents")
    console.log("Documents", response.data);
  };

  return (
    <div className="max-w-3xl">
      <h1 onClick={() => console.log(data)}>Affinda Playground</h1>
      <div>
        <div className="bg-red-100">
          <label htmlFor="upload">
            <div>upload to resume parser</div>
            <input
              className="hidden"
              type="file"
              id="upload"
              onChange={(e) => onChange(e, true)}
            />
          </label>
          {loading && Spinner}
        </div>
        <div className="bg-red-100">
          <label htmlFor="upload">
            <div>upload to job description</div>
            <input
              className="hidden"
              type="file"
              id="upload"
              onChange={(e) => onChange(e, false)}
            />
          </label>
          {loading && Spinner}
        </div>
        <div className="flex flex-col items-start mt-10 bg-green-100">
          <button onClick={handleOrgs}>get organizations</button>
          <button onClick={handleWss}>get workspaces</button>
          <button onClick={handleCols}>get collections</button>
          <button onClick={handleDocs}>get documents</button>
        </div>
      </div>
      {data && (
        <div className="bg-gray-100 p-10">
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
          <div>location: {data.location}</div>
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
            Role: {data.profession} with {data.totalYearsExperience} years of
            experience
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
                      new Date(work.dates.startDate).toLocaleDateString()}{" "}
                    -{" "}
                    {work.dates.endDate &&
                      new Date(work.dates.endDate).toLocaleDateString()}
                  </span>
                )}
                <p className="font-medium">{work.location && work.location.formatted}</p>
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
        </div>
      )}
    </div>
  );
}

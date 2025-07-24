import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const dummyUsername = "John Doe";
const dummyReports = [
  {
    id: "rpt1",
    disease: "Diabetes",
    date: "2025-07-20",
    summary: "High blood sugar detected",
  },
  {
    id: "rpt2",
    disease: "Hypertension",
    date: "2025-07-15",
    summary: "Elevated blood pressure levels",
  },
];

const Info = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Welcome Message */}
      <section>
        <h1 className="text-2xl font-bold mb-2">Welcome, {dummyUsername}!</h1>
        <p className="text-base text-muted-foreground mb-4">Ready to take control of your health?</p>
      </section>

      {/* Diagnose Now Card */}
      <section>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center mb-6">
          <h2 className="text-lg font-semibold mb-2">Diagnose Now</h2>
          <p className="mb-4 text-sm text-muted-foreground">Start a new diagnosis for any disease or symptoms.</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => navigate(`/${userId}/details`)}
          >
            Start Diagnosis
          </button>
        </div>
      </section>

      {/* Previous Reports */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Previous Reports</h2>
        <div className="space-y-4">
          {dummyReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/${userId}/${report.id}/result`)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-blue-700">{report.disease}</span>
                <span className="text-xs text-muted-foreground">{report.date}</span>
              </div>
              <p className="text-sm">{report.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Info;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Result = () => {
  const { userId, reportId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError("");
      try {
        const reportDoc = await getDoc(doc(db, 'diagnosisReports', reportId));
        if (!reportDoc.exists()) throw new Error('Report not found');
        setReport(reportDoc.data());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId]);

  if (loading) return <div className="max-w-2xl mx-auto p-6">Loading report...</div>;
  if (error) return <div className="max-w-2xl mx-auto p-6 text-red-600">{error}</div>;
  if (!report || !report.geminiResponse) return <div className="max-w-2xl mx-auto p-6">No report data available.</div>;

  const gemini = report.geminiResponse;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Health Report</h1>
      <p className="text-base text-muted-foreground mb-6">Report ID: {reportId} | User ID: {userId}</p>

      {/* 1. Predicted Diseases */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Predicted Diseases</h2>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">Disease</th>
                <th className="px-3 py-2 border">Probability</th>
                <th className="px-3 py-2 border">Severity</th>
              </tr>
            </thead>
            <tbody>
              {(gemini.predictedDisease || []).map((d, idx) => (
                <tr key={idx} className="text-center">
                  <td className="px-3 py-2 border">{d.name || d}</td>
                  <td className="px-3 py-2 border">{d.probability || ''}</td>
                  <td className="px-3 py-2 border">{d.severity || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 2. Personalized Guidance */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Personalized Guidance</h2>
        <ul className="list-disc pl-6 mb-4">
          {(gemini.personalizedGuidance || []).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 3. Prevention Strategies */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Prevention Strategies</h2>
        <ul className="list-disc pl-6 mb-4">
          {(gemini.preventionStrategies || []).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 4. Recommended Exercise */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Recommended Exercise</h2>
        <ul className="list-disc pl-6 mb-4">
          {(gemini.recommendedExercise || []).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 5. Nutrition Guidance */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Nutrition Guidance</h2>
        <ul className="list-disc pl-6 mb-4">
          {(gemini.nutritionGuidance || []).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 6. Precautionary Measures */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Precautionary Measures</h2>
        <ul className="list-disc pl-6 mb-4">
          {(gemini.precautionaryMeasures || []).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 7. Home Remedies */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Home Remedies</h2>
        <ul className="list-disc pl-6 mb-4">
          {(gemini.homeRemedies || []).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Result;
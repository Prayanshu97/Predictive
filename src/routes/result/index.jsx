import React from "react";
import { useParams } from "react-router-dom";

const dummyReport = {
  "predictedDisease": [
    {
      "name": "Viral Fever",
      "probability": "70%",
      "severity": "Mild"
    },
    {
      "name": "Common Cold",
      "probability": "20%",
      "severity": "Mild"
    },
    {
      "name": "Sinusitis (due to dust allergy trigger)",
      "probability": "10%",
      "severity": "Mild"
    }
  ],
  "personalizedGuidance": [
    "Monitor your temperature regularly.",
    "Rest adequately to aid recovery.",
    "Stay well-hydrated by drinking plenty of fluids.",
    "Avoid exposure to dust, given your allergy."
  ],
  "preventionStrategies": [
    "Maintain good hand hygiene (frequent washing).",
    "Avoid close contact with sick individuals.",
    "Ensure your living environment is clean and dust-free.",
    "Consider a flu shot seasonally if recommended by your physician."
  ],
  "recommendedExercise": [
    "Given your current symptoms, avoid strenuous exercise.",
    "Light activities like short walks can be resumed once fever subsides and you feel better.",
    "Focus on rest during this period."
  ],
  "nutritionGuidance": [
    "Consume easily digestible, nutrient-rich vegetarian foods.",
    "Include fruits and vegetables high in Vitamin C (e.g., oranges, bell peppers).",
    "Ensure adequate protein intake for recovery (e.g., lentils, tofu).",
    "Avoid spicy or oily foods that might irritate your system."
  ],
  "precautionaryMeasures": [
    "If symptoms worsen or persist beyond 3-4 days, consult a general physician.",
    "Watch out for new symptoms like difficulty breathing, severe body aches, or persistent high fever.",
    "Avoid self-medication without professional advice."
  ],
  "homeRemedies": [
    "For fever: Lukewarm sponge bath, drink warm fluids like herbal tea.",
    "For headache: Rest in a quiet, dark room, apply a cold compress to the forehead.",
    "Gargle with warm salt water if any throat irritation develops (though not currently present)."
  ],
  "summaryReport": "Ajay, 31, Male. Current symptoms: Slight fever, headache (mild, 2 days). Predicted diseases: Viral Fever (70%), Common Cold (20%), Sinusitis (10%)."
}


const Result = () => {
  const { userId, reportId } = useParams();
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
              {dummyReport.predictedDisease.map((d, idx) => (
                <tr key={idx} className="text-center">
                  <td className="px-3 py-2 border">{d.name}</td>
                  <td className="px-3 py-2 border">{d.probability}</td>
                  <td className="px-3 py-2 border">{d.severity}</td>
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
          {dummyReport.personalizedGuidance.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 3. Prevention Strategies */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Prevention Strategies</h2>
        <ul className="list-disc pl-6 mb-4">
          {dummyReport.preventionStrategies.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 4. Recommended Exercise */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Recommended Exercise</h2>
        <ul className="list-disc pl-6 mb-4">
          {dummyReport.recommendedExercise.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 5. Nutrition Guidance */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Nutrition Guidance</h2>
        <ul className="list-disc pl-6 mb-4">
          {dummyReport.nutritionGuidance.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 6. Precautionary Measures */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Precautionary Measures</h2>
        <ul className="list-disc pl-6 mb-4">
          {dummyReport.precautionaryMeasures.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 7. Home Remedies */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Home Remedies</h2>
        <ul className="list-disc pl-6 mb-4">
          {dummyReport.homeRemedies.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Result;
import React from "react";
import { useParams } from "react-router-dom";

const dummyReport = {
  personalizedGuidance: "Based on your recent symptoms and medical history, we recommend regular monitoring and timely follow-ups with your healthcare provider.",
  preventionStrategies: [
    "Maintain a healthy weight.",
    "Monitor blood pressure and sugar levels regularly.",
    "Avoid smoking and limit alcohol consumption.",
  ],
  recommendedExercise: [
    "Brisk walking for 30 minutes daily.",
    "Yoga and stretching exercises.",
    "Light strength training twice a week.",
  ],
  nutritionGuidance: [
    "Increase intake of fresh fruits and vegetables.",
    "Opt for whole grains and lean proteins.",
    "Limit processed foods, salt, and sugar.",
  ],
  precautionaryMeasures: [
    "Wash hands frequently to prevent infections.",
    "Avoid close contact with sick individuals.",
    "Keep emergency medications accessible.",
  ],
  homeRemedies: [
    "Warm saline gargles for sore throat.",
    "Steam inhalation for congestion.",
    "Stay hydrated with herbal teas.",
  ],
};

const Result = () => {
  const { userId, reportId } = useParams();
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Health Report</h1>
      <p className="text-base text-muted-foreground mb-6">Report ID: {reportId} | User ID: {userId}</p>

      {/* 1. Personalized Guidance */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Personalized Guidance</h2>
        <p className="text-base mb-4">{dummyReport.personalizedGuidance}</p>
      </section>

      {/* 2. Prevention Strategies */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Prevention Strategies</h2>
        <ul className="list-disc pl-6 mb-4">
          {dummyReport.preventionStrategies.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 3. Recommended Exercise */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Recommended Exercise</h2>
        <ul className="list-disc pl-6 mb-4">
          {dummyReport.recommendedExercise.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 4. Nutrition Guidance */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Nutrition Guidance</h2>
        <ul className="list-disc pl-6 mb-4">
          {dummyReport.nutritionGuidance.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 5. Precautionary Measures */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Precautionary Measures</h2>
        <ul className="list-disc pl-6 mb-4">
          {dummyReport.precautionaryMeasures.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* 6. Home Remedies */}
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
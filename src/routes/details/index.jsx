import React from 'react';
import { useParams } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { getGeminiResponse } from '@/services/AIModel';
import { AI_PROMPT } from '@/constants/prompt';


const Details = () => {
  const { userId } = useParams();

  const geminiResponse = getGeminiResponse(AI_PROMPT);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <section>
        <h2 className="text-lg font-semibold mb-4">Primary Symptoms</h2>
        <Input type="text" placeholder="e.g. Fever, Cough, Headache" />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Secondary Symptoms</h2>
        <Input type="text" placeholder="e.g. Fatigue, Sore Throat, Body Ache" />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Symptoms Severity</h2>
        <div>
          <label className="block mb-1">Select Severity</label>
          <select className="w-full border rounded-md px-3 py-2">
            <option value="">Select Severity</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Duration</h2>
        <Input type="text" placeholder="e.g. 3 days, 1 week" />
      </section>
    </div>
  );
};

export default Details; 
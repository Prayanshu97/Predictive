import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { getGeminiResponse } from '@/services/AIModel';
import { AI_PROMPT } from '@/constants/prompt';
import { db } from '@/services/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const Details = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    primarySymptoms: '',
    secondarySymptoms: '',
    severity: '',
    duration: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Fetch user profile
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (!userDoc.exists()) throw new Error('User profile not found');
      const profile = userDoc.data();

      // Fetch most recent diagnosis summary (optional, can be empty)
      // For now, leave as empty string
      const recentDiagnosisSummary = '';

      // Fill prompt
      const prompt = AI_PROMPT
        .replace('{name}', profile.name || '')
        .replace('{age}', profile.age || '')
        .replace('{gender}', profile.gender || '')
        .replace('{medicalConditions}', profile.medicalConditions || '')
        .replace('{chronicIllnesses}', profile.chronicIllnesses || '')
        .replace('{allergies}', profile.allergies || '')
        .replace('{familyHistory}', profile.familyHistory || '')
        .replace('{medications}', profile.medications || '')
        .replace('{activityLevel}', profile.activityLevel || '')
        .replace('{dietaryPreferences}', profile.dietaryPreferences || '')
        .replace('{primarySymptoms}', form.primarySymptoms)
        .replace('{secondarySymptoms}', form.secondarySymptoms)
        .replace('{severity}', form.severity)
        .replace('{duration}', form.duration)
        .replace('{recentDiagnosisSummary}', recentDiagnosisSummary);

      // Get Gemini response
      const geminiRaw = await getGeminiResponse(prompt);
      let gemini;
      try {
        gemini = JSON.parse(geminiRaw);
      } catch (err) {
        throw new Error('AI response is not valid JSON');
      }

      // Create diagnosis report
      const reportId = uuidv4();
      const report = {
        userId,
        reportId,
        ...profile,
        ...form,
        recentDiagnosisSummary,
        geminiResponse: gemini,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'diagnosisReports', reportId), report);
      // Redirect to result page with reportId
      navigate(`/${userId}/${reportId}/result`, { state: { geminiResponse: gemini } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-8">
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <section>
        <h2 className="text-lg font-semibold mb-4">Primary Symptoms</h2>
        <Input type="text" name="primarySymptoms" value={form.primarySymptoms} onChange={handleChange} placeholder="e.g. Fever, Cough, Headache" required />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Secondary Symptoms</h2>
        <Input type="text" name="secondarySymptoms" value={form.secondarySymptoms} onChange={handleChange} placeholder="e.g. Fatigue, Sore Throat, Body Ache OR None" required />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Symptoms Severity</h2>
        <div>
          <label className="block mb-1">Select Severity</label>
          <select name="severity" value={form.severity} onChange={handleChange} className="w-full border rounded-md px-3 py-2" required>
            <option value="">Select Severity</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Duration</h2>
        <Input type="text" name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. 3 days, 1 week" required />
      </section>
      <button type="submit" className="mt-6 px-6 py-2 gradient-primary text-white rounded-xl hover:shadow-glow transition-all duration-300 font-semibold" disabled={loading}>
        {loading ? 'Generating Report...' : 'Generate Diagnosis Report'}
      </button>
    </form>
  );
};

export default Details; 
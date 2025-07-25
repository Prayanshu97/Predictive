import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { userId } = useParams();

  // State for all fields
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    medicalConditions: "",
    chronicIllnesses: "",
    allergies: "",
    familyHistory: "",
    medications: "",
    activityLevel: "",
    dietaryPreferences: ""
  });
  const [loading, setLoading] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      setCheckingProfile(true);
      setError("");
      try {
        const uid = userId || user?.id;
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          setProfileExists(true);
          setForm({ ...form, ...userDoc.data(), age: userDoc.data().age?.toString() || "" });
        }
      } catch (err) {
        setError("Error checking profile: " + err.message);
      } finally {
        setCheckingProfile(false);
      }
    };
    if (userId || user?.id) checkProfile();
    // eslint-disable-next-line
  }, [userId, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uid = userId || user?.id;
      await setDoc(doc(db, "users", uid), {
        ...form,
        age: form.age ? Number(form.age) : null,
      });
      setProfileExists(true);
      navigate(`/${uid}/info`);
    } catch (err) {
      alert("Error saving profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const uid = userId || user?.id;
      await deleteDoc(doc(db, "users", uid));
      setEditing(true);
      setProfileExists(false);
    } catch (err) {
      alert("Error updating profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingProfile) {
    return <div className="max-w-2xl mx-auto p-6">Checking profile...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-8">
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {profileExists && !editing && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-300 rounded flex items-center justify-between">
          <span>Your profile is up to date.</span>
          <button type="button" className="ml-4 px-4 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700" onClick={() => setEditing(true)}>
            Update Profile
          </button>
        </div>
      )}
      {/* Basic User Information */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Basic User Information</h2>
        <div className="space-y-4">
          <Input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" disabled={profileExists && !editing} required />
          <Input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age (in years)" min={0} disabled={profileExists && !editing} required />
          <div>
            <label className="block mb-1">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded-md px-3 py-2" disabled={profileExists && !editing} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </section>

      {/* Medical History & Risk Factors */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Medical History & Risk Factors</h2>
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-medium mb-1">Pre-existing Medical Conditions</h2>
            <Input type="text" name="medicalConditions" value={form.medicalConditions} onChange={handleChange} placeholder="e.g. Diabetes, Hypertension, Heart Disease, Asthma OR None" disabled={profileExists && !editing} required />
          </div>
          <div>
            <h2 className="text-base font-medium mb-1">Chronic Illnesses</h2>
            <Input type="text" name="chronicIllnesses" value={form.chronicIllnesses} onChange={handleChange} placeholder="e.g. Kidney Disease, Arthritis, Thyroid Disorders OR None" disabled={profileExists && !editing} required />
          </div>
          <div>
            <h2 className="text-base font-medium mb-1">Allergies</h2>
            <Input type="text" name="allergies" value={form.allergies} onChange={handleChange} placeholder="e.g. Food, Medication, Environmental OR None" disabled={profileExists && !editing} required />
          </div>
          <div>
            <h2 className="text-base font-medium mb-1">Family Medical History</h2>
            <Input type="text" name="familyHistory" value={form.familyHistory} onChange={handleChange} placeholder="e.g. Cancer, Heart Disease, Diabetes OR None" disabled={profileExists && !editing} required />
          </div>
          <div>
            <h2 className="text-base font-medium mb-1">Medications Currently Taken</h2>
            <Input type="text" name="medications" value={form.medications} onChange={handleChange} placeholder="e.g. Prescription drugs, supplements, treatments OR None" disabled={profileExists && !editing} required />
          </div>
        </div>
      </section>

      {/* Lifestyle & Daily Habits */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Lifestyle & Daily Habits</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Physical Activity Level</label>
            <select name="activityLevel" value={form.activityLevel} onChange={handleChange} className="w-full border rounded-md px-3 py-2" disabled={profileExists && !editing} required>
              <option value="">Select Activity Level</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Lightly Active">Lightly Active</option>
              <option value="Moderately Active">Moderately Active</option>
              <option value="Very Active">Very Active</option>
            </select>
          </div>
          <div>
            <h2 className="block mb-1 text-base font-medium">Dietary Preferences</h2>
            <select name="dietaryPreferences" value={form.dietaryPreferences} onChange={handleChange} className="w-full border rounded-md px-3 py-2" disabled={profileExists && !editing} required>
              <option value="">Select Dietary Preference</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
          </div>
        </div>
      </section>
      {!profileExists && (
        <button type="submit" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      )}
      {profileExists && editing && (
        <button type="submit" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      )}
    </form>
  );
}

export default Profile;
import React from "react";
import { Input } from "@/components/ui/input";

function Profile() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">

      {/* Basic User Information */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Basic User Information</h2>
        <div className="space-y-4">
          <Input type="text" placeholder="Full Name (Optional)" />
          <Input type="number" placeholder="Age (in years)" min={0} />
          <div>
            <label className="block mb-1">Gender</label>
            <select className="w-full border rounded-md px-3 py-2">
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
            <Input type="text" placeholder="e.g. Diabetes, Hypertension, Heart Disease, Asthma" />
          </div>
          <div>
            <h2 className="text-base font-medium mb-1">Chronic Illnesses</h2>
            <Input type="text" placeholder="e.g. Kidney Disease, Arthritis, Thyroid Disorders" />
          </div>
          <div>
            <h2 className="text-base font-medium mb-1">Allergies</h2>
            <Input type="text" placeholder="e.g. Food, Medication, Environmental" />
          </div>
          <div>
            <h2 className="text-base font-medium mb-1">Family Medical History</h2>
            <Input type="text" placeholder="e.g. Cancer, Heart Disease, Diabetes" />
          </div>
          <div>
            <h2 className="text-base font-medium mb-1">Medications Currently Taken</h2>
            <Input type="text" placeholder="e.g. Prescription drugs, supplements, herbal treatments" />
          </div>
        </div>
      </section>

      {/* Lifestyle & Daily Habits */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Lifestyle & Daily Habits</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Physical Activity Level</label>
            <select className="w-full border rounded-md px-3 py-2">
              <option value="">Select Activity Level</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Lightly Active">Lightly Active</option>
              <option value="Moderately Active">Moderately Active</option>
              <option value="Very Active">Very Active</option>
            </select>
          </div>
          <div>
            <h2 className="block mb-1 text-base font-medium">Dietary Preferences</h2>
            <select className="w-full border rounded-md px-3 py-2">
              <option value="">Select Dietary Preference</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Smoking & Alcohol Consumption</label>
            <select className="w-full border rounded-md px-3 py-2">
              <option value="">Select Option</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
              <option value="Occasionally">Occasionally</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
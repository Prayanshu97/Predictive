import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { useUser } from '@clerk/clerk-react';

const Info = () => {
  const { userId } = useParams();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [checkingProfile, setCheckingProfile] = useState(false);
  const [error, setError] = useState("");
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      setLoadingReports(true);
      setError("");
      try {
        const q = query(
          collection(db, 'diagnosisReports'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetchedReports = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setReports(fetchedReports);
      } catch (err) {
        setError("Error fetching reports: " + err.message);
      } finally {
        setLoadingReports(false);
      }
    };
    if (userId) fetchReports();
  }, [userId]);

  const handleDiagnoseNow = async () => {
    setCheckingProfile(true);
    setError("");
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (!userDoc.exists()) {
        navigate(`/${userId}/profile`);
      } else {
        navigate(`/${userId}/details`);
      }
    } catch (err) {
      setError("Error checking profile: " + err.message);
    } finally {
      setCheckingProfile(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      {/* Welcome Message */}
      <section>
        <h1 className="text-2xl font-bold mb-2">Welcome, {!isLoaded ? '...' : (user?.fullName || user?.username || user?.emailAddress || 'User')}!</h1>
        <p className="text-base text-muted-foreground mb-4">Ready to take control of your health?</p>
      </section>

      {/* Diagnose Now Card */}
      <section>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center mb-6">
          <h2 className="text-lg font-semibold mb-2">Diagnose Now</h2>
          <p className="mb-4 text-sm text-muted-foreground">Start a new diagnosis for any disease or symptoms.</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleDiagnoseNow}
            disabled={checkingProfile}
          >
            {checkingProfile ? 'Checking Profile...' : 'Start Diagnosis'}
          </button>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>
      </section>

      {/* Previous Reports */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Previous Reports</h2>
        {loadingReports ? (
          <div>Loading reports...</div>
        ) : reports.length === 0 ? (
          <div className="text-gray-500">No previous reports found.</div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/${userId}/${report.reportId}/result`)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-blue-700">{new Date(report.createdAt).toLocaleString()}</span>
                  {/* Optionally, you can show the reportId or other info here */}
                </div>
                <p className="text-sm">{report.geminiResponse?.summaryReport || 'No summary available.'}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Info;
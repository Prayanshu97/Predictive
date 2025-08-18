import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui/button';

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-modern border border-white/20 dark:border-gray-700/20 p-12">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <span className="text-muted-foreground">Loading your health report...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-modern border border-white/20 dark:border-gray-700/20 p-12 text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <use href="/icons/sprite.svg#error" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Error Loading Report</h3>
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  if (!report || !report.geminiResponse) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-modern border border-white/20 dark:border-gray-700/20 p-12 text-center">
          <div className="w-16 h-16 bg-muted dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <use href="/icons/sprite.svg#document-text" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No Report Data</h3>
          <p className="text-muted-foreground">No report data available.</p>
        </div>
      </div>
    );
  }

  const gemini = report.geminiResponse;

  const handleDownloadPdf = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      const userProfile = userDoc.exists() ? userDoc.data() : {};

      const docPdf = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = docPdf.internal.pageSize.getWidth();
      const pageHeight = docPdf.internal.pageSize.getHeight();
      const margin = 48;
      let cursorY = margin;

      const addHeading = (text) => {
        docPdf.setFont('helvetica', 'bold');
        docPdf.setFontSize(18);
        docPdf.text(text, margin, cursorY);
        cursorY += 20;
      };

      const addSubheading = (text) => {
        docPdf.setFont('helvetica', 'bold');
        docPdf.setFontSize(14);
        docPdf.text(text, margin, cursorY);
        cursorY += 16;
      };

      const addParagraph = (text) => {
        docPdf.setFont('helvetica', 'normal');
        docPdf.setFontSize(12);
        const maxWidth = pageWidth - margin * 2;
        const lines = docPdf.splitTextToSize(String(text ?? ''), maxWidth);
        lines.forEach((line) => {
          if (cursorY > pageHeight - margin) {
            docPdf.addPage();
            cursorY = margin;
          }
          docPdf.text(line, margin, cursorY);
          cursorY += 16;
        });
      };

      const addKeyValue = (label, value) => {
        if (value === undefined || value === null || value === '') return;
        docPdf.setFont('helvetica', 'bold');
        docPdf.setFontSize(12);
        const labelText = `${label}: `;
        const labelWidth = docPdf.getTextWidth(labelText);
        if (cursorY > pageHeight - margin) { docPdf.addPage(); cursorY = margin; }
        docPdf.text(labelText, margin, cursorY);
        docPdf.setFont('helvetica', 'normal');
        const maxWidth = pageWidth - margin * 2 - labelWidth;
        const lines = docPdf.splitTextToSize(String(value), maxWidth);
        docPdf.text(lines, margin + labelWidth, cursorY);
        cursorY += Math.max(16, lines.length * 14);
      };

      const addBullets = (items) => {
        if (!items) return;
        const array = Array.isArray(items) ? items : [items];
        docPdf.setFont('helvetica', 'normal');
        docPdf.setFontSize(12);
        const maxWidth = pageWidth - margin * 2 - 14;
        array.forEach((item) => {
          const lines = docPdf.splitTextToSize(String(item ?? ''), maxWidth);
          if (cursorY > pageHeight - margin) { docPdf.addPage(); cursorY = margin; }
          docPdf.text('•', margin, cursorY);
          docPdf.text(lines, margin + 14, cursorY);
          cursorY += Math.max(16, lines.length * 14);
        });
      };

      // 1. User profile details
      addHeading('User Profile');
      addKeyValue('Full Name', userProfile.name || 'N/A');
      addKeyValue('Age', userProfile.age != null ? `${userProfile.age}` : 'N/A');
      addKeyValue('Gender', userProfile.gender || 'N/A');
      addKeyValue('Medical Conditions', userProfile.medicalConditions || 'N/A');
      addKeyValue('Chronic Illnesses', userProfile.chronicIllnesses || 'N/A');
      addKeyValue('Allergies', userProfile.allergies || 'N/A');
      addKeyValue('Family History', userProfile.familyHistory || 'N/A');
      addKeyValue('Medications', userProfile.medications || 'N/A');
      addKeyValue('Activity Level', userProfile.activityLevel || 'N/A');
      addKeyValue('Dietary Preferences', userProfile.dietaryPreferences || 'N/A');
      cursorY += 10;

      // 2. Suitable heading for current diagnostic and date
      addHeading('Current Diagnostic');
      addParagraph(`Generated on ${new Date(report.createdAt).toLocaleDateString()}`);
      cursorY += 4;

      // 3. Summary of the report
      addSubheading('Summary');
      addParagraph(gemini.summaryReport || 'No summary available.');
      cursorY += 8;

      // 4. Contents of the result page
      addHeading('Detailed Recommendations');

      // Predicted Diseases
      if (gemini.predictedDisease) {
        addSubheading('Diagnosis Results');
        const list = Array.isArray(gemini.predictedDisease) ? gemini.predictedDisease.map((d) => (typeof d === 'string' ? d : d?.name || d)) : [gemini.predictedDisease];
        addBullets(list);
        cursorY += 4;
      }

      const sectionDefs = [
        { title: 'Personalized Guidance', items: gemini.personalizedGuidance },
        { title: 'Prevention Strategies', items: gemini.preventionStrategies },
        { title: 'Recommended Exercise', items: gemini.recommendedExercise },
        { title: 'Nutrition Guidance', items: gemini.nutritionGuidance },
        { title: 'Precautionary Measures', items: gemini.precautionaryMeasures },
        { title: 'Home Remedies', items: gemini.homeRemedies },
      ];

      sectionDefs.forEach((sec) => {
        if (sec.items && (Array.isArray(sec.items) ? sec.items.length > 0 : true)) {
          addSubheading(sec.title);
          addBullets(sec.items);
          cursorY += 6;
        }
      });

      const filename = `Health_Report_${new Date(report.createdAt).toISOString().slice(0,10)}.pdf`;
      docPdf.save(filename);
    } catch (e) {
      console.error('Error generating PDF', e);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const renderSection = (title, items, icon, color = "primary") => {
    if (!items || items.length === 0) return null;
    
    return (
      <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-modern border border-white/20 dark:border-gray-700/20 p-8 animate-fade-in-up">
        <div className="flex items-center space-x-3 mb-6">
          <div className={`w-12 h-12 gradient-${color} rounded-2xl flex items-center justify-center`}>
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>
        <div className="space-y-4">
          {Array.isArray(items) ? items.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-4 bg-muted/30 dark:bg-gray-700/30 rounded-xl border border-border/100 dark:border-gray-600/20">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground leading-relaxed">{item}</p>
            </div>
          )) : (
            <div className="p-4 bg-muted/30 dark:bg-gray-700/30 rounded-xl border border-border/100 dark:border-gray-600/20">
              <p className="text-foreground leading-relaxed">{items}</p>
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <use href="/icons/sprite.svg#check-circle" />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Health Report
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Your personalized health assessment and recommendations
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            Generated on {new Date(report.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="space-y-8">
          {/* Predicted Diseases - Now as normal text */}
          {gemini.predictedDisease && (
            <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-modern border border-white/20 dark:border-gray-700/20 p-8 animate-slide-in-left">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <use href="/icons/sprite.svg#bar-chart" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground">Diagnosis Results</h2>
              </div>
              <div className="space-y-4">
                {Array.isArray(gemini.predictedDisease) ? gemini.predictedDisease.map((disease, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 bg-muted/30 dark:bg-gray-700/30 rounded-xl border border-border/100 dark:border-gray-600/20">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">{typeof disease === 'string' ? disease : disease.name || disease}</p>
                </div>
                )) : (
                  <div className="flex items-start space-x-3 p-4 bg-muted/30 dark:bg-gray-700/30 rounded-xl border border-border/100 dark:border-gray-600/20">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground leading-relaxed">{gemini.predictedDisease}</p>
                </div>
                  // <div className="p-4 from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl border border-primary/20 dark:border-primary/30">
                  //   <p className="text-foreground font-medium leading-relaxed">{gemini.predictedDisease}</p>
                  // </div>
                )}
              </div>
            </section>
          )}

          {/* Personalized Guidance */}
          {renderSection(
            "Personalized Guidance",
            gemini.personalizedGuidance,
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <use href="/icons/sprite.svg#lightbulb-sparkles" />
            </svg>,
            "secondary"
          )}

          {/* Prevention Strategies */}
          {renderSection(
            "Prevention Strategies",
            gemini.preventionStrategies,
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <use href="/icons/sprite.svg#lock-closed" />
            </svg>,
            "primary"
          )}

          {/* Recommended Exercise */}
          {renderSection(
            "Recommended Exercise",
            gemini.recommendedExercise,
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <use href="/icons/sprite.svg#bolt-trend" />
            </svg>,
            "secondary"
          )}

          {/* Nutrition Guidance */}
          {renderSection(
            "Nutrition Guidance",
            gemini.nutritionGuidance,
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <use href="/icons/sprite.svg#shopping-cart" />
            </svg>,
            "primary"
          )}

          {/* Precautionary Measures */}
          {renderSection(
            "Precautionary Measures",
            gemini.precautionaryMeasures,
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <use href="/icons/sprite.svg#shield-exclamation" />
            </svg>,
            "secondary"
          )}

          {/* Home Remedies */}
          {renderSection(
            "Home Remedies",
            gemini.homeRemedies,
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <use href="/icons/sprite.svg#beaker" />
            </svg>,
            "primary"
          )}

          <div className="pt-2 pb-6 flex justify-center">
            <Button onClick={handleDownloadPdf} className="gradient-primary text-white text-base px-6 py-3 rounded-xl hover:shadow-glow transition-all duration-300">
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
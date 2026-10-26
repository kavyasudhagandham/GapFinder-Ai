"use client";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, FileUp } from 'lucide-react';
export default function UploadPage(){
    const router = useRouter();

    const handleContinue = async () => {
  if (!file) {
    console.error("Please select a file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      "/api/extract",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    console.log("API status:", response.status);
    console.log("API result:", result);

    if (!response.ok) {
      throw new Error(
        result.message || "Extraction failed"
      );
    }

    console.log("API result:", result);

if (result.success) {
  sessionStorage.setItem("extractionResult", JSON.stringify(result));
  router.push("/dashboard");
}
  } catch (error) {
    console.error("API error:", error);
  }
};
    const [file,setFile]=useState<File|null>(null);const [subject,setSubject]=useState('');const [message,setMessage]=useState('');return <main className="mx-auto min-h-screen max-w-3xl px-5 py-8"><Link href="/dashboard" className="text-sm text-slate-500"><ArrowLeft className="mr-1 inline" size={15}/> Dashboard</Link><h1 className="mt-7 text-3xl font-bold">Upload study material</h1><p className="mt-2 leading-7 text-slate-600">Choose a subject and select a PDF or text file. This starter screen demonstrates the flow; secure file storage and AI processing still need to be connected.</p><form className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6" onSubmit={e=>{e.preventDefault();setMessage(file?`Selected “${file.name}” for ${subject||'your subject'}. File processing is not connected yet.`:'Please select a file first.')}}><label className="block text-sm font-semibold">Subject or course<input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="e.g. Operating Systems" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-indigo-500"/></label><label className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/50 px-6 py-10 text-center"><FileUp size={32} className="text-indigo-600"/><span className="mt-3 font-semibold">Choose a PDF or text file</span><span className="mt-1 text-sm text-slate-500">Select a syllabus, notes or chapter</span><input type="file" accept=".pdf,.txt,.md" className="mt-4 max-w-full text-sm" onChange={e=>setFile(e.target.files?.[0]??null)}/>{file&&<span className="mt-3 text-sm font-medium text-indigo-700">Selected: {file.name}</span>}</label>
<button
  type="button"
  onClick={handleContinue}
  className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
>
  Continue
</button>{message&&<p role="status" className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">{message}</p>}</form><p className="mt-4 text-sm text-slate-500">Security note: never upload private or sensitive documents into a prototype without appropriate access controls.</p></main>}

"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, CalendarDays, CircleHelp, FileUp, Target } from 'lucide-react';
const topics = [{name:'Data Structures',score:82,status:'Strong',color:'bg-emerald-100 text-emerald-700'},{name:'Database Systems',score:54,status:'Medium',color:'bg-amber-100 text-amber-700'},{name:'Operating Systems',score:31,status:'Weak',color:'bg-rose-100 text-rose-700'}];
export default function Dashboard(){
    
  const [extraction, setExtraction] = useState<any>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("extractionResult");
    if (saved) {
      setExtraction(JSON.parse(saved));
    }
  }, []);

    return <main className="mx-auto min-h-screen max-w-6xl px-5 py-8 sm:px-8">
    <Link href="/" className="text-sm text-slate-500"><ArrowLeft className="mr-1 inline" size={15}/> Home</Link>
    <header className="mt-6 flex flex-wrap items-start justify-between gap-4"><div>
        <p className="text-sm font-semibold text-indigo-600">STUDENT WORKSPACE</p>
        <h1 className="mt-1 text-3xl font-bold">Your learning dashboard</h1>
        <p className="mt-2 text-slate-600">A demo overview with sample data to show how GapFinder will work.</p></div>
<Link href="/upload" className="rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white">
<FileUp className="mr-2 inline" size={17}/> Upload material</Link></header>
<div className="mt-8 grid gap-4 sm:grid-cols-3">{[{label:'Topics assessed',value:'3',icon:BookOpen},
    {label:'Average mastery',value:'56%',icon:Target},
    {label:'Study plan',value:'3 sessions',icon:CalendarDays}].map(s=><div key={s.label} className="rounded-2xl border border-slate-200 bg-white p-5">
        <s.icon className="text-indigo-600" size={22}/><p className="mt-4 text-sm text-slate-500">{s.label}</p>
        <p className="mt-1 text-2xl font-bold">{s.value}</p></div>)}</div>
<section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
    <h2 className="text-xl font-bold">Topic gap report</h2>
    <p className="mt-1 text-sm text-slate-500">These are illustrative scores, not an actual diagnosis.</p>
    <div className="mt-5 space-y-5">{topics.map(t=><div key={t.name}>
        <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold">{t.name}</span>
            <div className="flex items-center gap-3"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${t.color}`}>{t.status}</span>
            <span className="w-12 text-right text-sm">{t.score}%</span></div></div>
            <div className="mt-2 h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full ${t.status==='Strong'?'bg-emerald-500':t.status==='Medium'?'bg-amber-500':'bg-rose-500'}`} style={{width:`${t.score}%`}}/></div></div>)}</div>
            <div className="mt-6 rounded-xl bg-indigo-50 p-4 text-sm leading-6 text-indigo-950"><b>Suggested revision order:</b> Operating Systems → Database Systems → Data Structures. The real plan will be generated from quiz results and the time you have available.</div></section>
            <div className="mt-6 grid gap-4 sm:grid-cols-2"><Link href="/quiz" className="rounded-2xl border border-slate-200 bg-white p-5"><CircleHelp className="text-indigo-600"/>
            <h3 className="mt-3 font-bold">Try diagnostic quiz</h3><p className="mt-1 text-sm text-slate-600">Answer sample questions and see how scoring works.</p></Link>
            <Link href="/report" className="rounded-2xl border border-slate-200 bg-white p-5"><CalendarDays className="text-indigo-600"/>
            <h3 className="mt-3 font-bold">View revision plan</h3>
            <p className="mt-1 text-sm text-slate-600">See a sample prioritized study schedule.</p></Link></div>
            
{extraction?.extractedText && (
  <section className="mt-6 rounded-xl border p-6">
    <h2 className="text-xl font-bold">
      Extracted Study Material
    </h2>

    <p className="mt-2 text-sm text-gray-500">
      File: {extraction.fileName}
    </p>

    <div className="mt-4 max-h-[500px] overflow-y-auto whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-gray-800">
      {extraction.extractedText}
    </div>
  </section>
)}
</main>}

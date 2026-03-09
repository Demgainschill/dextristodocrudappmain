"use client";

import { useState } from "react";

const PRIORITY_COLOR: Record<string, string> = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
};

type Submission = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  priority: string;
  message: string;
  company?: string | null;
  website?: string | null;
  jobTitle?: string | null;
  newsletter?: boolean | null;
  createdAt?: Date | null;
};

export default function SubmissionsGrid({ people }: { people: Submission[] }) {
  const [selected, setSelected] = useState<Submission | null>(null);

  return (
    <>
      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {people.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelected(p)}
            className="bg-white rounded-2xl shadow p-5 flex flex-col gap-2 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg">{p.name}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  PRIORITY_COLOR[p.priority] ?? ""
                }`}
              >
                {p.priority}
              </span>
            </div>
            <p className="text-sm text-gray-500">{p.email}</p>
            {p.company && (
              <p className="text-sm text-gray-400">
                {p.jobTitle ? `${p.jobTitle} @ ` : ""}
                {p.company}
              </p>
            )}
            <p className="text-xs uppercase tracking-wide text-indigo-500 font-semibold">
              {p.subject}
            </p>
            <p className="text-sm text-gray-700 line-clamp-3">{p.message}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)} // click backdrop to close
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 flex flex-col gap-4 relative"
            onClick={(e) => e.stopPropagation()} // don't close when clicking inside
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none font-bold"
            >
              ×
            </button>

            {/* Header */}
            <div className="flex items-center justify-between pr-6">
              <h2 className="text-2xl font-bold text-gray-900">{selected.name}</h2>
              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  PRIORITY_COLOR[selected.priority] ?? ""
                }`}
              >
                {selected.priority}
              </span>
            </div>

            {/* Subject */}
            <p className="text-xs uppercase tracking-widest text-indigo-500 font-semibold">
              {selected.subject}
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              <p>📧 {selected.email}</p>
              {selected.phone && <p>📞 {selected.phone}</p>}
              {selected.company && (
                <p>
                  🏢 {selected.jobTitle ? `${selected.jobTitle} @ ` : ""}
                  {selected.company}
                </p>
              )}
              {selected.website && (
                <p>
                  🌐{" "}
                  <a
                    href={selected.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-500 underline"
                  >
                    {selected.website}
                  </a>
                </p>
              )}
            </div>

            {/* Message */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
              {selected.message}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
              <span>
                {selected.newsletter ? "✅ Subscribed to newsletter" : ""}
              </span>
              {selected.createdAt && (
                <span>
                  {new Date(selected.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}   
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

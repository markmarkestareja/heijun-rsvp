"use client";

import { useEffect, useState } from "react";

type RSVP = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  company_name: string;
  birth_date: string;
  position: string;
};

export default function ResponsesPage() {
  const [responses, setResponses] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResponses() {
      try {
        const res = await fetch("/api/rsvplist122101");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch responses");
        }

        setResponses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch responses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchResponses();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 text-black-500">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-black">Heijun RSVP Responses</h1>

        <p className="mb-8 text-gray-500">
          Total Responses: {responses.length}
        </p>
 
        {loading ? (
          <p>Loading responses...</p>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow">
            <table className="w-full text-left">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-black">#</th>
                  <th className="px-6 py-4 text-black">Name</th>
                  <th className="px-6 py-4 text-black">Email</th>
                  <th className="px-6 py-4 text-black">Contact Number</th>
                  <th className="px-6 py-4 text-black">Birth Date</th>
                  <th className="px-6 py-4 text-black">Company Name</th>
                  <th className="px-6 py-4 text-black">Position</th>
                </tr>
              </thead>

              <tbody>
                {responses.map((rsvp, index) => (
                  <tr key={rsvp.id} className="border-b last:border-0">
                    <td className="px-6 py-2 lg:py-4 text-black">{index + 1}</td>

                    <td className="px-6 py-2 lg:py-4 text-black font-medium">{rsvp.first_name} {rsvp.last_name}</td>

                    <td className="px-6 py-2 lg:py-4 text-black">{rsvp.email}</td>

                    <td className="px-6 py-2 lg:py-4 text-black">{rsvp.contact_number}</td>

                    <td className="px-6 py-2 lg:py-4 text-black">{rsvp.birth_date}</td>

                    <td className="px-6 py-2 lg:py-4 text-black">{rsvp.company_name}</td>

                    <td className="px-6 py-2 lg:py-4 text-black">{rsvp.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

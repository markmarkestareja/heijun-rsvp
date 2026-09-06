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
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">Heijun RSVP Responses</h1>

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
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Contact Number</th>
                  <th className="px-6 py-4">Birth Date</th>
                  <th className="px-6 py-4">Company Name</th>
                  <th className="px-6 py-4">Position</th>
                </tr>
              </thead>

              <tbody>
                {responses.map((rsvp, index) => (
                  <tr key={rsvp.id} className="border-b last:border-0">
                    <td className="px-6 py-2 lg:py-4">{index + 1}</td>

                    <td className="px-6 py-2 lg:py-4 font-medium">{rsvp.first_name} {rsvp.last_name}</td>

                    <td className="px-6 py-2 lg:py-4">{rsvp.email}</td>

                    <td className="px-6 py-2 lg:py-4">{rsvp.contact_number}</td>

                    <td className="px-6 py-2 lg:py-4">{rsvp.birth_date}</td>

                    <td className="px-6 py-2 lg:py-4">{rsvp.company_name}</td>

                    <td className="px-6 py-2 lg:py-4">{rsvp.position}</td>
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

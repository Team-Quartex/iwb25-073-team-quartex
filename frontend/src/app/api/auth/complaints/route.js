// app/api/complaints/route.js
export async function GET() {
  const dummyData = [
    {
      id: 1,
      title: "Road condition issue",
      body: "The main street in my area has been damaged for weeks and needs urgent repair.",
      type: "complaint",
      status: "Pending",
      response: null,
    },
    {
      id: 2,
      title: "Digital service improvement",
      body: "It would be great if government portals had a chatbot for quick queries.",
      type: "feedback",
      status: "Reviewed",
      response: "We are planning to introduce an AI chatbot next quarter.",
    },
    {
      id: 3,
      title: "Garbage collection",
      body: "Garbage is not being collected regularly in our neighborhood.",
      type: "complaint",
      status: "Resolved",
      response: "The issue has been forwarded to the municipal council and resolved.",
    },
      {
      id: 4,
      title: "Garbage collection",
      body: "Garbage is not being collected regularly in our neighborhood.",
      type: "complaint",
      status: "Resolved",
      response: "The issue has been forwarded to the municipal council and resolved.",
    },
      {
      id: 5,
      title: "Garbage collection",
      body: "Garbage is not being collected regularly in our neighborhood.",
      type: "complaint",
      status: "Resolved",
      response: "The issue has been forwarded to the municipal council and resolved.",
    },
      {
      id: 6,
      title: "Garbage collection",
      body: "Garbage is not being collected regularly in our neighborhood.",
      type: "complaint",
      status: "Resolved",
      response: "The issue has been forwarded to the municipal council and resolved.",
    },
      {
      id: 7,
      title: "Garbage collection",
      body: "Garbage is not being collected regularly in our neighborhood.",
      type: "complaint",
      status: "Resolved",
      response: "The issue has been forwarded to the municipal council and resolved.",
    },
      {
      id: 8,
      title: "Garbage collection",
      body: "Garbage is not being collected regularly in our neighborhood.",
      type: "complaint",
      status: "Resolved",
      response: "The issue has been forwarded to the municipal council and resolved.",
    },
      {
      id: 9,
      title: "Garbage collection",
      body: "Garbage is not being collected regularly in our neighborhood.",
      type: "complaint",
      status: "Resolved",
      response: "The issue has been forwarded to the municipal council and resolved.",
    },
  ];

  return new Response(JSON.stringify(dummyData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

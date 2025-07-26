export default function Features() {
  const features = [
    { title: "AI Chat", desc: "Ask your expenses in natural language." },
    { title: "Expense Tracking", desc: "Add, view, and manage expenses." },
    { title: "Analytics", desc: "Visualize your spending habits." },
  ];

  return (
    <section className="py-16 px-4 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {features.map((f, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition"
        >
          <h3 className="text-lg font-semibold text-gray-800">{f.title}</h3>
          <p className="text-gray-600 mt-2">{f.desc}</p>
        </div>
      ))}
    </section>
  );
}

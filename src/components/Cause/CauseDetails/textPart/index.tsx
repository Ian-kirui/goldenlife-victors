interface Detail {
  introduction: string;
  impact: string;
  howItWorks: string;
  transparency: string;
}

const TextPart = ({ detail }: { detail: Detail }) => {
  const sections = [
    { heading: "Introduction",              body: detail.introduction },
    { heading: "Impact",                    body: detail.impact },
    { heading: "How It Works",              body: detail.howItWorks },
    { heading: "Transparency & Accountability", body: detail.transparency },
  ];

  return (
    <div className="mt-16">
      {sections.map((s) => (
        <div key={s.heading} className="mb-10">
          <h2 className="text-3xl font-medium mb-3">{s.heading}</h2>
          <p className="text-base text-muted dark:text-white/60 leading-relaxed">{s.body}</p>
        </div>
      ))}
      <div className="mb-10">
        <h2 className="text-3xl font-medium mb-3">Thank You</h2>
        <p className="text-base text-muted dark:text-white/60">
          Every contribution — whether your time, expertise, resources, or partnership — directly enables
          GoldenLife Victors to reach more people, treat more individuals, and transform more communities.
          We are deeply grateful to everyone who stands with us in this work. Together, we are building a
          Kenya where mental health and recovery are within reach for all.
        </p>
      </div>
    </div>
  );
};

export default TextPart;
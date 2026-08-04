export const menuItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Blog", href: "/#blog" },
];

// ─── Help Section ─────────────────────────────────────────────────────────────
export const helpdata: { icon: string; title: string; text: string }[] = [
  {
    icon: "/images/help/donation.svg",
    title: "Rehabilitation",
    text: "We improve the quality of life of people experiencing alcohol and substance use disorder through inpatient care at our Naivasha facility and community-based rehabilitation, supporting recovery and reintegration into society.",
  },
  {
    icon: "/images/help/volunteer.svg",
    title: "Global Practices",
    text: "An innovation hub for knowledge, training, and leadership — creating a platform for conversation on mental health research, ideas, and practices across developing countries and institutions through volunteering, consultancy, and online or physical training.",
  },
  {
    icon: "/images/help/food-supply.svg",
    title: "Community Outreach",
    text: "A suite of community-driven programmes delivering mental health support where it is needed most. Our flagship IMARA Program leads indigenous and pastoralist community recovery, alongside school, youth, family, workplace, and faith-based therapy initiatives.",
  },
];

// ─── Programmes (6 consolidated) ─────────────────────────────────────────────
export const ProgrammeData: {
  image: string;
  title: string;
  slug: string;
  text: string;
  raised: string;
  goal: string;
  detail: {
    introduction: string;
    impact: string;
    howItWorks: string;
    transparency: string;
  };
}[] = [
  {
    image: "/images/all/3.jpg",
    title: "IMARA (Indigenous Movement for Addiction Recovery and Awareness) Program",
    slug: "imara",
    text: "Our flagship initiative delivering culturally responsive, community-driven addiction recovery and mental health awareness to Kenya's pastoralist and indigenous communities.",
    raised: "3,000 People Reached",
    goal: "4,000 People",
    detail: {
      introduction: "IMARA — Indigenous Movement for Addiction Recovery & Awareness — is GoldenLife Victors' frontline programme dedicated to preventing substance use, supporting holistic recovery, and restoring hope in Kenya's pastoralist and indigenous regions. We recognise that rural and traditional communities face unique mental health challenges and historic barriers to professional care. IMARA bridges this gap by delivering culturally responsive, community-driven solutions that reduce stigma, empower families, and build resilient, drug-free communities.",
      impact: "Through wellness caravans, community recovery networks, and youth empowerment initiatives, IMARA has reached over 3,000 individuals across 50+ communities in Kenya's pastoralist regions. By embedding mental health advocacy into the fabric of local traditions and working directly with faith leaders, elders, and community champions, IMARA creates lasting cultural shifts — where seeking help is no longer a source of shame but a sign of strength. Families are reunited, livelihoods are restored, and communities reclaim their dignity.",
      howItWorks: "IMARA works through direct community entry — our teams travel to where people live, meeting them within their own cultural context. We run awareness campaigns, identify individuals struggling with substance use, and connect them to community-based recovery networks. Those who require intensive support are referred to our inpatient rehabilitation facility in Naivasha. Faith leaders are equipped to support mental health within their congregations, knowing when to pray and when to refer. All activities are co-designed with local communities to ensure cultural relevance and sustainability.",
      transparency: "GoldenLife Victors maintains full accountability for all resources committed to the IMARA programme. Community impact is tracked through documented case referrals, recovery progress reports, and community feedback sessions. Partners and volunteers working with IMARA are vetted and operate under clear ethical guidelines. We welcome collaboration with credible organisations, government bodies, and individuals who share our commitment to dignified, community-centred recovery.",
    },
  },
  {
    image: "/images/all/watoto2.jpg",
    title: "Roots & Wings – School & Youth Therapy",
    slug: "roots-wings",
    text: "Supporting children, students, parents, and teachers to overcome emotional, behavioural, and social challenges. Empowering young people in and out of school to manage emotions, resolve conflict, and grow into healthy adults.",
    raised: "10 Schools",
    goal: "25 Schools",
    detail: {
      introduction: "Roots & Wings combines school-based therapy and youth empowerment into one comprehensive programme for Kenya's young people. Children and adolescents today face mounting pressures — academic stress, family instability, peer influence, and exposure to substance use — often without the tools or safe spaces to process these challenges. Roots & Wings provides structured, therapeutic support to children, students, parents, and teachers, creating school and community environments where young people can truly thrive.",
      impact: "Young people supported through Roots & Wings show measurable improvements in emotional regulation, conflict resolution, and academic engagement. Teachers report more cohesive classrooms and parents note stronger communication at home. By intervening early, we break cycles of trauma, substance experimentation, and disengagement before they become entrenched. The ripple effect of one supported child extends to their family, their peers, and ultimately their community.",
      howItWorks: "Our therapists and trained facilitators work directly within schools and community youth spaces. Sessions include individual counselling, group therapy, peer support circles, and parent engagement workshops. We train teachers to identify early warning signs of emotional distress and connect families to additional support where needed. Youth who show signs of substance experimentation are enrolled in prevention tracks, while those with more complex needs are referred to specialist care.",
      transparency: "Programme attendance, session outcomes, and referral tracking are documented for every participant. GoldenLife Victors provides regular progress reports to partner schools and community organisations. All facilitators are trained and supervised by qualified mental health professionals. We are committed to maintaining safe, ethical, and confidential environments for every young person we serve.",
    },
  },
  {
    image: "/images/all/religion.jpg",
    title: "Wellness Warriors – Men's Mental Health",
    slug: "wellness-warriors",
    text: "A safe space for men to share experiences, learn from peers and professionals, and challenge the stigma around male mental health. Because strength includes asking for help.",
    raised: "470 Men Reached",
    goal: "700 Men",
    detail: {
      introduction: "Men in Kenya — and across Africa — carry a disproportionate burden of unaddressed mental health challenges, substance use, and emotional suppression, largely because cultural norms discourage men from seeking help. Wellness Warriors is GoldenLife Victors' dedicated men's mental health programme, creating structured, stigma-free environments where men can be honest about their struggles, access professional support, and find solidarity with peers who understand their journey.",
      impact: "Men who engage with Wellness Warriors report reduced substance use, improved family relationships, and a renewed sense of purpose and responsibility. Many participants go on to become peer mentors within their communities, multiplying the programme's reach organically. By changing how men relate to their own mental health, we transform homes, workplaces, and communities — because a mentally healthy man is a stronger father, partner, colleague, and community member.",
      howItWorks: "Wellness Warriors runs structured group therapy sessions facilitated by trained male counsellors who understand the specific cultural dynamics men navigate. Sessions create space for honest conversation, peer accountability, and practical coping skills. Individual counselling is available for men dealing with acute challenges including substance use disorder, trauma, or grief. Men identified through our community outreach as struggling with alcohol or substance use are actively encouraged to join and, where needed, referred to inpatient rehabilitation.",
      transparency: "Participant confidentiality is strictly maintained. Programme outcomes including attendance, session engagement, and referral rates are tracked and reviewed regularly. GoldenLife Victors is committed to building trust with the men it serves — no participant's information is shared without explicit consent. Community partners and volunteers supporting Wellness Warriors operate under the same ethical standards as our clinical staff.",
    },
  },
  {
    image: "/images/all/church.jpg",
    title: "Spiritual Heal & Mending Minds – Faith & Family",
    slug: "spiritual-family",
    text: "Integrating mental health support within faith communities and families. We help faith leaders care for themselves and discern when congregants need professional care, while strengthening family bonds through open communication and healthy boundaries.",
    raised: "1200 People",
    goal: "3000 People",
    detail: {
      introduction: "Faith and family are the two most powerful anchors in the lives of most Kenyans — and yet both can be sources of immense stress, unspoken pain, and unmet mental health needs. Spiritual Heal works within religious communities to equip faith leaders with mental health awareness and self-care tools, while Mending Minds focuses on family systems — helping households navigate conflict, addiction, grief, and communication breakdown with professional therapeutic support.",
      impact: "Faith leaders who participate in Spiritual Heal are better equipped to support their congregations while protecting their own mental health. Churches and mosques become safer places where congregants can openly discuss struggles without fear of judgement. Through Mending Minds, families develop healthier communication patterns, resolve long-standing conflicts, and rebuild trust — particularly in households affected by a member's substance use disorder, where the whole family unit needs healing, not just the individual.",
      howItWorks: "Spiritual Heal delivers workshops and individual support sessions for pastors, imams, and other religious leaders, helping them recognise mental health symptoms, set healthy boundaries, and refer congregants to professional care when needed. Mending Minds works with families as a unit through structured family therapy sessions, facilitated by experienced counsellors. Home visits are conducted for families where attendance at a facility is not possible. Both programmes operate with deep sensitivity to cultural and religious values.",
      transparency: "GoldenLife Victors works collaboratively with faith community leaders to ensure programmes are culturally aligned and respectful of religious traditions. Participant data and session content are held in strict confidence. Outcomes including family cohesion assessments and referral follow-ups are documented and reviewed. Faith community partners receive regular briefings on programme progress without compromising individual participant confidentiality.",
    },
  },
  {
    image: "/images/all/baby_therapy.jpg",
    title: "BeyondBump & Empowered Minds – Mothers & Workplaces",
    slug: "beyond-empowered",
    text: "Preparing mothers-to-be for childbirth and parenthood through mental health awareness and community support, while helping employers and employees build healthy work environments through coaching and stress management.",
    raised: "170 Mothers",
    goal: "500 Mothers",
    detail: {
      introduction: "BeyondBump addresses the mental health of mothers — from pregnancy through the early years of parenthood — at a time when women are most vulnerable to anxiety, depression, and isolation. Empowered Minds takes mental health into the workplace, where stress, burnout, and unaddressed emotional challenges cost organisations and individuals deeply. Together, these programmes extend GoldenLife Victors' reach into two environments where mental health is rarely prioritised but urgently needed.",
      impact: "BeyondBump participants report lower rates of perinatal anxiety and postpartum depression, stronger bonding with their newborns, and greater confidence as new mothers. Community support circles created through BeyondBump become lasting networks of mutual encouragement. Empowered Minds has helped organisations reduce absenteeism, improve team communication, and build cultures where employees feel psychologically safe — translating directly into productivity and staff retention.",
      howItWorks: "BeyondBump runs antenatal and postnatal mental health sessions in clinics, community centres, and online, covering stress management, relationship dynamics, and early childhood bonding. Peer support circles connect mothers to one another for ongoing community beyond the formal programme. Empowered Minds partners with employers to deliver workplace mental health training, individual coaching for employees, and management workshops that build psychologically safe team environments. Both programmes can be delivered on-site or remotely.",
      transparency: "All health-related data collected through BeyondBump is handled in compliance with ethical standards for maternal and child health. Corporate partners in Empowered Minds receive only anonymised, aggregate insights — no individual employee data is shared with employers. Programme facilitators are qualified mental health professionals with specific training in maternal health and occupational wellness. Regular outcome reviews ensure programme quality and participant safety.",
    },
  },
  {
    image: "/images/all/mh4.jpg",
    title: "Mental Shift – Rehabilitation Therapy",
    slug: "mental-shift",
    text: "Recovery and rehabilitation for individuals struggling with substance use disorders through detox, therapy, and the 'Adopt an Addict' initiative — meeting people where they are and walking with them to lasting change.",
    raised: "4000 Patients",
    goal: "8000 Patients",
    detail: {
      introduction: "Mental Shift is GoldenLife Victors' dedicated rehabilitation therapy programme for individuals living with alcohol and substance use disorder. Rooted in compassion rather than judgement, Mental Shift recognises addiction as a health condition requiring structured clinical care, psychological support, and genuine human connection. The programme's 'Adopt an Addict' initiative pairs recovering individuals with consistent mentors — professionals and trained community members who walk alongside them through every stage of recovery.",
      impact: "Participants in Mental Shift's structured rehabilitation pathway show significantly improved rates of sustained sobriety compared to those who attempt recovery without support. Families of participants also benefit — as their loved one's recovery progresses, household stability, economic productivity, and relational trust are restored. The 'Adopt an Addict' model creates accountable, dignified relationships that outlast the formal programme period, reducing relapse rates and building long-term resilience.",
      howItWorks: "Mental Shift operates across two tracks. The community track provides therapy sessions, counselling, and peer support for individuals whose substance use disorder can be managed without residential care. The inpatient track refers individuals to GoldenLife Victors' facility in Naivasha for structured residential rehabilitation including detoxification, individual and group therapy, life skills training, and reintegration planning. Every participant is assigned a dedicated case worker and, through the 'Adopt an Addict' initiative, a personal mentor who provides consistent support beyond formal sessions.",
      transparency: "All clinical protocols within Mental Shift meet established standards for addiction medicine and mental health care. Participant progress is tracked throughout the programme and for a defined period post-discharge to monitor sustained recovery. Partner mentors in the 'Adopt an Addict' initiative undergo thorough training and ongoing supervision. GoldenLife Victors maintains transparent records of programme outcomes and welcomes oversight from credible health and community organisations.",
    },
  },
];

// ─── Causes / Impact Stats ────────────────────────────────────────────────────
export const CauseData: {
  image: string;
  title: string;
  slug: string;
  text: string;
  raised: string;
  goal: string;
  detail: {
    introduction: string;
    impact: string;
    howItWorks: string;
    transparency: string;
  };
}[] = [
  {
    image: "/images/all/addict.jpg",
    title: "People Reached",
    slug: "people-reached",
    text: "Individuals across Kenya's communities who have received awareness, support, or intervention through our programmes.",
    raised: "3,000 People",
    goal: "4,000 People",
    detail: {
      introduction: "Reaching people is the first and most critical step in GoldenLife Victors' work. Before recovery can begin, individuals and communities must first know that help exists, that they are not alone, and that seeking support is not a sign of weakness. Through our community outreach, wellness caravans, school programmes, and the IMARA initiative, we have directly reached over 3,000 people across Kenya — in urban centres, rural counties, pastoralist regions, schools, workplaces, and places of worship.",
      impact: "Every person reached represents a potential turning point — for themselves, their family, and their community. Many of the individuals we reach are not yet in crisis but are at risk. Early contact allows us to provide information, reduce stigma, and establish trust before a situation escalates. Communities where GoldenLife Victors has been active report increased awareness of mental health resources and greater willingness to seek help — a cultural shift that extends far beyond the individuals we directly engage.",
      howItWorks: "We reach people through community events, partnerships with local leaders, school visits, faith community engagements, and direct outreach by our trained community health workers. The IMARA Programme specifically targets indigenous and pastoralist communities through wellness caravans that travel directly to remote areas. Digital outreach through our website and social media extends our reach to those who may not be physically accessible. Every point of contact is an opportunity to inform, connect, and begin the journey toward support.",
      transparency: "GoldenLife Victors documents every community engagement with records of location, estimated reach, activities delivered, and follow-up actions taken. We do not inflate our numbers — our figures reflect direct, documented contact. We are committed to quality of engagement over quantity of statistics, ensuring that every person counted has genuinely received meaningful information or support.",
    },
  },
  {
    image: "/images/all/addict.jpg",
    title: "People Treated",
    slug: "people-treated",
    text: "Individuals who have undergone structured treatment and achieved lasting change through our rehabilitation and therapy programmes.",
    raised: "2,500 People",
    goal: "5,000 People",
    detail: {
      introduction: "Treatment is where lasting change happens. GoldenLife Victors has provided structured therapeutic intervention to over 2,500 individuals — through our inpatient rehabilitation facility in Naivasha, our community-based therapy programmes, and our IMARA recovery networks. Treatment at GoldenLife Victors is not a one-size-fits-all approach. We tailor every intervention to the individual's specific situation, cultural background, and level of need.",
      impact: "Of those who complete a full treatment pathway with GoldenLife Victors, the majority achieve and maintain meaningful recovery — returning to family life, employment, and productive community participation. Families report restored relationships, reduced domestic conflict, and improved economic stability following a family member's recovery. Children in households where a parent has been treated report better school attendance, improved wellbeing, and a more stable home environment. The impact of one person treated ripples outward into generations.",
      howItWorks: "Treatment pathways at GoldenLife Victors include community-based counselling and group therapy for those with moderate support needs, and residential inpatient rehabilitation at our Naivasha facility for those requiring intensive, structured care. Every individual is assessed on intake, assigned a case worker, and placed on a personalised treatment plan. The 'Adopt an Addict' mentorship initiative ensures no one exits treatment without a consistent support relationship. Post-treatment follow-up is standard practice, with check-ins conducted over a defined recovery monitoring period.",
      transparency: "Treatment outcomes are tracked using standardised assessment tools at intake, during treatment, and at follow-up intervals post-discharge. GoldenLife Victors does not publish individual case information. Aggregate outcome data is reviewed regularly by our clinical team and is available to credible partner organisations and oversight bodies upon request. We are committed to honest reporting — including honest acknowledgement of cases where recovery has not yet been achieved and ongoing support is needed.",
    },
  },
  {
    image: "/images/all/addict.jpg",
    title: "Communities Reached",
    slug: "places-reached",
    text: "Towns, villages, schools, workplaces, and faith communities across Kenya where GoldenLife Victors has delivered direct impact.",
    raised: "50 Places",
    goal: "65 Places",
    detail: {
      introduction: "Mental health challenges do not respect geography — they exist in villages and cities, in schools and boardrooms, in pastoral homesteads and urban estates. GoldenLife Victors has delivered programmes and interventions in over 50 distinct locations across Kenya, from Nairobi to the pastoralist counties of northern Kenya. Each community we enter represents a unique cultural context, a distinct set of needs, and an opportunity to plant lasting seeds of change.",
      impact: "Communities where GoldenLife Victors has been active demonstrate measurable changes in how mental health and addiction are discussed and addressed. Local leaders — including chiefs, pastors, teachers, and elders — become advocates for mental health awareness. Schools develop internal referral systems for students in distress. Community recovery networks continue to function beyond our direct involvement, sustained by local champions we have trained and equipped. The goal is not dependency on GoldenLife Victors but the development of community-owned mental health resilience.",
      howItWorks: "Community entry is always through established relationships — with local administrators, faith leaders, school principals, or community health workers. We conduct needs assessments before beginning any programme in a new location, ensuring our interventions are relevant and welcome. The IMARA wellness caravan model allows us to bring mental health services directly into remote communities that would otherwise have no access to professional support. Once a foundation is established, we work to embed local champions who can sustain the work independently.",
      transparency: "Every community where GoldenLife Victors operates is documented with engagement records, activities delivered, and outcomes achieved. We work transparently with local government and community leadership structures, obtaining necessary permissions and maintaining open communication throughout. Community feedback is actively sought and incorporated into programme design. We are committed to leaving every community stronger and more capable of addressing its own mental health needs — not creating dependence on external intervention.",
    },
  },
];

// ─── Footer Links ─────────────────────────────────────────────────────────────
export const footerLinks: { link: string }[] = [
  { link: "Rehabilitation" },
  { link: "Community Outreach" },
  { link: "Global Practices" },
  { link: "IMARA Program" },
  { link: "Volunteer with Us" },
  { link: "Partner / Collaborate" },
  { link: "FAQs & Help" },
  { link: "Privacy Policy" },
  { link: "Terms & Conditions" },
  { link: "Contact Us" },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const Reviews: {
  clientImg: string;
  clientName: string;
  review: string;
  post: string;
}[] = [
  {
    clientImg: "/images/all/jamila.png",
    clientName: "Jamilla Angela",
    review:
      "With Community, healing happens in connection — we build supportive networks that lasts.",
    post: "CEO",
  },
  
];




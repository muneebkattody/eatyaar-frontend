import { Link } from 'react-router-dom'

const stats = [
  { value: '40%', label: 'of all food produced globally is wasted' },
  { value: '~67M', label: 'tonnes of food wasted in India every year' },
  { value: '25%', label: 'of freshwater used globally goes into wasted food' },
  { value: '8%', label: 'of global greenhouse gas emissions from food waste' },
]

const reasons = [
  {
    icon: '🚫',
    title: 'Not a charity',
    body: 'Existing food sharing apps are built around giving to the poor. That model creates stigma — givers feel awkward, takers feel embarrassed. EatYaar removes that completely. Anyone can give, anyone can take. No labels.',
  },
  {
    icon: '🔁',
    title: 'Food as a resource',
    body: 'Every meal that gets thrown away took water to grow, energy to cook, and effort to prepare. Wasting food is wasting all of that. EatYaar treats food the way we treat electricity or ride sharing — optimize the resource.',
  },
  {
    icon: '🧑‍🤝‍🧑',
    title: 'Built for Indian reality',
    body: 'Weddings with 500 people. Hostel mess leftovers. Office canteen surpluses. PG tiffins. These are uniquely Indian food waste scenarios. EatYaar is built specifically for this context.',
  },
  {
    icon: '🌱',
    title: 'Real environmental impact',
    body: 'Every meal saved is roughly 0.5kg of CO₂ and 80 litres of water saved. As EatYaar scales, those numbers become meaningful at a national level.',
  },
  {
    icon: '🤝',
    title: 'Community, not transaction',
    body: 'There is no money involved. No delivery. No middlemen. Just neighbors sharing food like people used to before everything became a business. Trust is built through ratings and verified phone numbers.',
  },
]

export default function WhyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FFF8F0' }}>

      {/* Hero */}
      <div className="bg-gray-900 text-white px-4 pt-14 pb-14">
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-400 text-sm font-semibold mb-3 uppercase tracking-widest">Our Mission</p>
          <h1 className="font-display font-800 text-3xl md:text-4xl leading-tight mb-4">
            Why does EatYaar exist?
          </h1>
          <p className="text-gray-300 text-base leading-relaxed max-w-lg">
            Because 40% of food produced in the world never gets eaten. Not because there isn't enough people to eat it. But because we haven't made it easy enough to share it.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-orange-100 p-4 shadow-sm">
              <p className="font-display font-800 text-2xl text-orange-500 mb-1">{s.value}</p>
              <p className="text-xs text-gray-500 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* The story */}
        <div className="mb-10">
          <h2 className="font-display font-700 text-xl text-gray-900 mb-4">The problem we saw</h2>
          <div className="text-gray-600 text-sm leading-relaxed flex flex-col gap-3">
            <p>
              At a wedding in Pune, over 200kg of biryani was thrown away the next morning because there was no way to tell anyone it was available. The same week, students in a nearby hostel were eating instant noodles for dinner.
            </p>
            <p>
              The food existed. The hungry people existed. The gap was just a platform that connected them without making it feel like charity.
            </p>
            <p>
              EatYaar is that platform. No pity. No awkwardness. Just food moving from where it's excess to where it's wanted.
            </p>
          </div>
        </div>

        {/* Reasons */}
        <h2 className="font-display font-700 text-xl text-gray-900 mb-5">What makes us different</h2>
        <div className="flex flex-col gap-4 mb-12">
          {reasons.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{r.icon}</span>
                <h3 className="font-display font-700 text-gray-900 text-base">{r.title}</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-orange-500 rounded-2xl p-6 text-white text-center">
          <p className="font-display font-700 text-xl mb-2">Be part of the solution.</p>
          <p className="text-orange-100 text-sm mb-4">Share what you have. Take what you need.</p>
          <Link
            to="/"
            className="inline-block bg-white text-orange-500 font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-orange-50 transition"
          >
            Start Using EatYaar →
          </Link>
        </div>
      </div>
    </div>
  )
}

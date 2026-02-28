const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using EatYaar.in ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use the Platform. EatYaar reserves the right to update these terms at any time, and continued use of the Platform constitutes acceptance of the updated terms.`,
  },
  {
    title: '2. What EatYaar Is',
    content: `EatYaar is a community food sharing platform that connects individuals who have surplus food ("Givers") with individuals who wish to collect that food ("Takers"). EatYaar acts solely as a technology intermediary. We do not produce, handle, inspect, store, or deliver any food. We are a connector, not a food business.`,
  },
  {
    title: '3. Eligibility',
    content: `You must be at least 18 years of age to use EatYaar. By registering, you confirm that the information you provide — including your phone number and location — is accurate and current. One account per person. Accounts found to be duplicated or fraudulent will be removed.`,
  },
  {
    title: '4. Food Listings — Giver Responsibilities',
    content: `As a Giver, you agree that all food you list on EatYaar:\n• Was prepared or handled in a hygienic manner\n• Is safe for human consumption at the time of listing\n• Has accurate information including allergen details, food type (veg/non-veg), and pickup window\n• Will be available at the stated time and location\n\nGivers bear full responsibility for the food they share. EatYaar does not verify, inspect, or certify any food listing.`,
  },
  {
    title: '5. Food Collection — Taker Responsibilities',
    content: `As a Taker, you acknowledge that:\n• Food is accepted "as-is" from the Giver\n• EatYaar makes no guarantees about food quality, freshness, or safety\n• You assume full responsibility for your decision to collect and consume shared food\n• You will collect food within the stated pickup window\n• You will treat Givers with respect at all times`,
  },
  {
    title: '6. No Liability for Food Quality',
    content: `EatYaar expressly disclaims all liability for any illness, injury, allergic reaction, or harm arising from food shared through the Platform. By using EatYaar, both Givers and Takers acknowledge this limitation and agree not to hold EatYaar, its founders, employees, or affiliates liable for any food-related harm.`,
  },
  {
    title: '7. Prohibited Conduct',
    content: `You agree not to:\n• Use EatYaar for any commercial purpose or to sell food\n• List food that is expired, spoiled, contaminated, or unsafe\n• Harass, threaten, or abuse other users\n• Share false or misleading information in listings\n• Attempt to circumvent the Platform's trust and verification systems\n• Use the Platform for any unlawful purpose\n\nViolations may result in immediate account suspension.`,
  },
  {
    title: '8. Trust Score and Ratings',
    content: `EatYaar uses a trust score system to build accountability between users. Ratings are based on real interactions. Attempting to manipulate ratings — through fake accounts, coercion, or fraudulent transactions — is a violation of these terms and may result in permanent removal from the Platform.`,
  },
  {
    title: '9. Intellectual Property',
    content: `All content, design, code, and branding on EatYaar.in is the intellectual property of EatYaar. You may not copy, reproduce, or distribute any part of the Platform without written permission. User-generated content (listings, reviews) remains owned by the user but grants EatYaar a non-exclusive license to display it on the Platform.`,
  },
  {
    title: '10. Termination',
    content: `EatYaar reserves the right to suspend or terminate any account at any time for violations of these terms, fraudulent activity, or conduct deemed harmful to the community. Users may delete their own accounts at any time by contacting us.`,
  },
  {
    title: '11. Governing Law',
    content: `These Terms are governed by the laws of India. Any disputes arising from use of EatYaar shall be subject to the jurisdiction of courts in Pune, Maharashtra, India.`,
  },
  {
    title: '12. Contact',
    content: `For any questions regarding these Terms, please contact us at:\nnoreply@eatyaar.in`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FFF8F0' }}>

      {/* Header */}
      <div className="bg-gray-900 text-white px-4 pt-14 pb-12">
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-400 text-sm font-semibold mb-3 uppercase tracking-widest">Legal</p>
          <h1 className="font-display font-800 text-3xl leading-tight mb-3">Terms & Conditions</h1>
          <p className="text-gray-400 text-sm">Last updated: February 2026</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Intro banner */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-8 text-sm text-orange-800 leading-relaxed">
          <strong>Plain language summary:</strong> EatYaar connects food givers and takers. We are a platform, not a food business. You are responsible for the food you share and the food you collect. Be honest, be safe, be kind.
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="font-display font-700 text-gray-900 text-base mb-3">{section.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

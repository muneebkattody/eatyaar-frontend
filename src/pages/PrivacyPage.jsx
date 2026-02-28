const sections = [
  {
    title: '1. Introduction',
    content: `EatYaar.in ("we", "our", "the Platform") is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and the choices you have. By using EatYaar, you agree to the collection and use of information in accordance with this policy.`,
  },
  {
    title: '2. Information We Collect',
    content: `We collect the following types of information:\n\n• Phone number — used for OTP-based authentication and identity\n• Name — displayed on your public profile\n• Email — optional, used only for notifications\n• City and area — used to show relevant food listings near you\n• Food listings you post — title, description, servings, pickup location (area shown publicly, exact address shown only to approved claimers)\n• Claims you make — which listings you've claimed and their status\n• Ratings — scores and comments between users after pickups`,
  },
  {
    title: '3. How We Use Your Information',
    content: `We use your information to:\n• Authenticate your identity via OTP\n• Display your profile and food listings\n• Connect givers with takers\n• Calculate and display trust scores\n• Send OTP codes and claim notifications via email\n• Improve the Platform based on usage patterns\n\nWe do not sell, rent, or share your personal information with third parties for marketing purposes.`,
  },
  {
    title: '4. What Is Publicly Visible',
    content: `The following information is visible to all users of the Platform:\n• Your name\n• Your city and area\n• Your trust score and total given/taken counts\n• Your food listings (title, description, area name, servings, food type)\n\nThe following is private and never shown publicly:\n• Your phone number\n• Your email address\n• The exact pickup address of a listing (shown only to an approved claimer)`,
  },
  {
    title: '5. OTP and Authentication',
    content: `We use OTP-based authentication via phone number. OTPs are generated randomly, stored temporarily in memory, and expire within 5 minutes. We do not store OTPs in our database. During testing and early access, OTPs may be delivered via email to a designated inbox rather than SMS.`,
  },
  {
    title: '6. Data Storage and Security',
    content: `Your data is stored in a secured PostgreSQL database hosted on AWS. We use industry-standard security practices including encrypted connections (HTTPS), JWT-based authentication, and environment-based secret management. Passwords are never stored — we use OTP-only authentication.\n\nWhile we take reasonable precautions, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.`,
  },
  {
    title: '7. Data Retention',
    content: `We retain your account data as long as your account is active. Food listings are retained for record-keeping even after they expire or are completed. If you request account deletion, we will remove your personal information within 30 days, though anonymized usage data may be retained for analytics.`,
  },
  {
    title: '8. Third-Party Services',
    content: `EatYaar uses the following third-party services:\n• AWS EC2 — backend server hosting\n• Vercel — frontend hosting\n• Hostinger SMTP — email delivery for OTPs and notifications\n\nThese services may have access to limited data necessary to perform their functions. They are bound by their own privacy policies.`,
  },
  {
    title: '9. Your Rights',
    content: `You have the right to:\n• Access the personal data we hold about you\n• Request correction of inaccurate data\n• Request deletion of your account and associated data\n• Withdraw consent for optional data (like email)\n\nTo exercise any of these rights, contact us at noreply@eatyaar.in.`,
  },
  {
    title: '10. Children\'s Privacy',
    content: `EatYaar is not intended for users under the age of 18. We do not knowingly collect data from minors. If you believe a minor has created an account, please contact us immediately.`,
  },
  {
    title: '11. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of EatYaar after changes are posted constitutes your acceptance of the revised policy.`,
  },
  {
    title: '12. Contact Us',
    content: `For any privacy-related questions or requests:\n\nEmail: noreply@eatyaar.in\nPlatform: EatYaar.in`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#FFF8F0' }}>

      {/* Header */}
      <div className="bg-gray-900 text-white px-4 pt-14 pb-12">
        <div className="max-w-2xl mx-auto">
          <p className="text-orange-400 text-sm font-semibold mb-3 uppercase tracking-widest">Legal</p>
          <h1 className="font-display font-800 text-3xl leading-tight mb-3">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: February 2026</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Intro banner */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-8 text-sm text-orange-800 leading-relaxed">
          <strong>Plain language summary:</strong> We collect only what's needed to run the platform. We don't sell your data. Your phone number and exact address are never shown publicly. You can request deletion anytime.
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

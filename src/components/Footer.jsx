import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-2xl mx-auto px-4 py-10">

        {/* Brand */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🍱</span>
          <span className="font-display font-700 text-xl">EatYaar</span>
        </div>
        <p className="text-gray-400 text-sm max-w-xs mb-8 leading-relaxed">
          A community food sharing network. Food is a resource — not charity, not waste. Just sense.
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm mb-8">
          <Link to="/why" className="text-gray-400 hover:text-orange-400 transition">
            Why EatYaar?
          </Link>
          <Link to="/terms" className="text-gray-400 hover:text-orange-400 transition">
            Terms & Conditions
          </Link>
          <Link to="/privacy" className="text-gray-400 hover:text-orange-400 transition">
            Privacy Policy
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} EatYaar.in — All rights reserved.</p>
          <p className="text-xs text-gray-600">Made with ❤️ to fight food waste in India.</p>
        </div>
      </div>
    </footer>
  )
}
/**
 * StatCard - Card component for displaying dashboard metrics
 * @param {string} title - Title of the stat card
 * @param {string|number} value - Value to display
 * @param {ReactNode} icon - Icon component
 * @param {boolean} clickable - Whether the card is clickable
 * @param {function} onClick - Callback when card is clicked
 */
export default function StatCard({ title, value, icon, clickable = false, onClick }) {
  const CardWrapper = clickable ? 'button' : 'div';

  return (
    <CardWrapper
      onClick={clickable ? onClick : undefined}
      className={`flex flex-1 flex-col rounded-lg border border-[#e5e7eb] bg-white px-4 py-4 text-left transition-all ${
        clickable ? 'cursor-pointer hover:border-[#3b5bdb] hover:shadow-md' : ''
      }`}
    >
      <p className="mb-2 text-xs text-[#6b7280]">{title}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-[#3b5bdb]">
            {icon}
          </div>
          <p className="text-lg font-bold text-[#111827]">{value}</p>
        </div>
        {clickable && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#3b5bdb]"
          >
            <path
              d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </CardWrapper>
  );
}

import PropTypes from "prop-types";

/**
 * ReportSummaryCards - Displays 6 summary metric cards for sales reports
 * Exactly as seen in the user's reference image 2
 */
export default function ReportSummaryCards({ summary, isLoading }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val || 0);
  };

  const cards = [
    {
      title: "Total Order",
      value: summary?.totalOrders || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bg: "bg-blue-50",
    },
    {
      title: "Total Omzet",
      value: formatCurrency(summary?.totalOmzet),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-indigo-50",
    },
    {
      title: "All Menu Sales",
      value: summary?.totalItems || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      bg: "bg-sky-50",
    },
    {
      title: "Foods",
      value: summary?.categoryBreakdown?.foods || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.703 2.703 0 00-3 0 2.703 2.703 0 00-3 0 2.703 2.703 0 00-3 0 2.704 2.704 0 01-1.5-.454M3 6.22c0 1.313.304 2.115.82 2.613C4.417 9.4 5.253 9.778 6.5 9.778c1.246 0 2.083-.377 2.68-1.025C9.778 8.11 10.082 7.307 10.082 6c0-1.307-.304-2.109-.821-2.607C8.665 2.8 7.828 2.422 6.582 2.422c-1.246 0-2.083.377-2.68 1.025C3.305 4.103 3 4.906 3 6.22z" />
        </svg>
      ),
      bg: "bg-orange-50",
    },
    {
      title: "Beverages",
      value: summary?.categoryBreakdown?.beverages || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      ),
      bg: "bg-cyan-50",
    },
    {
      title: "Desserts",
      value: summary?.categoryBreakdown?.desserts || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-gray-500">{card.title}</span>
            <div className={`p-2 rounded-xl ${card.bg}`}>
              {card.icon}
            </div>
          </div>
          {isLoading ? (
            <div className="h-7 w-20 bg-gray-100 animate-pulse rounded"></div>
          ) : (
            <span className="text-xl font-bold text-gray-900 leading-tight">
              {card.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

ReportSummaryCards.propTypes = {
  summary: PropTypes.object,
  isLoading: PropTypes.bool,
};

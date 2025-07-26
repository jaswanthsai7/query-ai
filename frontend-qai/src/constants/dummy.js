  const categoryData = [{
          name: "Food",
          value: 400
      },
      {
          name: "Transport",
          value: 300
      },
      {
          name: "Shopping",
          value: 300
      },
      {
          name: "Bills",
          value: 200
      },
  ];

  const monthlyTrend = [{
          month: "Jan",
          total: 320
      },
      {
          month: "Feb",
          total: 410
      },
      {
          month: "Mar",
          total: 380
      },
      {
          month: "Apr",
          total: 500
      },
      {
          month: "May",
          total: 460
      },
      {
          month: "Jun",
          total: 540
      },
      {
          month: "Jul",
          total: 420
      },
  ];

  const categoryBars = [{
          category: "Food",
          amount: 400
      },
      {
          category: "Transport",
          amount: 300
      },
      {
          category: "Shopping",
          amount: 300
      },
      {
          category: "Bills",
          amount: 200
      },
  ];

  const burnRate = [{
          name: "Used",
          value: 68,
          fill: "#f97316"
      },
      {
          name: "Left",
          value: 32,
          fill: "rgba(255,255,255,0.1)"
      },
  ];

  const COLORS = [
      "#ff5a3d",
      "#fb7185",
      "#ef4444",
      "#f97316",
      "#facc15",
      "#a855f7",
      "#14b8a6",
      "#60a5fa",
  ];

  const recentTx = [{
          category: "Food",
          amount: 50,
          date: "2025-07-20"
      },
      {
          category: "Transport",
          amount: 30,
          date: "2025-07-21"
      },
      {
          category: "Shopping",
          amount: 80,
          date: "2025-07-22"
      },
  ];

  const totalSpend = 1250;
  const monthlyAvg = 420;
  const topCategory = "Food";
  const topCategoryDelta = 12;

  export {
      categoryData,
      recentTx,
      monthlyTrend,
      categoryBars,
      burnRate,
      COLORS,
      totalSpend,
      monthlyAvg,
      topCategory,
      topCategoryDelta
  }
const texts = {
  lastPeriodQuestion: "When was the last time your period started? If you're not sure, please select an approximate date. You can change it later.",
  periodDurationQuestion: "How long does your period typically last? The average duration is 5 days. You can change this at any time.",
  periodCycleQuestion: "How long is your menstrual cycle? The average length is 28 days. You can change this at any time.",
  lastPeriodRecorded: (days) => `The last period was recorded on day ${days} of the expected date.`,
  passwordUnmatched: "Passwords don't match!",

  // Legends and descriptions for each phase
  legend: {
    menstruation: {
      title: "Menstruation Period",
      color: "#ED9B5F",
      description: "This is when bleeding occurs, typically lasting 3-7 days."
    },
    follicular: {
      title: "Follicular Phase",
      color: "#DB5EA2",
      description: "Hormones stimulate the ovaries to prepare an egg, lasting about 6 days. Energy levels and mood often improve, making it a positive and productive time."
    },
    ovulation: {
      title: "Ovulation Period",
      color: "#9E82CD",
      description: "The egg is released, occurring around the midpoint of the cycle. While energy is high, some may feel slight discomfort or mood swings due to hormonal changes."
    },
    luteal: {
      title: "Luteal Phase",
      color: "#77B0AA",
      description: "The body prepares for a possible pregnancy, lasting until the next cycle starts. Mood swings, irritability, and fatigue are common, often referred to as PMS symptoms."
    },
    nextPeriod: {
      title: "Next Period",
      color: "#FA7070",
      description: "The predicted date for your next period."
    },
  },
};

export default texts;
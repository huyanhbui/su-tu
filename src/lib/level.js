// Xác định thẻ đang ở cấp nào dựa trên XP đã tích trên chính thẻ đó.
export function levelOf(card, cardXp = 0) {
  let idx = 0;
  card.levels.forEach((l, i) => { if (cardXp >= l.xp) idx = i; });
  const next = card.levels[idx + 1] || null;
  return {
    index: idx,
    current: card.levels[idx],
    next,
    toNext: next ? next.xp - cardXp : 0,
    progress: next ? Math.min(1, (cardXp - card.levels[idx].xp) / (next.xp - card.levels[idx].xp)) : 1,
  };
}

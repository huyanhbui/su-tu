// Xác định thẻ đang ở cấp nào dựa trên XP đã tích trên chính thẻ đó.
export function levelOf(card, cardXp = 0) {
  const idx = Math.max(0, card.levels.findLastIndex((l) => cardXp >= l.xp));
  const next = card.levels[idx + 1] || null;
  return {
    index: idx,
    current: card.levels[idx],
    next,
    toNext: next ? next.xp - cardXp : 0,
    progress: next ? Math.min(1, (cardXp - card.levels[idx].xp) / (next.xp - card.levels[idx].xp)) : 1,
  };
}

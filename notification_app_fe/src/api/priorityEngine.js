/**
 * Priority Engine
 * - typeWeight: Placement=3, Result=2, Event=1
 * - recencyScore = 1 / (hoursAgo + 1)
 * - finalScore = typeWeight * (1 + recencyScore)
 *
 * Provides `scoreNotification` and `topNFromList` helpers.
 */

function parseISOorDate(s) {
  if (s instanceof Date) return s;
  return new Date(s);
}

const typeWeight = { Placement: 3, Result: 2, Event: 1 };

function hoursAgo(date) {
  const d = parseISOorDate(date);
  const ms = Date.now() - d.getTime();
  return Math.max(0, ms / (1000 * 60 * 60));
}

function recencyScore(date) {
  const h = hoursAgo(date);
  return 1 / (h + 1);
}

function scoreNotification(n) {
  const weight = typeWeight[n.Type] || 1;
  const r = recencyScore(n.Timestamp);
  return weight * (1 + r);
}

function topNFromList(list = [], N = 10) {
  // simple sort-based approach (N small). Returns new array sorted descending by score.
  const scored = list.map(item => ({ item, score: scoreNotification(item) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, N).map(s => s.item);
}

module.exports = { scoreNotification, topNFromList };

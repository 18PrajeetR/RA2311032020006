/**
 * __tests__/priorityEngine.test.js
 * Simple test harness for priorityEngine scoring and topN logic.
 * Run with: node __tests__/priorityEngine.test.js
 */

const { scoreNotification, topNFromList } = require('../src/api/priorityEngine');

console.log('=== Priority Engine Test Suite ===\n');

// Test 1: Scoring
console.log('Test 1: scoreNotification() function');
const notif1 = {
  ID: '1',
  Type: 'Placement',
  Message: 'Job opening',
  Timestamp: new Date().toISOString(),
};
const notif2 = {
  ID: '2',
  Type: 'Event',
  Message: 'Fest',
  Timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
};
const score1 = scoreNotification(notif1);
const score2 = scoreNotification(notif2);
console.log(`Placement (recent): ${score1.toFixed(2)}`);
console.log(`Event (old): ${score2.toFixed(2)}`);
console.assert(score1 > score2, 'Placement should score higher than Event');
console.log('✓ Placement scores higher than Event\n');

// Test 2: Top N
console.log('Test 2: topNFromList() function');
const notifications = [
  { ID: 'a', Type: 'Event', Message: 'm1', Timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString() },
  { ID: 'b', Type: 'Result', Message: 'm2', Timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
  { ID: 'c', Type: 'Placement', Message: 'm3', Timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { ID: 'd', Type: 'Placement', Message: 'm4', Timestamp: new Date().toISOString() },
  { ID: 'e', Type: 'Event', Message: 'm5', Timestamp: new Date().toISOString() },
];
const top3 = topNFromList(notifications, 3);
console.log(`Top 3 from 5 notifications:`);
top3.forEach((n, i) => console.log(`  ${i + 1}. ${n.Type} - ${n.Message}`));
console.assert(top3.length === 3, 'Should return exactly 3');
console.assert(top3[0].ID === 'd', 'First should be the most recent Placement');
console.log('✓ Top N filtering works correctly\n');

// Test 3: Edge cases
console.log('Test 3: Edge cases');
const empty = topNFromList([], 10);
console.assert(empty.length === 0, 'Empty list should return empty');
console.log('✓ Empty list handled');

const tooSmall = topNFromList(notifications, 100);
console.assert(tooSmall.length === 5, 'N > list length should return all');
console.log('✓ N > list size handled\n');

console.log('=== All tests passed ✓ ===');

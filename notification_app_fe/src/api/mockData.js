/**
 * src/api/mockData.js
 * Mock notification data for local testing without hitting the real API.
 */

const MOCK_NOTIFICATIONS = [
  {
    ID: 'mock-001',
    Type: 'Placement',
    Message: 'TCS is recruiting! New job opening for Software Engineer role.',
    Timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    ID: 'mock-002',
    Type: 'Result',
    Message: 'Your Mid Sem exam results are out. Check your score on the portal.',
    Timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    ID: 'mock-003',
    Type: 'Event',
    Message: 'Cultural fest happening this weekend. Register now!',
    Timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    ID: 'mock-004',
    Type: 'Placement',
    Message: 'Goldman Sachs campus drive scheduled for next month.',
    Timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    ID: 'mock-005',
    Type: 'Result',
    Message: 'Assignment 3 has been graded. Review feedback in the system.',
    Timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    ID: 'mock-006',
    Type: 'Event',
    Message: 'Tech talk: "Cloud-native deployments" by industry experts tomorrow.',
    Timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    ID: 'mock-007',
    Type: 'Placement',
    Message: 'Internship opportunity at Microsoft. Last date to apply: tomorrow.',
    Timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
  },
  {
    ID: 'mock-008',
    Type: 'Result',
    Message: 'Final semester results announced. Download transcripts now.',
    Timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    ID: 'mock-009',
    Type: 'Event',
    Message: 'Sports day registration open. Sign up for your favorite sport.',
    Timestamp: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
  },
  {
    ID: 'mock-010',
    Type: 'Placement',
    Message: 'Amazon hiring freshers. Online coding assessment on 15th.',
    Timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
  },
  {
    ID: 'mock-011',
    Type: 'Result',
    Message: 'Lab exam evaluation pending. Results expected by 30th.',
    Timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
  },
  {
    ID: 'mock-012',
    Type: 'Event',
    Message: 'Seminar on "Cloud Computing" by Prof. ABC on 20th at Aud.',
    Timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
];

function getMockNotifications(limit = 50, page = 1, notificationType = '') {
  let filtered = MOCK_NOTIFICATIONS;
  if (notificationType) {
    filtered = filtered.filter(n => n.Type === notificationType);
  }
  const start = (page - 1) * limit;
  const end = start + limit;
  return filtered.slice(start, end);
}

module.exports = { getMockNotifications, MOCK_NOTIFICATIONS };

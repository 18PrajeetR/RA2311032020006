import React from 'react';
import NotificationCard from './NotificationCard';

export default function NotificationList({ list = [], seenIds = new Set(), onMarkSeen = () => {} }) {
  return (
    <div>
      {list.map(n => (
        <div key={n.ID}>
          <NotificationCard notification={n} isNew={!seenIds.has(n.ID)} onMarkSeen={onMarkSeen} />
        </div>
      ))}
    </div>
  );
}

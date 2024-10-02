import React, { useEffect, useState } from 'react';
import Card from './Card';
import DisplayOptions from './DisplayOptions';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]); // Holds tickets
  const [users, setUsers] = useState([]); // Holds user info
  const [grouping, setGrouping] = useState('status');
  const [sortType, setSortType] = useState('priority');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();

        if (data && data.tickets && data.users) {
          // Set both tickets and users
          setTickets(data.tickets);
          setUsers(data.users);
        } else {
          console.error('Invalid data format', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch the data
  }, []);

  // Helper function to find user by id
  const getUserById = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // Grouping functions
  const groupByStatus = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      (acc[ticket.status] = acc[ticket.status] || []).push(ticket);
      return acc;
    }, {});
  };

  const groupByUser = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      const userName = getUserById(ticket.userId);
      (acc[userName] = acc[userName] || []).push(ticket);
      return acc;
    }, {});
  };

  const groupByPriority = (tickets) => {
    return tickets.reduce((acc, ticket) => {
      (acc[ticket.priority] = acc[ticket.priority] || []).push(ticket);
      return acc;
    }, {});
  };

  // Grouping logic
  const groupTickets = (tickets, grouping) => {
    switch (grouping) {
      case 'status':
        return groupByStatus(tickets);
      case 'user':
        return groupByUser(tickets);
      case 'priority':
        return groupByPriority(tickets);
      default:
        return tickets;
    }
  };

  // Sorting logic
  const sortTickets = (tickets, sortType) => {
    return tickets.sort((a, b) => {
      if (sortType === 'priority') {
        return b.priority - a.priority; // Descending order by priority
      } else if (sortType === 'title') {
        return a.title.localeCompare(b.title); // Ascending order by title
      }
      return 0;
    });
  };

  // Grouping and sorting the tickets
  const sortedTickets = sortTickets([...tickets], sortType); // Spread tickets to avoid mutating the original array
  const groupedTickets = groupTickets(sortedTickets, grouping);

  return (
    <div>
      <DisplayOptions Grouping={setGrouping} SortType={setSortType} />
      <div className="kanban-container">
        {Object.keys(groupedTickets).map(groupKey => (
          <div key={groupKey} className="kanban-column">
            <h3>{groupKey}</h3>
            {groupedTickets[groupKey].map(ticket => (
              <Card key={ticket.id} ticket={ticket} userName={getUserById(ticket.userId)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

**Medieval Simulator - A Turn-Based Simulation Of A Kingdom In Chaos**

This project is a fun and interactive way to explore the complexities of medieval kingdom management through simulation and AI-driven gameplay.

**Features:**

**Tile-Based Map:**
  A dynamic grid-based map rendered on an HTML canvas.
  Entities such as knights, peasants, merchants, and monsters are visually represented with unique colors.
  
**King's Decisions:**
  The king makes decisions such as hiring, commissioning, spreading propaganda, or attacking other entities.
  Each decision influences the kingdom's trust level, entity behaviors, and overall simulation outcomes.
  
**AI-Driven Behaviors:**
  Knights, monsters, and other entities have unique AI behaviors that interact with the map and respond to the king's decisions.
  Knights can attack nearby entities, monsters move randomly, and other entities react dynamically.
  
**Global State Management:**
  A centralized GlobalState object tracks shared variables like trustInKing and propagandaTarget, ensuring consistent state management across scripts.
  
**News Bulletin Sidebar:**
  A sidebar displays the latest three news messages, keeping players informed of significant events in the kingdom.
  
**Dynamic Trust System:**
  The kingdom's trust in the king is dynamically updated based on decisions and outcomes, influencing gameplay.

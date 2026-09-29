# Real-Time Chat Application

React + TypeScript + Tailwind CSS frontend demo for a real-time chat assignment.

## Included
- Protected mock authentication
- Direct and group chats
- Responsive desktop/mobile UI
- Debounced chat search
- Optimistic messages
- Sending/delivered/read/failed + retry states
- Edit/delete/reply/copy/react
- Typing indicator
- Online/offline presence
- Unread counts
- File upload with simulated progress
- Emoji picker
- Auto-scroll
- Dark/light mode
- Axios REST service layer
- WebSocket client/reconnection simulation
- Zustand state management
- Empty/loading-style states

## Run
npm install
npm run dev

Demo:
Email: alex@example.com
Password: password123

## Backend integration
The project intentionally uses mock data because no REST/WebSocket backend was supplied. Replace `src/api.ts` and `src/websocket.ts` with real endpoints/events.

Suggested REST:
POST /auth/login
POST /auth/register
GET /chats
GET /chats/:chatId/messages?cursor=
POST /chats/:chatId/messages
POST /uploads
PATCH /messages/:messageId
DELETE /messages/:messageId

Suggested WebSocket events:
message:send, message:new, message:edit, message:delete,
message:read, message:status, typing:start, typing:stop,
typing:update, presence:update, reaction:add, notification:new

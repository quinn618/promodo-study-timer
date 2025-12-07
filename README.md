# ⏳ Promodo Study Timer

A simple and aesthetic Pomodoro-style timer to help you stay focused and productive during your study sessions.

✨ Built with HTML, CSS, and JavaScript  
🌙 Includes Dark Mode and Girly Mode  
💾 Saves your settings and progress using LocalStorage  
📚 Customize work and break lengths + session goals

## 🖼️ Preview

[👉 View Live Project](https://quinn618.github.io/promodo-study-timer/)

## 🔧 Features

- ⏱ Start, pause, and reset the timer
- 🎯 Session goal tracking
- 🧠 Auto-start next session (optional)
- 💅 Theme toggle: Dark Mode & Girly Mode
- 💾 Saves your preferences and progress

## 🔑 LocalStorage Keys

The app uses browser LocalStorage to persist data across sessions. Here are the keys used:

### `promodoSettings`
Stores user preferences and configuration:
- `workTime` - Duration of work sessions in minutes (default: 25)
- `shortBreak` - Duration of short breaks in minutes (default: 5)
- `longBreak` - Duration of long breaks in minutes (default: 15)
- `sessionGoal` - Number of sessions before a long break (default: 4)
- `autoStart` - Whether to automatically start the next session (boolean)

### `promodoTimerState`
Stores the current timer state:
- `currentTime` - Remaining time in seconds
- `currentSession` - Current session number (1-based)
- `onBreak` - Whether currently on a break (boolean)
- `isRunning` - Whether the timer is actively running (boolean)

These keys allow the timer to restore your exact state when you refresh the page or return later.

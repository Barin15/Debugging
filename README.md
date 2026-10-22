# React component debugging lab

A small Vite + React application for practicing component and state inspection
with React Developer Tools.

## Run the sample

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Install the official **React Developer
Tools** browser extension for your browser if it is not already installed, then
open the browser's developer tools and select the **Components** tab. The
extension may need a page reload after installation.

## Debugging walkthrough

1. Inspect the original tree. The starter app had only one component and a
   counter; it did not exercise component-to-component props or provide a
   useful tree for the requested debugging exercise. The sample now renders
   `App → TaskDashboard → TaskList → TaskItem`.
2. Select `App` in the Components tree. Its `tasks` state should contain three
   tasks (one completed) and its `filter` state should be `"all"`.
3. Select `TaskDashboard` and inspect its props. It receives the full task
   array, the current filter, and callbacks for changing the filter and task
   completion. Its completion total is derived from the full task array.
4. Select `TaskList` and `TaskItem`. `TaskList` receives `tasks`, `filter`, and
   `onToggle`; each `TaskItem` receives one task and the toggle callback.
5. Reproduce and trace updates: choose **Active**, then **Completed**, and
   toggle a checkbox. Confirm `App.filter` and `App.tasks` update, the visible
   `TaskItem` children match the selected filter, and the dashboard's
   completion total remains based on all tasks rather than only visible tasks.

## Debugging outcome

The issue in the supplied starter was that it was not a multi-component
state-and-props sample, so there was no child behavior or prop flow to inspect.
The app was replaced with a focused debugging lab. State now has a single
source of truth in `App`; task updates use a functional state update keyed by
stable task IDs; filtering is derived in `TaskList`; and the dashboard summary
is derived from the unfiltered task state. These choices keep the component
tree and data flow visible in React Developer Tools and avoid stale or
filter-dependent completion counts.

## Verify

```sh
npm run lint
npm run build
```

# Tour Search App

This project is a **React + TypeScript + Vite** application that implements a full tour-search flow using the mock API provided in the test assignment.

---

## 🚀 Features

- Autocomplete search (countries, cities, hotels)
- Delayed tour price flow (`startSearchPrices` → wait → `getSearchPrices`)
- Retry logic and error handling
- Caching of hotels and search results
- Responsive results grid
- Tour details page (`getHotel`, `getPrice`)
- Full search cancellation (`stopSearchPrices`) with race-condition protection
- Clean feature-based architecture

---

## 🧱 Tech Stack

- React 18 + TypeScript
- Vite
- Custom UI components
- Local mock API (`api.js`)

---

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/bizzoon89/tour-search.git
cd tour-search


# 2. Install dependencies
npm install

# 3. Dev Server
npm run dev
# open http://localhost:5173

# 4. Build & Preview
npm run build
npm run preview
```

# Thermomix Commission App

## Overview

This application calculates commissions for **Thermomix consultants and team leaders** based on sales data imported from an Excel file.

The app reads the Excel file, aggregates the data per person, and displays commission results in an easy-to-read dashboard.

Users can:

* upload an Excel sales report
* filter results by month
* search consultants or team leaders
* filter by role (Consultant / Team Leader)
* calculate commissions automatically
* optionally include **Demo Delivery bonus**

---

# Features

### Excel Import

Upload an Excel file containing sales data.
The application reads the first sheet and converts it to JSON using the **xlsx** library.

### Automatic Commission Calculation

The commission rules implemented:

**TM6 Sales**

| Units Sold | Commission    |
| ---------- | ------------- |
| 1 – 2 TM6  | 100€ per unit |
| 3+ TM6     | 120€ per unit |

**Accessories**

Accessories commission is read directly from the Excel column:

```
ACC_COMISION
```

**Demo Delivery**

Optional bonus:

```
+30€
```

Applied if:

* the toggle **Include Demo Delivery** is active
* the consultant sold at least one TM6.

---

# Filters

The interface allows filtering by:

### Search

Search consultants or team leaders by name.

### Month

Filter sales by the month extracted from the Excel **DATA** column.

### Role

Display only:

* Consultants
* Team Leaders

---

# Excel File Structure

For the application to work correctly, the Excel file must contain the following columns:

```
CONSULTANT
TL
ITEM
ACC_COMISION
DATA
```

### Column description

| Column       | Description                     |
| ------------ | ------------------------------- |
| CONSULTANT   | Consultant name                 |
| TL           | Team Leader name                |
| ITEM         | Product sold (TM6 or accessory) |
| ACC_COMISION | Commission from accessories     |
| DATA         | Sale date                       |

---

# Example Excel Format

| CONSULTANT    | TL          | ITEM      | ACC_COMISION | DATA       |
| ------------- | ----------- | --------- | ------------ | ---------- |
| Maria Popescu | Ana Ionescu | TM6       | 30           | 04/01/2026 |
| Maria Popescu | Ana Ionescu | ACCESSORY | 15           | 04/01/2026 |

---

# Project Structure

```
src
 ├─ components
 │  ├─ ExcelUploader.jsx
 │  └─ PersonCard.jsx
 │
 ├─ layout
 │  ├─ Header.jsx
 │  ├─ TopBar.jsx
 │  └─ SideBar.jsx
 │
 ├─ App.jsx
 └─ main.jsx
```

---

# Technologies Used

* React
* Vite
* Tailwind CSS
* xlsx library

---

# Installation

Clone the repository:

```
git clone https://github.com/your-repo-name.git
```

Navigate to the project folder:

```
cd project-folder
```

Install dependencies:

```
npm install
```

Run the project:

```
npm run dev
```

---

# Future Improvements

Possible improvements for the project:

* export commission reports
* better Excel validation
* charts for monthly sales
* consultant performance dashboard
* backend integration

---

# Author

Ioana Cazan

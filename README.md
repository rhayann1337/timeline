# Timeline Component - Airtable Assignment

A modern and interactive timeline component implementation that organizes items in horizontal lanes in a compact and efficient way.

## 📋 Overview

This project implements a timeline component that meets the Airtable assignment requirements:

- **Lane organization**: Items are automatically organized in horizontal lanes using space optimization algorithm
- **Compact visualization**: Items that don't overlap temporally share the same lane
- **Responsive interface**: Adaptive design for different screen sizes
- **Advanced features**: Zoom, detail modals, lane information panel

## ✨ What I Like About My Implementation

I was able to develop this project quickly while still applying good development practices. I believe the process would have been even faster and smoother with **Vite**, due to its better compatibility with **Shadcn** and **Tailwind**. Overall, it was a great and interesting project, and it was my **first time building something like this** with **Jira** and **Trello** as a reference.

### **Key Strengths of the Implementation**

### 1. **Smart Lane Algorithm**

- Implemented an optimized version of the provided algorithm in `assignLanes.js`
- The system automatically organizes items to maximize space usage
- Items that end before others start share the same lane

### 2. **Jira/Trello-Inspired Design System**

- Card-based layout familiar to project management tool users
- Semantic color system based on task duration:
  - **Green**: Short tasks (≤ 3 days) - `border-timeline-success`
  - **Yellow**: Medium tasks (4-7 days) - `border-timeline-warning`
  - **Red**: Long tasks (> 7 days) - `border-timeline-danger`

### 3. **Component-Based Architecture**

- Modular structure with reusable components
- Each component has its own specific responsibility
- Clean and efficient way to build the user interface
- Clear separation of responsibilities

### 4. **Dynamic Zoom Functionality**

- Smooth zoom system (30% - 300%) with intuitive controls
- Adaptive interface that shows/hides elements based on zoom level
- Temporal grid that automatically adjusts (days/weeks/months)

### 5. **Polished and Interactive UX**

- Informative tooltips with smooth animations
- Well-defined hover and selection states
- Detail modal for complete item information
- Alternative panel showing lane distribution

### 6. **Rapid Development with Good Practices**

- Quick development cycle while maintaining code quality
- Efficient use of modern React patterns and hooks
- Responsive design considerations

## 🔄 What I Would Change if I Did It Again

If I were to start this project over, I'd make several key improvements:

### 1. **TypeScript**

I'd use **TypeScript** from the start to improve code quality, prevent typing errors, and enhance code readability. This would act as a form of static testing, catching type-related errors before the code is even run.

### 2. **Better Architecture & State Management**

With more time, I'd make better architectural decisions to create a less verbose development process. I'd consider moving the internal logic of the timeline component to a **global state management solution** (like Zustand or Redux Toolkit). This would allow the logic to be reused across different pages and components without needing to pass props down through the component tree.

### 3. **Comprehensive Testing Coverage**

I would cover the project with **unit tests** to achieve at least **85% code coverage**, ensuring a more reliable and stable application. This includes:

- Unit tests for each component and function
- Tests for custom hooks to handle item manipulation
- Integration tests for complete user flows

### 4. **Performance and Compatibility**

I would use **Vite** instead of Parcel to improve compatibility with **Shadcn** and **Tailwind**, resulting in a faster and smoother development experience.

### 5. **Enhanced User Experience**

- Implement an **empty state** component to provide a better user experience when there's no data to display
- Add drag & drop functionality for moving items between dates
- Include inline editing capabilities for item names
- Improve mobile responsiveness with touch gestures

### 6. **Custom Hooks for Better Data Management**

I would create a **custom hook** to handle item manipulation more effectively, which is essential for managing the timeline's data and would make the codebase more maintainable.

### 7. **Scalability Considerations**

I would consider the potential growth of the project and choose a more robust and scalable architecture from the beginning to support future features like:

- Virtualization for large datasets
- Advanced filtering and search
- Real-time collaboration features

## 🎨 How I Made My Design Decisions

My design was heavily inspired by the user interfaces of **Jira** and **Trello**, which are tools I use regularly. I chose their layouts because they're well-known, intuitive, and highly effective for organizing tasks and information. This approach allowed me to create a simple yet familiar single-page application (SPA).

I broke down the design into individual components, each with its own specific responsibility. This component-based structure is a clean and efficient way to build the user interface. For a more robust and scalable solution, I'd consider moving the internal logic of the timeline component to a global state management solution. This would allow the logic to be reused across different pages and components without needing to pass props down through the component tree.

### **Technical Choices**

**React + Hooks**: Chose functional React with hooks for:

- Efficient local state with `useState`
- Memoization with `useMemo` and `useCallback`
- Simple and direct lifecycle

**Tailwind CSS**: Opted for Tailwind because of:

- Rapid development with utility classes
- Consistent design system
- Easy customization via config

**date-fns**: Preferred over Moment.js for:

- Smaller bundle size
- Modern functional API
- Automatic tree-shaking

**Radix UI**: For accessible components:

- Robust Dialog component
- Well-tested primitives
- Complete style customization

### **UX Patterns Inspired by Jira/Trello**

1. **Card-based Layout**: Items displayed as cards similar to Trello boards
2. **Lane Organization**: Horizontal lanes inspired by Jira's sprint planning
3. **Immediate Visual Feedback**: All interactions have visual feedback
4. **Color-coded Categories**: Task duration represented by colors
5. **Contextual Information**: Tooltips show relevant data on hover
6. **Intuitive Navigation**: Obvious zoom and view controls

## 🧪 How I Would Test This if I Had More Time

To improve the project's quality and reliability, I would implement the following comprehensive testing strategies:

### **Drag-and-Drop Functionality**

I'd implement a drag-and-drop feature, similar to what's used in Jira, to allow users to easily move items between different columns on the board. This would make the interface much more interactive and intuitive.

### **In-Modal Editing**

I would add an update function that allows users to edit an item's data directly within the selection modal. This would streamline the workflow and make it easier for users to make changes without navigating away from the current view.

### **Unit Tests with High Coverage**

I would write comprehensive **unit tests** to ensure that each component and function works as expected, guaranteeing code quality and preventing regressions. My goal would be to achieve at least **85% code coverage**.

```javascript
// Example unit tests I would implement:
describe("Timeline Component", () => {
  test("renders items correctly", () => {
    render(<Timeline />);
    expect(screen.getByText("Recruit translators")).toBeInTheDocument();
  });

  test("lane algorithm distributes items correctly", () => {
    const items = mockTimelineItems;
    const lanes = assignLanes(items);
    expect(lanes).toHaveLength(expectedLaneCount);
  });
});
```

### **TypeScript as Static Testing**

Using **TypeScript** would act as a form of static testing, catching type-related errors before the code is even run. This would significantly improve code reliability and developer experience.

### **Custom Hooks Testing**

I would write a **custom hooks** to handle data manipulation and state management correctly. This is crucial for timeline functionality and good practices.

### **Empty State Testing**

I'd create empty state component renders correctly when there is no data to display, improving the user experience.

## 🏗️ Project Architecture

```
src/
├── components/           # Reusable components
│   ├── TimelineVisual/   # Main timeline visualization
│   ├── TimelineItem/     # Individual timeline item
│   ├── TimelineControls/ # Zoom controls and information
│   ├── LaneInfoPanel/    # Lane information panel
│   ├── TimelineItemDialog/ # Detail modal
│   └── ui/               # Base components (Button, Card, Dialog)
├── data/                 # Static data
├── utils/                # Utilities (assignLanes)
├── lib/                  # Helper libraries
└── pages/                # Application pages
```

## 🛠️ Technologies Used

- **React 18**: Main framework
- **Tailwind CSS**: Styling and design system
- **date-fns**: Date manipulation
- **Radix UI**: Accessible primitive components
- **Lucide React**: Consistent icons
- **Parcel**: Fast bundler for development

---

## 🚀 How to run the project

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start
```

The project will open automatically in your default browser.

<img width="1842" height="796" alt="image" src="https://github.com/user-attachments/assets/c88a3012-f9b9-479f-a5be-1dc04b276a9f" />
<img width="1784" height="933" alt="image" src="https://github.com/user-attachments/assets/83782995-4527-46f9-ab75-92d9719c5bf3" />




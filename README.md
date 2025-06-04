# Sorting Algorithm Visualizer

A interactive web application that visualizes various sorting algorithms in real-time, built with React, Tailwind CSS, and Vite.

## 🚀 Features

- **Interactive Visualization**: Watch sorting algorithms work in real-time with animated bar charts
- **Multiple Controls**: 
  - Start/Pause sorting process
  - Reset to original state
  - Generate new random arrays
- **Visual Feedback**: Color-coded bars showing:
  - 🔵 Unsorted elements
  - 🔴 Elements being compared
  - 🟢 Sorted elements
- **Algorithm Information**: Displays complexity analysis including:
  - Time Complexity
  - Space Complexity
  - Stability information

## 🛠️ Technologies Used

- **React** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server
- **JavaScript (ES6+)** - Programming language

## 📊 Supported Algorithms

Currently featuring **Selection Sort** with detailed complexity analysis:
- **Time Complexity**: O(n²) in all cases
- **Space Complexity**: O(1) - In-place sorting
- **Stability**: Unstable

*More algorithms coming soon!*

## 🎮 How to Use

1. **Generate Array**: Click "Generate New Array" to create a random dataset
2. **Start Sorting**: Click "Start" to begin the visualization
3. **Pause/Resume**: Use "Pause" to stop and resume the sorting process
4. **Reset**: Click "Reset" to return to the original unsorted state
5. **Watch**: Observe the color changes as elements are compared and sorted

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hananahmad31/sorting-visualizer.git

2. Navigate to the project directory:
```bash
cd Sorting-Vizualizer
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```


### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
sorting-visualizer/
├── src/
│   ├── components/
│   │   ├── SortingVisualizer.jsx
│   │   └── AlgorithmInfo.jsx
│   ├── utils/
│   │   └── sortingAlgorithms.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Color Legend

- **Blue Bars**: Unsorted elements waiting to be processed
- **Red Bars**: Elements currently being compared
- **Green Bars**: Successfully sorted elements in their final position

## 🔧 Customization

You can customize various aspects of the visualizer:

- **Array Size**: Modify the initial array size in the component
- **Animation Speed**: Adjust the delay between comparisons
- **Colors**: Update the color scheme in Tailwind classes
- **Algorithms**: Add new sorting algorithms in the utils folder

## 📈 Future Enhancements

- [ ] Add more sorting algorithms (Bubble Sort, Quick Sort, Merge Sort, etc.)
- [ ] Speed control slider
- [ ] Array size adjustment
- [ ] Step-by-step mode
- [ ] Performance comparison between algorithms
- [ ] Sound effects for comparisons
- [ ] Mobile responsive improvements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built as a learning project to understand sorting algorithms
- Inspired by various algorithm visualization tools
- Thanks to the React and Vite communities for excellent documentation

## 📧 Contact

**Hanan Ahmad** - [GitHub Profile](https://github.com/hananahmad31)

Project Link: [https://github.com/hananahmad31/sorting-visualizer.git](https://github.com/hananahmad31)

---

⭐ Star this repository if you found it helpful!

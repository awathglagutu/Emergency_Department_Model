# Emergency_Department_Model
Assignment 2 of Modelling and Simulation
# 🏥 Emergency Department Triage Simulation

A dynamic, discrete-event simulation model designed to evaluate patient triage, waiting times, and resource allocation in an Emergency Department (ED). 

This project explores how hospitals balance medical urgency with system congestion using utility models, SoftMax probability distribution, and severity deterioration tracking. It was developed as a practical implementation of modeling and simulation theories.

## 🚀 Features

* **Utility-Based Routing:** Dynamically assigns patients to the Intensive Care Unit (ICU), Emergency Room (ER), or Fast Track based on a calculated balance between patient severity and current queue congestion.
* **Dynamic Waiting Time Calculation:** Computes expected waiting times in real-time using unit capacity, active queue size, and average service times ($W = \frac{N \times T}{C}$).
* **Severity Deterioration Tracking:** Simulates real-world worsening of patient conditions while waiting in the queue, automatically updating their Emergency Severity Index (ESI) and flagging deteriorated patients.
* **Dual Implementation:** * A mathematically rigorous backend script written in **GNU Octave / MATLAB**.
  * A fully deployable, interactive web GUI with real-time data visualization.
* **Interactive Dashboard:** Features a responsive CSS-grid interface with four Chart.js visualizations:
  1. Patient Assignment Distribution (Bar Chart)
  2. Estimated Waiting Time per Unit (Bar Chart)
  3. Severity Before vs. After Waiting (Line Chart)
  4. Queue Distribution (Pie Chart)

## 📂 Project Structure

* `EDModelgui.html` - The standalone web application containing the interactive GUI, JavaScript simulation logic, and Chart.js visualizations.
* `ed_simulation.m` - The core mathematical model and algorithmic logic written in GNU Octave for baseline testing and numerical validation.

## 💻 How to Use

### Running the Web Application
The web GUI is completely client-side and requires no backend server. 
1. Clone or download this repository.
2. Open `EDModelgui.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
3. Adjust the hospital capacities, treatment times, and algorithmic weights (wA, wB, r) in the input panel.
4. Add custom patient profiles (ID, ESI, Severity).
5. Click **Run Simulation** to generate the assignment logic and visual charts.

### Running the Octave Model
1. Open [GNU Octave](https://octave.org/) or MATLAB.
2. Navigate to the directory containing `ed_simulation.m`.
3. Run the script from the command window.
4. Follow the interactive terminal prompts to input hospital resources, simulation rules, and patient data.

## 🧠 Mathematical Models Utilized

* **Utility Function:** $U = w_A \times S(t) - w_B \times \text{standardised}(W)$
* **SoftMax Assignment:** Converts utility scores into probabilities to introduce realistic stochastic routing while preventing numerical overflow.
* **Deterioration Rule:** $S_{new} = S_{initial} + (r \times W_{patient})$

## 🎓 Academic Context

This simulation was developed for **STTHK2133 Modelling and Simulation** at Universiti Utara Malaysia (UUM).
* **Instructor:** Prof. Madya Dr. Azizi Bin Ab Aziz
* **Author:** Adam Haris Bin Amran

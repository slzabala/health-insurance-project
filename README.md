# health-insurance-project
## Project 3 Challenge

## Project Overview:
    This project aims to analyze and visualize patterns and uncover trends in health insurance claims data by analyzing multiple variables. 

## Objectives:
    This project will focus on the following goals:
    1. Explore and Analyze Claims Data
    2. Uncover Claims Key Trends
    3. Highlight Claims Data Outliers 
    4. Use of Interactive Visualizations 

## Datasets:
    • The datasets are publicly available health insurance claims. 
    • The datasets contain over 100 unique records.
    Medical Claim Charges Dataset: 
    The first dataset was retrieved from Kaggle’s public datasets and provides demographics and Medical Insurance Cost for a small sample of the U.S.A. population. This Data is practical and is used in the book Machine Learning with R by Brett Lantz; which is a book that provides an introduction to machine learning using R. 
     https://www.kaggle.com/datasets/mirichoi0218/insurance?resource=download     
     
    CMS Claims Denials Dataset:
    The second dataset was retrieved from the Centers for Medicare & Medicaid Services (CMS) who are committed to increasing transparency in the Health Insurance Exchanges.
    https://www.cms.gov/marketplace/resources/data/public-use-files    

## Research Questions: 
    1.    How do claim charges vary by demographic factors (age, sex, BMI, smoking status, and region)?
    2.    Which states or regions have the highest claim charges and denial rates, and how do they compare across regions?
    3.    What is the impact of smoking status and BMI on claim charges or denial rates?
    4.    Which states or regions have the highest claim charges and denial rates, and what demographic factors contributes to this?
    5.    Which state or region has the highest rate of appeals and appeals overturned? 

## Tools and Technologies:
    •    Programing Languages: Python
        -Pandas, US Library, Seaborn
    •    Data Cleaning: Pandas, NumPy
    •    Visualization Libraries: Plotly, Seaborn
    o    Example Visualizations: Bar charts, line charts and geographical maps. 
    •    Database: SQLite
    •    JavaScript Libraries: D3.js(v7), Plotly.js, Bootstrap
    o    Styling: Bootstrap CSS


## Files:
    Resources Folder containts the original data sets. 
    Jupyter Notebook EDA file is health_insurance_claims_EDA.ipynb
    Database: insurance.db
    Assests Folder contains a json folder for a json folder coding the visualizations and a js folder with a json folder with the raw data. 

## Ethical Considerations: 
    Anonymizing Data and reducing bias

    Data Privacy: 
    Made sure the data did not contain any identifiable patient health information (PHI) to remain compliant with the Health Insurance Portability and Accountability Act (HIPA).

    Transparency:
    Made sure data sources were ethically collected and made it accessible in my research. 

    Avoid misinterpretation or misuse:
    Further decision affecting policies or practice should caution and perform additional research, context and qualitative analysis.  The main purpose of this analysis was to inform but not change any real policies or practice. 

# Ethical Implications: 
    Both datasets were obtained legally and from reputable sources. 

# Installation and Usage
## 1. Clone the Repository:
        o git clone https://github.com/slzabala/health-insurance-project
        
## 2. Set Up the Environment:
        o Make sure you have Python 3 installed
        o Install the following libraries:
        o pip install pandas matplotlib seaborn numpy sqlite3 openpyxl us
        o For the interactive dashboard make sure you have a web server for the HTML and JavaScript files.
## 3. Setup Database:
        o Run the Jupyter Notebook (health_insurance_claims_EDA.ipynb) from the repository to import the CSV and Excel files into the SQLite database (insurance.db).
## 4. Running the Interactive Dashboard:
        o Using VS Code Live Server 
            • Open the project folder in VS Code
            • Right-click on index.html and select Open with Liver Server (or use the Live Server extension commands).
            • Your browser will open the local URL (e.g., http://127.0.0.1:5500/index.html). Navigate there to interact with the dashboard. 
## 5. Interacting with the Dashboard:
        o Region Dropdown: Select a region to filter the data. The charts will update dynamically to show data for the selected region.
        o Demographic Dropdown: Select a demographic field to adjust the bubble chart grouping, allowing you to explore how claim charges vary based on that demographic fields.



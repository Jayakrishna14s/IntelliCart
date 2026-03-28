# Intellicart Pricing Service

A FastAPI-based machine learning inference service for predicting the **next expected price of a product listing** in a marketplace environment.

This service powers the **Intellicart Custom Pricing Model**, a marketplace-aware hybrid prediction engine designed to forecast listing-level prices using:

- historical price trends
- seller/store metadata
- product metadata
- handcrafted pricing logic
- residual machine learning correction

---

## 🚀 Features

- Predict next listing price using a trained ML model
- Uses listing-level **time-series price history**
- Computes model features internally from raw input
- Combines:
  - **Base pricing formula**
  - **Residual ML model**
- Exposes prediction through a clean **FastAPI REST API**

---

## 📂 Project Structure

```bash
intellicart-pricing-service/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes.py
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── prediction.py
│   │
│   └── services/
│       ├── __init__.py
│       ├── model_loader.py
│       ├── feature_engineering.py
│       └── prediction_service.py
|
│
├── model_bundle/
│   ├── intellicart_residual_model.pkl
│   ├── intellicart_label_encoders.pkl
│   ├── intellicart_feature_columns.pkl
│   └── intellicart_base_formula.pkl
│
├── tests/
│   ├── __init__.py
│   └── test_predict.py
│
├── requirements.txt
├── .gitignore
├── README.md
└── run.py
```

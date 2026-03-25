# 🚀 Cypress Agile Engineering Showcase

This project is a professional Quality Engineering (QA) portfolio focused on **End-to-End (E2E) testing** using **Cypress**. The target application is [ServeRest](https://front.serverest.dev/), a dedicated e-commerce simulation environment for testing practices.

This repository demonstrates a full-cycle Agile development approach:
1.  **Requirements Engineering:** User Stories mapping and BDD (Behavior Driven Development).
2.  **Quality Engineering:** Strategic focus on business-critical flows and test stability.
3.  **Software Development:** Clean code, reusable architecture (Custom Commands/Fixtures), and CI/CD integration.

---

## 📋 1. Requirements Engineering Vision

The following User Stories were mapped to guide the automation of this project:

### Epic: Access & Catalog Management

> **US01 - User Authentication**
> **As a** registered user,
> **I want to** log into the platform,
> **So that** I can access system features according to my profile.

**Acceptance Criteria (BDD):**
* **Scenario 1: Successful Login**
    * **Given** I am on the login page
    * **When** I enter a valid email and password
    * **And** I click "Entrar" (Login)
    * **Then** I should be redirected to the logged-in home page.
* **Scenario 2: Login with invalid credentials**
    * **Given** I am on the login page
    * **When** I enter an incorrect email or password
    * **Then** the system should display the error message "Email e/ou senha inválidos".
* **Scenario 3: Login with empty fields**
    * **Given** I am on the login page
    * **When** I click "Entrar" without filling in email or password
    * **Then** I should see validation messages "Email é obrigatório" and "Password é obrigatório".
* **Scenario 4: Invalid email format**
    * **Given** I am on the login page
    * **When** I enter invalid email format
    * **Then** the system should alert "Email deve ser um email válido".

> **US02 - Product Management (CRUD)**
> **As a** system administrator,
> **I want to** register, list, and manage products,
> **So that** they become available for customers in the e-commerce catalog.

**Acceptance Criteria (BDD):**
* **Scenario 1: Successful Product Registration**
    * **Given** I am logged in as an administrator
    * **And** I access the "Cadastrar Produtos" screen
    * **When** I fill in the name, price, description, and quantity
    * **And** I click "Cadastrar"
    * **Then** the product should be successfully saved in the database
    * **And** I should see the confirmation message "Cadastro realizado com sucesso".     
* **Scenario 2: Delete product with success**
    * **Given** I have a product previously registered
    * **When** I click the "Excluir" button for that product
    * **Then** the product should disappear from the list
    * **And** no error message should be displayed.    
* **Scenario 3: Register product with zero/negative price**
    * **Given** I am on the product registration screen
    * **When** I enter a price equal to or less than "0"
    * **Then** the system should prevent the registration and show a price validation error.
* **Scenario 4: Register product with empty fields**
    * **Given** I am on the product registration screen
    * **When** I click "Cadastrar" without filling in any mandatory fields
    * **Then** the system should display validation messages for Name, Price, Description, and Quantity.

### Epic: User Administration & Shopping Experience

> **US03 - User Management (Admin)**
> **As a** system administrator,
> **I want to** register and manage other users,
> **So that** I can control access to the platform.

**Acceptance Criteria (BDD):**
* **Scenario 1: Successful User Registration**
    * **Given** I am on the user registration page
    * **When** I fill in the name, email, and password
    * **And** I select the "Administrador" checkbox
    * **Then** the user should be successfully registered
    * **And** I should see the message "Cadastro realizado com sucesso".
* **Scenario 2: Prevent duplicate user registration**
    * **Given** an email "alice@test.com" is already registered
    * **When** I try to register a new user with "alice@test.com"
    * **Then** the system should display the error message "Este email já está sendo usado".
* **Scenario 3: Promote common user to admin**
    * **Given** a common user exists in the system
    * **When** I edit the user profile to "Administrador"
    * **Then** that user should have access to the dashboard management features.

> **US04 - Shopping Cart Flow**
> **As a** customer,
> **I want to** add products to my cart,
> **So that** I can finalize my purchase.

**Acceptance Criteria (BDD):**
* **Scenario 1: Adding product to cart**
    * **Given** I am logged into the platform
    * **When** I click "Adicionar ao carrinho" on a specific product
    * **Then** I should be redirected to the cart page
    * **And** the product name and quantity should be correctly displayed.
* **Scenario 2: Clearing the cart**
    * **Given** I have items in my cart
    * **When** I click the "Limpar Carrinho" button
    * **Then** the cart should be emptied
    * **And** I should see a confirmation that the cart is empty.
* **Scenario 3: Cart persistence**
    * **Given** I added a product to the cart
    * **When** I logout and login again
    * **Then** the product should still be present in my shopping cart.

---

## 🛠️ 2. Architecture & Tech Stack

* **Testing Framework:** [Cypress](https://www.cypress.io/)
* **Language:** JavaScript (Node.js)
* **Design Patterns:** Custom Commands & App Actions for high reusability.
* **Data Management:** Fixtures (JSON) for dynamic test data.
* **CI/CD:** [GitHub Actions](https://github.com/features/actions) for automated test execution on every push.

## 📂 Project Structure

```
.github/workflows/    # CI/CD Pipeline configuration
cypress/
  ├── e2e/            # Test files organized by Epic/Feature
  ├── fixtures/       # Static data for tests
  ├── support/        # Reusable layer
  │   ├── pages/      # Page Object Model (UI Selectors & Actions)
  │   ├── commands.js # API Custom Commands (Data setup)
  └── ...
```

---

## 🚀 3. Advanced Engineering Patterns Applied

* **API Seeding:** Tests use `cy.request()` to create the necessary state (users/products) before UI interaction, ensuring test atomicity and speed.
* **POM (Page Object Model):** Decouples test logic from UI selectors using a dedicated page layer, making maintenance easier and the code more readable.
* **Smart Synchronization:** Strategic use of dynamic timeouts and state assertions instead of hardcoded `cy.wait()`, reducing flakiness.
* **Secure CI/CD:** Integration with GitHub Secrets to inject environment variables during pipeline execution, preventing credential leaks.

---

## ⚙️ 4. Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (Version 18 or higher)
* [Cypress](https://www.cypress.io/)

### Installation
1. Clone this repository:
    ```bash
    git clone [https://github.com/alicemavila/cypress-agile-eng-showcase.git](https://github.com/alicemavila/cypress-agile-eng-showcase.git)
    ```
2. Navigate to the project folder:
    ```bash
    cd cypress-agile-eng-showcase
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Running Tests
* **Open Cypress UI:**
    ```bash
    npm run cypress:open
    ```
* **Run Headless Mode (Terminal):**
    ```bash
    npm run cypress:run
    ```

---

## 👨‍💻 Author
**Alice Monteiro** - QA Engineer  
[LinkedIn](https://www.linkedin.com/in/alice-m-223157119/) | [GitHub](https://github.com/alicemavila)
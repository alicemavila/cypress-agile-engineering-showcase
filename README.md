# 🚀 Cypress Agile Engineering Showcase

This project is a professional Quality Engineering (QA) portfolio focused on **End-to-End (E2E) testing** using **Cypress**. The target application is [ServeRest](https://front.serverest.dev/), a dedicated e-commerce simulation environment.

This repository demonstrates a full-cycle Agile development approach, moving beyond simple UI automation to a robust, data-driven architecture.

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
* **Scenario 5: SQL Injection attempt blocked by frontend**
     * **Given** I am on the login page
     * **When** I enter a malicious email containing SQL injection patterns
     * **Then** the browser should trigger native validation and block the submission, preventing navigation.
* **Scenario 6: SQL Injection attempt blocked via API**
     * **Given** I perform an authentication request via API
     * **When** I send a request containing SQL injection payloads
     * **Then** the server should return a 400 or 401 status and deny access, ensuring no authorization token is returned.

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

* **Testing Framework:** [Cypress](https://www.cypress.io/) – Focused on scalable, high-speed, and reliable E2E execution.
* **Data Generation:** [Faker.js](https://fakerjs.dev/) – Ensures test isolation and deterministic data generation for every test run, preventing dependency issues.
* **Design Patterns:**
    * **Hybrid Approach:** Page Object Model (POM) for encapsulated UI interactions combined with Custom Commands for API-driven shortcuts.
    * **Atomic Test Setup:** Leveraging direct API requests to seed preconditions (bypassing UI), resulting in faster execution and reduced flakiness.
* **Security:** *Shift-Left Strategy* – Implementation of both client-side native validation and backend security contract testing (e.g., SQL Injection/Payload sanitization). Environment configuration is secured via GitHub Secrets.
* **CI/CD:** [GitHub Actions] – Automated regression pipeline integrated into the development workflow to ensure fast feedback loops on every commit.


## 📂 Project Structure
```
.github/workflows/    # CI/CD Pipeline (Automated Regression)
cypress/
├── e2e/            # Test specs organized by User Story
├── fixtures/       # Static assets (images/files for upload tests)
├── support/

│   ├── pages/      # Page Object Model (Encapsulated Selectors)
│   ├── commands.js # API Seeding & Login shortcuts
└── ...
```

---

## 🚀 3. Advanced Engineering Patterns Applied

This project implements industry-standard solutions to common automation challenges:

* **Dynamic Admin Creation (Anti-Flakiness):** Instead of relying on a static "admin@test.com", each test suite generates a unique Administrator via API. This prevents **401 Unauthorized** errors caused by shared environment resets.
* **API Contract Alignment:** Payloads are strictly mapped to the REST API schema (e.g., handling `password` vs `senha` keys), ensuring **400 Bad Request** errors are avoided during data seeding.
* **Atomic Test Setup:** Using `cy.request()` to create users and products before the test starts. This ensures that if the UI fails, we know it's a front-end bug, not a data setup issue.
* **HTML5 Validation Testing:** Beyond server errors, the suite validates native browser behaviors like `validationMessage` for invalid email formats.
* **DOM Traversal Excellence:** Strategic use of `.parent().find()` to interact with specific rows in dynamic tables, ensuring robust element targeting.


---


## ⚙️ 4. Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+)
* [Cypress](https://www.cypress.io/)

### Installation
1. Clone this repository:
    ```bash
    git clone (https://github.com/alicemavila/cypress-agile-eng-showcase.git)
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

### Running Tests
* **Cypress Dashboard (UI):** `npx cypress open`
* **Headless Mode (CI Simulation):** `npx cypress run`


---


## 👨‍💻 Author
**Alice Monteiro** - QA Engineer  
[LinkedIn](https://www.linkedin.com/in/alice-m-223157119/) | [GitHub](https://github.com/alicemavila)
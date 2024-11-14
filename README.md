# Catalyst Cypress

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

This repository contains a suite of end-to-end tests built with [Cypress.io](https://www.cypress.io/) for the [Catalyst](https://www.catalyst.dev/) stack of BigCommerce.
These tests are designed to verify the functionality of Catalyst's front-end components and ensure that they are working as expected.

## Getting Started

### Prerequisites

- Ensure you have a working Catalyst environment set up.
- This repository should be cloned into the `/packages/` directory within the Catalyst codebase.

### Installation

1. Clone the repository inside the `/packages/` directory of your Catalyst project:
   ```bash
   cd /path/to/catalyst
   git clone https://github.com/thebigrick/catalyst-cypress ./packages/catalyst-cypress
    ```
   
2. Install again the dependencies of your Catalyst project:
   ```bash
   cd /path/to/catalyst
   pnpm install
   ```
   
## Usage

To run the tests, simply start your Catalyst environment as you normally would:
    
```bash
cd /path/to/catalyst
pnpm run dev
```

This will automatically launch the Cypress environment along with Catalyst, allowing you to run and manage the tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you have suggestions or improvements.

Made with ❤️ by The Big Rick for Catalyst.

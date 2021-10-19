// Add any code  or items you want run before the tests are run
// Do not delete this file
import React from 'react';
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import '@testing-library/jest-dom';
